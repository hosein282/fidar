import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'GEMINI_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

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

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    const rawText = response.text?.trim() || '';

    // Extract JSON from the response (handle markdown code fences if present)
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { success: false, error: 'Failed to parse AI response.' },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]);

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
      seoTitle,
      seoDesc,
      keywords,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'SEO generation service error.' },
      { status: 500 }
    );
  }
}