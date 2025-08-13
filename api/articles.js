import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).json({ message: 'OK' });
    return;
  }

  console.log('Articles API called with method:', req.method);

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
    console.log('Creating Prisma client...');
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

  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Database connected successfully');

    switch (req.method) {
      case 'GET':
        console.log('Fetching articles...');
        const articles = await prisma.article.findMany({
          orderBy: { createdAt: 'desc' }
        });
        
        console.log(`Found ${articles.length} articles`);
        
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
        console.log('Creating new article...');
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

        console.log('Article created successfully:', newArticle.id);

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
        console.log('Updating article...');
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

        console.log('Article updated successfully:', id);

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
        console.log('Deleting article...');
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

        console.log('Article deleted successfully:', deleteId);

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
    console.error('Database operation error:', error);
    res.status(500).json({
      success: false,
      error: 'Database operation failed',
      details: error.message
    });
  } finally {
    if (prisma) {
      try {
        await prisma.$disconnect();
        console.log('Database connection closed');
      } catch (error) {
        console.error('Error closing database connection:', error);
      }
    }
  }
}
