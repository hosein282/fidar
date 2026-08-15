import { NextRequest, NextResponse } from 'next/server';
import { ContactMessage, Language } from '@/src/types';
import { addMessage } from '../lib/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const message = String(body.message || '').trim();
    const service = String(body.service || '').trim();
    const company = body.company ? String(body.company).trim() : undefined;
    const budget = body.budget ? String(body.budget).trim() : '';
    const lang: Language = body.lang === 'en' ? 'en' : 'fa';

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
      lang,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    await addMessage(newMessage);

    return NextResponse.json({ success: true, message: 'Message stored successfully.' });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || 'Invalid request body.' },
      { status: 500 }
    );
  }
}
