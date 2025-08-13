const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({
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
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'Database operation failed',
      message: error.message
    });
  }
});

app.post('/api/articles', async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'Database operation failed',
      message: error.message
    });
  }
});

app.get('/api/contact-submissions', async (req, res) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({
      success: true,
      data: submissions.map(submission => ({
        id: submission.id,
        name: submission.name,
        email: submission.email,
        message: submission.message,
        created_at: submission.createdAt.toISOString()
      }))
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'Database operation failed',
      message: error.message
    });
  }
});

app.post('/api/contact-submissions', async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'Database operation failed',
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Development API server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints available:`);
  console.log(`   GET  /api/articles`);
  console.log(`   POST /api/articles`);
  console.log(`   GET  /api/contact-submissions`);
  console.log(`   POST /api/contact-submissions`);
});
