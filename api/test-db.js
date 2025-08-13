import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
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

    console.log('Environment check:');
    console.log('DATABASE_URL exists:', !!databaseUrl);
    console.log('BLOB_READ_WRITE_TOKEN exists:', !!blobToken);

    if (!databaseUrl) {
      return res.status(500).json({
        success: false,
        error: 'DATABASE_URL environment variable is missing',
        env: {
          databaseUrl: !!databaseUrl,
          blobToken: !!blobToken
        }
      });
    }

    // Try to create Prisma client
    let prisma;
    try {
      prisma = new PrismaClient({
        datasources: {
          db: {
            url: databaseUrl
          }
        }
      });
      console.log('Prisma client created successfully');
    } catch (error) {
      console.error('Prisma client creation error:', error);
      return res.status(500).json({
        success: false,
        error: 'Prisma client creation failed',
        details: error.message
      });
    }

    // Try to connect to database
    try {
      await prisma.$connect();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error:', error);
      return res.status(500).json({
        success: false,
        error: 'Database connection failed',
        details: error.message
      });
    }

    // Try to query database
    try {
      const articles = await prisma.article.findMany({
        take: 1
      });
      console.log('Database query successful, found articles:', articles.length);
    } catch (error) {
      console.error('Database query error:', error);
      return res.status(500).json({
        success: false,
        error: 'Database query failed',
        details: error.message
      });
    }

    // Close connection
    await prisma.$disconnect();

    return res.status(200).json({
      success: true,
      message: 'Database connection and query successful',
      env: {
        databaseUrl: !!databaseUrl,
        blobToken: !!blobToken
      }
    });

  } catch (error) {
    console.error('General error:', error);
    return res.status(500).json({
      success: false,
      error: 'General error occurred',
      details: error.message
    });
  }
}
