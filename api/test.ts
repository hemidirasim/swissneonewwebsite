export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    res.status(200).json({ 
      message: 'API is working',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Test failed',
      message: error.message 
    });
  }
}
