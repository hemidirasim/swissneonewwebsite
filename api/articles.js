const { PrismaClient } = require('@prisma/client');

let prisma;

try {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });
} catch (error) {
  console.error('Prisma client initialization error:', error);
  return res.status(500).json({
    success: false,
    error: 'Database connection failed',
    details: error.message
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).json({ message: 'OK' });
    return;
  }

  try {
    // Test database connection
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

  try {
    switch (req.method) {
      case 'GET':
        // Get all articles
        const articles = await prisma.article.findMany({
          orderBy: { createdAt: 'desc' }
        });
        
        res.status(200).json({
          success: true,
          data: articles.map(article => ({
            id: article.id,
            title: article.title,
            content: article.content,
            image: article.image,
            category: article.category,
            created_at: article.createdAt.toISOString(),
            updated_at: article.updatedAt.toISOString()
          }))
        });
        break;

      case 'POST':
        // Create new article
        const { title, content, image, category } = req.body;
        
        if (!title || !content || !category) {
          res.status(400).json({
            success: false,
            error: 'Title, content, and category are required'
          });
          return;
        }

        const newArticle = await prisma.article.create({
          data: {
            title,
            content,
            image: image || 'https://via.placeholder.com/400x300?text=No+Image',
            category
          }
        });

        res.status(201).json({
          success: true,
          data: {
            id: newArticle.id,
            title: newArticle.title,
            content: newArticle.content,
            image: newArticle.image,
            category: newArticle.category,
            created_at: newArticle.createdAt.toISOString(),
            updated_at: newArticle.updatedAt.toISOString()
          }
        });
        break;

      case 'PUT':
        // Update article
        const { id, ...updates } = req.body;
        
        if (!id) {
          res.status(400).json({
            success: false,
            error: 'Article ID is required'
          });
          return;
        }

        const updatedArticle = await prisma.article.update({
          where: { id },
          data: updates
        });

        res.status(200).json({
          success: true,
          data: {
            id: updatedArticle.id,
            title: updatedArticle.title,
            content: updatedArticle.content,
            image: updatedArticle.image,
            category: updatedArticle.category,
            created_at: updatedArticle.createdAt.toISOString(),
            updated_at: updatedArticle.updatedAt.toISOString()
          }
        });
        break;

      case 'DELETE':
        // Delete article
        const { id: deleteId } = req.query;
        
        if (!deleteId) {
          res.status(400).json({
            success: false,
            error: 'Article ID is required'
          });
          return;
        }

        await prisma.article.delete({
          where: { id: deleteId }
        });

        res.status(200).json({
          success: true,
          message: 'Article deleted successfully'
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
