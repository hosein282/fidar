import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

// Allowed image mime types → file extension
const ALLOWED_MIME: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
};

export const runtime = 'nodejs';

// Max accepted upload size (matches the admin hint): 2 MB
const MAX_SIZE = 2 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded. Use field name "file".' },
        { status: 400 }
      );
    }

    if (!file.type || !ALLOWED_MIME[file.type]) {
      return NextResponse.json(
        { success: false, error: 'Unsupported image type.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Image is larger than 2 MB.' },
        { status: 413 }
      );
    }

    const ext = ALLOWED_MIME[file.type];
    // Never trust the client filename; generate a safe unique name.
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, filename), buffer);

    // Return the dynamic API url (not /uploads/...) so the file is served
    // immediately in production — static /public files are only picked up
    // once the server restarts.
    return NextResponse.json({
      success: true,
      url: `/api/uploads/${filename}`,
      name: filename,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || 'Upload failed.' },
      { status: 500 }
    );
  }
}

// Limit: a single request body — file size guard
export const maxDuration = 60;