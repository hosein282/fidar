import { NextRequest, NextResponse } from 'next/server';
import { generateAIResponse, callDeepseek } from '../../lib/ai';

// Tries to extract a JSON object from an AI response. Handles plain JSON,
// markdown code fences (```json ... ```) and text surrounding the JSON.
function extractJsonObject(text: string): Record<string, unknown> | null {
  const tryParse = (s: string): Record<string, unknown> | null => {
    try {
      const parsed = JSON.parse(s);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  };

  const trimmed = text.trim();

  // 1) Whole response is already pure JSON.
  const direct = tryParse(trimmed);
  if (direct) return direct;

  // 2) JSON inside a markdown code fence.
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) {
    const fenced = tryParse(fence[1].trim());
    if (fenced) return fenced;
  }

  // 3) First balanced { ... } block anywhere in the response.
  const start = trimmed.indexOf('{');
  if (start !== -1) {
    let depth = 0;
    for (let i = start; i < trimmed.length; i++) {
      const ch = trimmed[i];
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) {
          const block = tryParse(trimmed.slice(start, i + 1));
          if (block) return block;
          break;
        }
      }
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const topic = String(body.topic || '').trim();
    const lang = body.lang === 'en' ? 'en' : 'fa';

    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Topic is required.' },
        { status: 400 }
      );
    }

    const prompt = lang === 'fa'
      ? `You are an expert SEO specialist. Generate SEO metadata for the following topic in Persian (Farsi).
Topic: ${topic}

Return a JSON object with exactly these fields:
{
  "seoTitle": "A compelling SEO title under 60 characters in Persian",
  "seoDesc": "A compelling meta description under 160 characters in Persian",
  "keywords": ["5-8 relevant SEO keywords in Persian"]
}

Return ONLY valid JSON, no markdown, no commentary.`
      : `You are an expert SEO specialist. Generate SEO metadata for the following topic in English.
Topic: ${topic}

Return a JSON object with exactly these fields:
{
  "seoTitle": "A compelling SEO title under 60 characters in English",
  "seoDesc": "A compelling meta description under 160 characters in English",
  "keywords": ["5-8 relevant SEO keywords in English"]
}

Return ONLY valid JSON, no markdown, no commentary.`;

    const options = {
      temperature: 0.7,
      maxOutputTokens: 500,
      responseFormat: 'json' as const,
    };

    // Gemini is tried first; if it is unavailable or returns nothing,
    // the request automatically falls back to DeepSeek (see src/app/api/lib/ai.ts).
    const result = await generateAIResponse(prompt, options);

    let parsed = extractJsonObject(result.text);

    // Gemini answered but its output was not usable JSON -> retry with DeepSeek.
    if (!parsed && result.provider === 'gemini') {
      console.error(
        '[seo-generate] Gemini returned non-JSON output, retrying with DeepSeek. Raw:',
        result.text.slice(0, 500)
      );
      const deepseekText = await callDeepseek(prompt, options);
      parsed = extractJsonObject(deepseekText);
      if (parsed) {
        result.text = deepseekText;
        result.provider = 'deepseek';
      }
    }

    if (!parsed) {
      return NextResponse.json(
        { success: false, error: 'Failed to parse AI response.' },
        { status: 500 }
      );
    }

    const seoTitle = String(parsed.seoTitle || '').trim();
    const seoDesc = String(parsed.seoDesc || '').trim();
    const keywords = Array.isArray(parsed.keywords)
      ? parsed.keywords.map(String).filter(Boolean).slice(0, 8)
      : [];

    if (!seoTitle || !seoDesc) {
      return NextResponse.json(
        { success: false, error: 'AI returned incomplete SEO data.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      provider: result.provider,
      seoTitle,
      seoDesc,
      keywords,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}