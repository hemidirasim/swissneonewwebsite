import { put } from '@vercel/blob';

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if BLOB_READ_WRITE_TOKEN is available
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!blobToken) {
      console.error('BLOB_READ_WRITE_TOKEN is not configured');
      return res.status(500).json({ error: 'Blob storage not configured' });
    }

    // Get the file from the request body
    const { file, fileName, fileType } = req.body;
    
    if (!file || !fileName || !fileType) {
      return res.status(400).json({ error: 'File data is required' });
    }

    // Validate file type
    if (!fileType.startsWith('image/')) {
      return res.status(400).json({ error: 'File must be an image' });
    }

    // Convert base64 to buffer
    const base64Data = file.replace(/^data:image\/[a-z]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Validate file size (max 10MB)
    if (buffer.length > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'File size must be less than 10MB' });
    }

    // Create unique filename
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 15);
    const finalFileName = `swissneo_article_${timestamp}_${randomSuffix}_${fileName}`;
    
    // Upload to Vercel Blob
    const { url } = await put(finalFileName, buffer, {
      access: 'public',
      addRandomSuffix: false
    });

    console.log('Image uploaded successfully to Vercel Blob:', url);
    return res.status(200).json({ url });
    
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
}
