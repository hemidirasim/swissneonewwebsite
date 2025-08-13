const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { put } = require('@vercel/blob');
const bcrypt = require('bcryptjs');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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

// Update article endpoint
app.put('/api/articles', async (req, res) => {
  try {
    const { id, title, content, image, category } = req.body;
    
    if (!id || !title || !content) {
      res.status(400).json({
        success: false,
        error: 'ID, title, and content are required'
      });
      return;
    }

    const updateData = { title, content };
    if (image !== undefined) updateData.image = image;
    if (category !== undefined) updateData.category = category;

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: updateData
    });

    res.json({
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
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'Database operation failed',
      message: error.message
    });
  }
});

// Delete article endpoint
app.delete('/api/articles', async (req, res) => {
  try {
    const { id } = req.query;
    
    if (!id) {
      res.status(400).json({
        success: false,
        error: 'Article ID is required'
      });
      return;
    }

    await prisma.article.delete({
      where: { id: id.toString() }
    });

    res.json({
      success: true,
      message: 'Article deleted successfully'
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

// Admin authentication endpoint
app.post('/api/auth', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        success: false,
        error: 'Username and password are required'
      });
      return;
    }

    // Find admin by username
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
      return;
    }

    // Check if admin is active
    if (!admin.isActive) {
      res.status(401).json({
        success: false,
        error: 'Account is deactivated'
      });
      return;
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
      return;
    }

    // Return admin info (without password)
    res.json({
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
    res.status(500).json({
      success: false,
      error: 'Authentication failed'
    });
  }
});

// Upload image to Vercel Blob Storage
app.post('/api/upload-image-blob', async (req, res) => {
  try {
    const { file, fileName, fileType } = req.body;

    if (!file || !fileName || !fileType) {
      res.status(400).json({
        success: false,
        error: 'File, fileName, and fileType are required'
      });
      return;
    }

    // Convert base64 to buffer
    const base64Data = file.replace(/^data:image\/[a-z]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    console.log('Uploading to Vercel Blob:', fileName, 'Size:', buffer.length);

    // Upload to Vercel Blob
    const blob = await put(fileName, buffer, {
      access: 'public',
      contentType: fileType,
    });

    console.log('Image uploaded to Vercel Blob:', blob.url);

    res.json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Upload failed',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Development API server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints available:`);
  console.log(`   GET  /api/articles`);
  console.log(`   POST /api/articles`);
  console.log(`   PUT  /api/articles`);
  console.log(`   DELETE /api/articles`);
  console.log(`   POST /api/auth`);
  console.log(`   POST /api/upload-image-blob`);
  console.log(`   GET  /api/contact-submissions`);
  console.log(`   POST /api/contact-submissions`);
});
