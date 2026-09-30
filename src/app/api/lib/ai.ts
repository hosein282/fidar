import { GoogleGenAI } from '@google/genai';

// ========================================================
// Shared AI Provider (Gemini first, DeepSeek fallback)
// --------------------------------------------------------
// Gemini has priority. If it is not available (missing API
// key), throws an error (network / HTTP failure / blocked
// prompt), or returns an empty response, the request is
// automatically retried with DeepSeek.
// ========================================================

export interface AIProviderOptions {
  temperature?: number;
  maxOutputTokens?: number;
}

export interface AIProviderResult {
  provider: 'gemini' | 'deepseek';
  text: string;
}

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions';

// --- Gemini (primary provider) ---

async function callGemini(prompt: string, options: AIProviderOptions): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: {
      temperature: options.temperature ?? 0.7,
      maxOutputTokens: options.maxOutputTokens ?? 1024,
    },
  });

  const text = String(response.text || '').trim();
  if (!text) {
    console.log("gemini error")
    throw new Error('Gemini returned an empty response.');
  }
  return text;
}

// --- DeepSeek (fallback provider) ---

async function callDeepseek(prompt: string, options: AIProviderOptions): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY is not configured.');
  }

  const response = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxOutputTokens ?? 1024,
    }),
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
      console.log(`[ai] Gemini responded (${GEMINI_MODEL}).`);
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