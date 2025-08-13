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

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    console.log('Testing database connection...');
    
    const pool = new Pool(DB_CONFIG);
    
    // Test connection
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as version');
    client.release();
    
    // Test articles table
    const articlesResult = await pool.query('SELECT COUNT(*) as count FROM articles');
    
    await pool.end();
    
    res.status(200).json({
      success: true,
      message: 'Database connection successful',
      data: {
        currentTime: result.rows[0].current_time,
        version: result.rows[0].version,
        articlesCount: articlesResult.rows[0].count
      }
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({
      success: false,
      error: 'Database connection failed',
      message: error.message,
      stack: error.stack
    });
  }
};
