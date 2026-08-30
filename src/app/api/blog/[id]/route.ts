import { NextRequest, NextResponse } from 'next/server';
import { deletePost } from '../../lib/store';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const posts = await deletePost(id);
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete post.' },
      { status: 500 }
    );
  }
}
