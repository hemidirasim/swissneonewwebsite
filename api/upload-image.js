import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { file, fileName, fileType } = await request.json();

    if (!file || !fileName || !fileType) {
      return NextResponse.json(
        { error: 'File, fileName, and fileType are required' },
        { status: 400 }
      );
    }

    // Convert base64 to buffer
    const base64Data = file.replace(/^data:image\/[a-z]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Upload to Vercel Blob
    const blob = await put(fileName, buffer, {
      access: 'public',
      contentType: fileType,
    });

    console.log('Image uploaded to Vercel Blob:', blob.url);

    return NextResponse.json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    );
  }
}
