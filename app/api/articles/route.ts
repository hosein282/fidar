import { NextRequest, NextResponse } from 'next/server';
import { BlogPost } from '@/src/types';
import { getPostsByType, addPost } from '../lib/store';
import { sanitizeBlogPost } from '@/src/utils/sanitize';

export async function GET() {
  try {
    const articles = await getPostsByType('article');
    return NextResponse.json(articles);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch articles.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const post = sanitizeBlogPost({ ...body, postType: 'article' } as Partial<BlogPost>);
    const posts = await addPost(post);
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || 'Invalid article data.' },
      { status: 500 }
    );
  }
}
