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
  provider: 'gemini' | 'deepseek' | 'openrouter';
  text: string;
}

const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = process.env.OPENROTER_MODEL || '';

// Fallback candidates, tried in order when the configured model 404s.
const GEMINI_FALLBACK_MODELS = ['gemini-3.8-flash', 'gemini-3-pro-preview'];

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

// Collects model names referenced in an error message, e.g.
// "...update your code to use models/gemini-3.8-flash ...".
function extractSuggestedModels(message: string): string[] {
  const found = new Set<string>();
  const re = /models\/([a-zA-Z0-9._-]+)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(message)) !== null) {
    const name = match[1].trim();
    if (name) found.add(name);
  }
  return [...found];
}

// Cache for the model list discovered through ListModels.
let geminiDiscoveredModels: string[] | undefined;

// Fetches available Gemini model IDs and keeps the ones that support text
// generation. Called only when every queued candidate returned 404.
async function discoverGeminiModels(ai: GoogleGenAI): Promise<string[]> {
  if (geminiDiscoveredModels) return geminiDiscoveredModels;

  const usable: string[] = [];
  try {
    const pager = await ai.models.list({ config: { pageSize: 100 } });
    for await (const model of pager) {
      const parts = String(model.name || '').split('/');
      const id = parts[parts.length - 1].trim();
      if (!id || id === 'tunedModels') continue;

      const actions = Array.isArray(model.supportedActions)
        ? model.supportedActions.map((a) => String(a).toLowerCase())
        : [];
      if (actions.length > 0 && !actions.some((a) => a.includes('content'))) {
        continue;
      }
      usable.push(id);
    }
  } catch (error) {
    console.error(
      `[ai] Could not list Gemini models: ${error instanceof Error ? error.message : error}`
    );
  }

  geminiDiscoveredModels = usable;
  return usable;
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

  const preferred = geminiModelCandidates()[0];
  const tried = new Set<string>();
  const queue: string[] = [...geminiModelCandidates()];
  let discovered: string[] | undefined;
  let lastError: Error | undefined;
  let attempts = 0;

  while (queue.length > 0 && attempts < 8) {
    const model = queue.shift();
    if (!model || tried.has(model)) continue;
    tried.add(model);
    attempts++;

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

      if (model !== preferred) {
        console.log(
          `[ai] Configured Gemini model "${preferred}" is unavailable; using "${model}".`
        );
      }
      console.log(`[ai] Gemini responded (${model}).`);
      return text;
    } catch (error) {
      if (!isModelNotFoundError(error)) {
        // Any other failure (auth, quota, rate limit, network, blocked prompt)
        // propagates up and triggers the DeepSeek fallback in generateAIResponse.
        throw error;
      }

      console.error(
        `[ai] Gemini model "${model}" is not found / not supported, trying the next model.`
      );
      lastError = error instanceof Error ? error : new Error(String(error));

      // 1) Gemini often names the replacement model in the error text,
      //    e.g. "...use models/gemini-3.8-flash ...". Try it immediately.
      const suggested = extractSuggestedModels(error instanceof Error ? error.message : '')
        .filter((name) => !tried.has(name));
      for (const name of suggested) {
        if (!queue.includes(name)) queue.unshift(name);
      }

      // 2) If nothing is left to try, ask the API for the current model list
      //    (as the error message itself recommends via ListModels).
      if (queue.length === 0 && discovered === undefined) {
        discovered = await discoverGeminiModels(ai);
        for (const name of discovered) {
          if (!tried.has(name) && !queue.includes(name)) queue.push(name);
        }
      }
    }
  }

  throw lastError ?? new Error('No Gemini model is available.');
}

// --- OpenRouter  (fallback provider) ---
export async function callOpenRouter(prompt: string, options: AIProviderOptions = {}): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured.');
  }

  const payload: Record<string, unknown> = {
    model: OPENROUTER_MODEL,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxOutputTokens ?? 1024,
  };

  // OpenAI-compatible JSON mode.
  if (options.responseFormat === 'json') {
    payload.response_format = { type: 'json_object' };
  }

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': OPENROUTER_URL,
      'X-Title': 'Fidar',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = `OpenRouter API error (HTTP ${response.status}).`;
    try {
      const errorData = await response.json();
      if (errorData?.error?.message) {
        message = `OpenRouter API error: ${errorData.error.message}`;
      }
    } catch {
      // response body is not JSON — keep the generic message
    }
    throw new Error(message);
  }

  const data = await response.json();
  const text = String(data.choices?.[0]?.message?.content ?? '').trim();
  if (!text) {
    throw new Error('OpenRouter returned an empty response.');
  }
  return text;
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
  // if (process.env.GEMINI_API_KEY) {
  //   try {
  //     const text = await callGemini(prompt, options);
  //     return { provider: 'gemini', text };
  //   } catch (error) {
  //     console.error(
  //       `[ai] Gemini unavailable, falling back to DeepSeek. Reason: ${error instanceof Error ? error.message : error}`
  //     );
  //   }
  // }
  if (process.env.OPENROUTER_API_KEY) {
    const text = await callOpenRouter(prompt, options);
    console.log('[ai] OpenRouter responded.');
    return { provider: 'openrouter', text }
  }

  const text = await callDeepseek(prompt, options);
  console.log('[ai] DeepSeek responded.');
  return { provider: 'deepseek', text };
}