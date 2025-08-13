import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).json({ message: 'OK' });
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  // Check environment variables
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL is missing');
    return res.status(500).json({
      success: false,
      error: 'DATABASE_URL environment variable is missing'
    });
  }

  let prisma;
  try {
    console.log('Creating Prisma client for auth...');
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl
        }
      }
    });
    console.log('Prisma client created successfully for auth');
  } catch (error) {
    console.error('Prisma client creation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Prisma client creation failed',
      details: error.message
    });
  }

  try {
    console.log('Connecting to database for auth...');
    await prisma.$connect();
    console.log('Database connected successfully for auth');

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required'
      });
    }

    // Find admin by username
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account is deactivated'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Return admin info (without password)
    return res.status(200).json({
      success: true,
      data: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive
      }
    });

  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authentication failed',
      details: error.message
    });
  } finally {
    if (prisma) {
      try {
        await prisma.$disconnect();
        console.log('Database connection closed for auth');
      } catch (error) {
        console.error('Error closing database connection:', error);
      }
    }
  }
}
