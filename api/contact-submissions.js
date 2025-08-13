import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).json({ message: 'OK' });
    return;
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
    console.log('Creating Prisma client for contact submissions...');
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl
        }
      }
    });
    console.log('Prisma client created successfully for contact submissions');
  } catch (error) {
    console.error('Prisma client creation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Prisma client creation failed',
      details: error.message
    });
  }

  try {
    console.log('Connecting to database for contact submissions...');
    await prisma.$connect();
    console.log('Database connected successfully for contact submissions');

    switch (req.method) {
      case 'GET':
        console.log('Fetching contact submissions...');
        // Get all contact submissions
        const submissions = await prisma.contactSubmission.findMany({
          orderBy: { createdAt: 'desc' }
        });
        
        console.log(`Found ${submissions.length} contact submissions`);
        
        res.status(200).json({
          success: true,
          data: submissions.map(submission => ({
            id: submission.id,
            name: submission.name,
            email: submission.email,
            message: submission.message,
            created_at: submission.createdAt.toISOString()
          }))
        });
        break;

      case 'POST':
        console.log('Creating new contact submission...');
        // Create new contact submission
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
          res.status(400).json({
            success: false,
            error: 'Name, email, and message are required'
          });
          return;
        }

        const newSubmission = await prisma.contactSubmission.create({
          data: {
            name,
            email,
            message
          }
        });

        console.log('Contact submission created successfully:', newSubmission.id);

        res.status(201).json({
          success: true,
          data: {
            id: newSubmission.id,
            name: newSubmission.name,
            email: newSubmission.email,
            message: newSubmission.message,
            created_at: newSubmission.createdAt.toISOString()
          }
        });
        break;

      case 'DELETE':
        console.log('Deleting contact submission...');
        // Delete contact submission
        const { id: deleteId } = req.query;
        
        if (!deleteId) {
          res.status(400).json({
            success: false,
            error: 'Submission ID is required'
          });
          return;
        }

        await prisma.contactSubmission.delete({
          where: { id: deleteId }
        });

        console.log('Contact submission deleted successfully:', deleteId);

        res.status(200).json({
          success: true,
          message: 'Contact submission deleted successfully'
        });
        break;

      default:
        res.status(405).json({
          success: false,
          error: 'Method not allowed'
        });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'Database operation failed',
      message: error.message
    });
  } finally {
    if (prisma) {
      try {
        await prisma.$disconnect();
        console.log('Database connection closed for contact submissions');
      } catch (error) {
        console.error('Error closing database connection:', error);
      }
    }
  }
}
