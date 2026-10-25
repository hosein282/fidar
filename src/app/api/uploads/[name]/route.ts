import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import path from 'path';

// Image content types by extension
const MIME_BY_EXT: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  avif: 'image/avif',
};

export const runtime = 'nodejs';

// Serves uploaded images from public/uploads on every request.
// Unlike static /public files (which are timestamped at server start and
// cause 404s until restart), this route streams the file straight from disk
// so newly uploaded covers appear immediately in production.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;

    // Only allow a plain filename like 1234567890-abc12345.png (reject any
    // path-traversal / nested path attempts).
    if (!/^[\w-]+\.[a-zA-Z0-9]{2,5}$/.test(name)) {
      return new NextResponse('Not found', { status: 404 });
    }

    const ext = name.split('.').pop()?.toLowerCase() || '';
    const mime = MIME_BY_EXT[ext];
    if (!mime) {
      return new NextResponse('Not found', { status: 404 });
    }

    const filePath = path.join(process.cwd(), 'public', 'uploads', name);
    let fileSize: number | null = null;
    try {
      fileSize = (await stat(filePath)).size;
    } catch {
      // file does not exist
    }
    if (fileSize == null) {
      return new NextResponse('Not found', { status: 404 });
    }

    const data = await readFile(filePath);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        'Content-Type': mime,
        'Content-Length': String(fileSize),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}