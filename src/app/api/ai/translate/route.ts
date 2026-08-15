import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'GEMINI_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = targetLang === 'fa'
      ? `Translate the following text to Persian (Farsi). Keep the meaning accurate and natural. Return only the translated text without any additional commentary:\n\n${text}`
      : `Translate the following text to English. Keep the meaning accurate and natural. Return only the translated text without any additional commentary:\n\n${text}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    const translatedText = response.text?.trim() || '';

    if (!translatedText) {
      return NextResponse.json(
        { success: false, error: 'Translation failed.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, translatedText });
  } catch (error) {
        console.log(error)

    return NextResponse.json(
      { success: false, error: 'Translation service error.' },
      { status: 500 }
    );
  }
}