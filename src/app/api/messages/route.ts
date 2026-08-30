import { NextResponse } from 'next/server';
import { getAllMessages } from '../lib/store';

export async function GET() {
  try {
    const messages = await getAllMessages();
    return NextResponse.json(messages);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch messages.' },
      { status: 500 }
    );
  }
}
