import { NextRequest, NextResponse } from 'next/server';
import { generateAIResponse } from '../../lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text = String(body.text || '').trim();
    const targetLang = body.targetLang === 'fa' ? 'fa' : 'en';

    if (!text) {
      return NextResponse.json(
        { success: false, error: 'Text is required.' },
        { status: 400 }
      );
    }

    const prompt = targetLang === 'fa'
      ? `Translate the following text to Persian (Farsi). Keep the meaning accurate and natural. Return only the translated text without any additional commentary:\n\n${text}`
      : `Translate the following text to English. Keep the meaning accurate and natural. Return only the translated text without any additional commentary:\n\n${text}`;

    // Gemini is tried first; if it is unavailable or returns nothing,
    // the request automatically falls back to DeepSeek (see src/app/api/lib/ai.ts).
    const result = await generateAIResponse(prompt, {
      temperature: 0.3, // پایین برای ترجمه دقیق‌تر
      maxOutputTokens: 1000,
    });

    const translatedText = result.text;

    if (!translatedText) {
      return NextResponse.json(
        { success: false, error: 'Translation failed.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      provider: result.provider,
      translatedText,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Translation service error.' },
      { status: 500 }
    );
  }
}