import { NextRequest, NextResponse } from 'next/server';
import { deleteMessage } from '../../lib/store';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const messages = await deleteMessage(id);
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete message.' },
      { status: 500 }
    );
  }
}
