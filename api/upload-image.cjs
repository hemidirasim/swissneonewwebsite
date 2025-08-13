const { put } = require('@vercel/blob');

module.exports = async function handler(req, res) {
  // Always set JSON content type
  res.setHeader('Content-Type', 'application/json');
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).json({ message: 'OK' });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Check environment variable
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!blobToken) {
      console.error('BLOB_READ_WRITE_TOKEN is not configured');
      res.status(500).json({ error: 'Blob storage not configured' });
      return;
    }

    // Validate request body exists
    if (!req.body) {
      res.status(400).json({ error: 'Request body is required' });
      return;
    }

    // Parse request body safely
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      res.status(400).json({ error: 'Invalid JSON in request body' });
      return;
    }

    // Validate required fields
    const { file, fileName, fileType } = body || {};
    
    if (!file || !fileName || !fileType) {
      res.status(400).json({ 
        error: 'Missing required fields',
        required: ['file', 'fileName', 'fileType'],
        received: { 
          hasFile: !!file, 
          hasFileName: !!fileName, 
          hasFileType: !!fileType 
        }
      });
      return;
    }

    // Validate file type
    if (!fileType.startsWith('image/')) {
      res.status(400).json({ error: 'File must be an image' });
      return;
    }

    // Validate file is a string
    if (typeof file !== 'string') {
      res.status(400).json({ error: 'File must be a base64 string' });
      return;
    }

    // Process base64 data
    let buffer;
    try {
      const base64Data = file.replace(/^data:image\/[a-z]+;base64,/, '');
      buffer = Buffer.from(base64Data, 'base64');
    } catch (bufferError) {
      console.error('Buffer creation error:', bufferError);
      res.status(400).json({ error: 'Invalid base64 image data' });
      return;
    }

    // Validate file size
    if (buffer.length > 10 * 1024 * 1024) {
      res.status(400).json({ error: 'File size must be less than 10MB' });
      return;
    }

    // Create filename
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 15);
    const finalFileName = `swissneo_article_${timestamp}_${randomSuffix}_${fileName}`;
    
    console.log('Attempting to upload:', finalFileName, 'Size:', buffer.length);
    
    // Upload to Vercel Blob
    const { url } = await put(finalFileName, buffer, {
      access: 'public',
      addRandomSuffix: false
    });

    console.log('Successfully uploaded to Vercel Blob:', url);
    res.status(200).json({ url });
    
  } catch (error) {
    console.error('Serverless function error:', error);
    
    // Always return valid JSON, even on errors
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message || 'Unknown error occurred'
    });
  }
};
