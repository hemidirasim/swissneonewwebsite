import { uploadImageWithFallback, validateImage, compressImage } from './imageService';

// Database configuration
const DB_CONFIG = {
  host: 'j2tw.your-database.de',
  user: 'swissp_1',
  password: 'ti6NdPyN2uHREREA',
  database: 'swissp_db1',
  port: 5432,
  ssl: false
};

// Types
export interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// Database connection function
async function getConnection() {
  try {
    const { Pool } = await import('pg');
    const pool = new Pool(DB_CONFIG);
    return pool;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed');
  }
}

// Initialize database tables
export async function initializeDatabase() {
  try {
    const pool = await getConnection();
    
    // Create articles table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        image TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create contact_submissions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.end();
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Load articles from database
export async function loadArticles(): Promise<Article[]> {
  try {
    const pool = await getConnection();
    const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
    await pool.end();
    
    return result.rows as Article[];
  } catch (error) {
    console.error('Error loading articles:', error);
    // Fallback to localStorage if database fails
    const stored = localStorage.getItem('articles');
    return stored ? JSON.parse(stored) : [];
  }
}

// Save article to database
export async function saveArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
  try {
    const pool = await getConnection();
    const now = new Date().toISOString();
    
    const result = await pool.query(
      'INSERT INTO articles (title, content, image, category, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [article.title, article.content, article.image, article.category, now, now]
    );
    
    await pool.end();
    
    return result.rows[0] as Article;
  } catch (error) {
    console.error('Error saving article:', error);
    throw error;
  }
}

// Update article in database
export async function updateArticle(id: string, updates: Partial<Article>): Promise<Article> {
  try {
    const pool = await getConnection();
    const now = new Date().toISOString();
    
    const updateFields = [];
    const updateValues = [];
    let paramIndex = 1;
    
    if (updates.title !== undefined) {
      updateFields.push(`title = $${paramIndex++}`);
      updateValues.push(updates.title);
    }
    if (updates.content !== undefined) {
      updateFields.push(`content = $${paramIndex++}`);
      updateValues.push(updates.content);
    }
    if (updates.image !== undefined) {
      updateFields.push(`image = $${paramIndex++}`);
      updateValues.push(updates.image);
    }
    if (updates.category !== undefined) {
      updateFields.push(`category = $${paramIndex++}`);
      updateValues.push(updates.category);
    }
    
    updateFields.push(`updated_at = $${paramIndex++}`);
    updateValues.push(now);
    updateValues.push(id);
    
    const result = await pool.query(
      `UPDATE articles SET ${updateFields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      updateValues
    );
    
    await pool.end();
    
    if (result.rows.length === 0) {
      throw new Error('Article not found');
    }
    
    return result.rows[0] as Article;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
}

// Delete article from database
export async function deleteArticle(id: string): Promise<void> {
  try {
    const pool = await getConnection();
    await pool.query('DELETE FROM articles WHERE id = $1', [id]);
    await pool.end();
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
}

// Load contact submissions from database
export async function loadContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const pool = await getConnection();
    const result = await pool.query('SELECT * FROM contact_submissions ORDER BY created_at DESC');
    await pool.end();
    
    return result.rows as ContactSubmission[];
  } catch (error) {
    console.error('Error loading contact submissions:', error);
    // Fallback to localStorage if database fails
    const stored = localStorage.getItem('contactSubmissions');
    return stored ? JSON.parse(stored) : [];
  }
}

// Add contact submission to database
export async function addContactSubmission(submission: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<ContactSubmission> {
  try {
    const pool = await getConnection();
    const now = new Date().toISOString();
    
    const result = await pool.query(
      'INSERT INTO contact_submissions (name, email, message, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
      [submission.name, submission.email, submission.message, now]
    );
    
    await pool.end();
    
    return result.rows[0] as ContactSubmission;
  } catch (error) {
    console.error('Error adding contact submission:', error);
    throw error;
  }
}

// Delete contact submission from database
export async function deleteContactSubmission(id: string): Promise<void> {
  try {
    const pool = await getConnection();
    await pool.query('DELETE FROM contact_submissions WHERE id = $1', [id]);
    await pool.end();
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    throw error;
  }
}

// Upload image function (unchanged)
export const uploadImage = async (file: File): Promise<string> => {
  const validation = validateImage(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  try {
    const compressedFile = await compressImage(file);
    return await uploadImageWithFallback(compressedFile);
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
};
