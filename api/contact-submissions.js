const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).json({ message: 'OK' });
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        // Get all contact submissions
        const submissions = await prisma.contactSubmission.findMany({
          orderBy: { createdAt: 'desc' }
        });
        
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
  }
};
