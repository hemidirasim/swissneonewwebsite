const { Pool } = require('pg');

const DB_CONFIG = {
  host: 'j2tw.your-database.de',
  user: 'swissp_1',
  password: 'ti6NdPyN2uHREREA',
  database: 'swissp_db1',
  port: 5432,
  ssl: false
};

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).json({ message: 'OK' });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    console.log('Initializing database tables...');
    
    const pool = new Pool(DB_CONFIG);
    
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
    console.log('Articles table created/verified');

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
    console.log('Contact submissions table created/verified');

    // Check if tables exist and have data
    const articlesCount = await pool.query('SELECT COUNT(*) as count FROM articles');
    const contactCount = await pool.query('SELECT COUNT(*) as count FROM contact_submissions');
    
    await pool.end();
    
    res.status(200).json({
      success: true,
      message: 'Database tables initialized successfully',
      data: {
        articlesCount: articlesCount.rows[0].count,
        contactSubmissionsCount: contactCount.rows[0].count,
        tables: ['articles', 'contact_submissions']
      }
    });
    
  } catch (error) {
    console.error('Database initialization error:', error);
    res.status(500).json({
      success: false,
      error: 'Database initialization failed',
      message: error.message,
      stack: error.stack
    });
  }
};
