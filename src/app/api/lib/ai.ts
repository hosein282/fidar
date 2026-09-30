import { GoogleGenAI } from '@google/genai';

// ========================================================
// Shared AI Provider (Gemini first, DeepSeek fallback)
// --------------------------------------------------------
// Gemini has priority. Model resolution is resilient:
//   - The model set in GEMINI_MODEL is tried first.
//   - If that model is retired / not found (HTTP 404) or does
//     not support generateContent, the next known-good model
//     is tried automatically.
//   - Only when Gemini is unavailable, throws (network / HTTP /
//     auth / quota / blocked prompt) or returns an empty
//     response is the request retried with DeepSeek.
// ========================================================

export interface AIProviderOptions {
  temperature?: number;
  maxOutputTokens?: number;
  /** When 'json', ask the model to return strict JSON output. */
  responseFormat?: 'json';
}

export interface AIProviderResult {
  provider: 'gemini' | 'deepseek';
  text: string;
}

const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions';

// Known-good Gemini models, tried in order when the configured model 404s.
const GEMINI_FALLBACK_MODELS = ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash'];

function geminiModelCandidates(): string[] {
  // Read at call time so runtime-injected env / tests can override it.
  const configured = (process.env.GEMINI_MODEL || '').trim();
  if (configured) {
    const normalized = configured.toLowerCase();
    return [
      configured,
      ...GEMINI_FALLBACK_MODELS.filter((m) => m.toLowerCase() !== normalized),
    ];
  }
  return [...GEMINI_FALLBACK_MODELS];
}

// Detects "model not found / model not supported for generateContent"
// errors coming from the Gemini API (HTTP 404 / NOT_FOUND).
function isModelNotFoundError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;

  const e = error as {
    message?: string;
    statusCode?: unknown;
    status?: unknown;
    body?: unknown;
    error?: unknown;
  };

  let payloadText = '';
  try {
    if (typeof e.error === 'string') payloadText = e.error;
    else if (e.error) payloadText = JSON.stringify(e.error);
    if (typeof e.body === 'string') payloadText += ' ' + e.body;
    else if (e.body) payloadText += ' ' + JSON.stringify(e.body);
  } catch {
    // ignore serialization failures
  }

  const haystack = `${e.message || ''} ${payloadText}`.toLowerCase();

  if (haystack.includes('is not found')) return true;
  if (haystack.includes('not_found')) return true;
  if (haystack.includes('not found')) return true;
  if (haystack.includes('does not exist')) return true;
  if (haystack.includes('not supported') && haystack.includes('model')) return true;

  const status = e.statusCode ?? e.status;
  return status === 404 && haystack.includes('model');
}

interface GeminiConfig {
  temperature: number;
  maxOutputTokens: number;
  responseMimeType?: string;
}

function buildGeminiConfig(options: AIProviderOptions): GeminiConfig {
  const config: GeminiConfig = {
    temperature: options.temperature ?? 0.7,
    maxOutputTokens: options.maxOutputTokens ?? 1024,
  };
  // Force structured JSON output from Gemini so the response is parseable.
  if (options.responseFormat === 'json') {
    config.responseMimeType = 'application/json';
  }
  return config;
}

// --- Gemini (primary provider) ---

export async function callGemini(prompt: string, options: AIProviderOptions = {}): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }

  const ai = new GoogleGenAI({ apiKey });
  const config = buildGeminiConfig(options);
  const candidates = geminiModelCandidates();

  let lastError: Error | undefined;

  for (const model of candidates) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config,
      });

      const text = String(response.text || '').trim();
      if (!text) {
        throw new Error('Gemini returned an empty response.');
      }

      if (model !== candidates[0]) {
        console.log(
          `[ai] Configured Gemini model "${candidates[0]}" is unavailable; using "${model}".`
        );
      }
      console.log(`[ai] Gemini responded (${model}).`);
      return text;
    } catch (error) {
      if (isModelNotFoundError(error)) {
        console.error(
          `[ai] Gemini model "${model}" is not found / not supported, trying the next model.`
        );
        lastError = error instanceof Error ? error : new Error(String(error));
        continue;
      }
      // Any other failure (auth, quota, rate limit, network, blocked prompt)
      // propagates up and triggers the DeepSeek fallback in generateAIResponse.
      throw error;
    }
  }

  throw lastError ?? new Error('No Gemini model is available.');
}

// --- DeepSeek (fallback provider) ---

export async function callDeepseek(prompt: string, options: AIProviderOptions = {}): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY is not configured.');
  }

  const payload: Record<string, unknown> = {
    model: DEEPSEEK_MODEL,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxOutputTokens ?? 1024,
  };

  // DeepSeek (OpenAI-compatible) JSON mode.
  if (options.responseFormat === 'json') {
    payload.response_format = { type: 'json_object' };
  }

  const response = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = `DeepSeek API error (HTTP ${response.status}).`;
    try {
      const errorData = await response.json();
      if (errorData?.error?.message) {
        message = `DeepSeek API error: ${errorData.error.message}`;
      }
    } catch {
      // response body is not JSON — keep the generic message
    }
    throw new Error(message);
  }

  const data = await response.json();
  const text = String(data.choices?.[0]?.message?.content ?? '').trim();
  if (!text) {
    throw new Error('DeepSeek returned an empty response.');
  }
  return text;
}

// --- Public entry point: Gemini first, DeepSeek fallback ---

export async function generateAIResponse(
  prompt: string,
  options: AIProviderOptions = {}
): Promise<AIProviderResult> {
  // Gemini is the preferred provider. Try it whenever a key exists.
  if (process.env.GEMINI_API_KEY) {
    try {
      const text = await callGemini(prompt, options);
      return { provider: 'gemini', text };
    } catch (error) {
      console.error(
        `[ai] Gemini unavailable, falling back to DeepSeek. Reason: ${error instanceof Error ? error.message : error}`
      );
    }
  }

  const text = await callDeepseek(prompt, options);
  console.log('[ai] DeepSeek responded.');
  return { provider: 'deepseek', text };
}