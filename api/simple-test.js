module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).json({ message: 'OK' });
    return;
  }

  try {
    // Check environment variables
    const databaseUrl = process.env.DATABASE_URL;
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    return res.status(200).json({
      success: true,
      message: 'Simple test endpoint working',
      timestamp: new Date().toISOString(),
      env: {
        databaseUrl: !!databaseUrl,
        blobToken: !!blobToken,
        nodeEnv: process.env.NODE_ENV
      }
    });

  } catch (error) {
    console.error('Simple test error:', error);
    return res.status(500).json({
      success: false,
      error: 'Simple test failed',
      details: error.message
    });
  }
};
