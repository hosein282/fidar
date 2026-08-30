import { NextRequest, NextResponse } from 'next/server';

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

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'DEEPSEEK_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    const prompt = targetLang === 'fa'
      ? `Translate the following text to Persian (Farsi). Keep the meaning accurate and natural. Return only the translated text without any additional commentary:\n\n${text}`
      : `Translate the following text to English. Keep the meaning accurate and natural. Return only the translated text without any additional commentary:\n\n${text}`;

    // استفاده از DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat', // مدل رایگان
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3, // دمای پایین برای ترجمه دقیق‌تر
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('DeepSeek API error:', errorData);
      return NextResponse.json(
        { success: false, error: `DeepSeek API error: ${errorData.error?.message || 'Unknown error'}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content?.trim() || '';

    if (!translatedText) {
      return NextResponse.json(
        { success: false, error: 'Translation failed.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Translation service error.' },
      { status: 500 }
    );
  }
}