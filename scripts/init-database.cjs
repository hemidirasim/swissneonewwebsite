const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const DB_CONFIG = {
  host: 'j2tw.your-database.de',
  user: 'swissp_1',
  password: 'ti6NdPyN2uHREREA',
  database: 'swissp_db1',
  port: 5432,
  ssl: false
};

async function initializeDatabase() {
  const pool = new Pool(DB_CONFIG);
  
  try {
    console.log('🔗 Connecting to PostgreSQL database...');
    
    // Test connection
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as version');
    console.log('✅ Database connection successful');
    console.log('📅 Current time:', result.rows[0].current_time);
    console.log('🐘 PostgreSQL version:', result.rows[0].version.split(' ')[0]);
    client.release();
    
    // Read and execute SQL script
    const sqlPath = path.join(__dirname, '../database/init.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('📝 Executing database initialization script...');
    await pool.query(sqlScript);
    
    // Verify tables were created
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('articles', 'contact_submissions')
      ORDER BY table_name
    `);
    
    console.log('✅ Tables created successfully:');
    tablesResult.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });
    
    // Check article count
    const articlesCount = await pool.query('SELECT COUNT(*) as count FROM articles');
    console.log(`📰 Articles in database: ${articlesCount.rows[0].count}`);
    
    // Check contact submissions count
    const contactCount = await pool.query('SELECT COUNT(*) as count FROM contact_submissions');
    console.log(`📧 Contact submissions in database: ${contactCount.rows[0].count}`);
    
    console.log('🎉 Database initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the initialization
initializeDatabase();
