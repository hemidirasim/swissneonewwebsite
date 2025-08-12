import pool, { testConnection } from '@/config/database';

export interface User {
  id: number;
  username: string;
  password_hash: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface SiteContent {
  id: number;
  section: string;
  field: string;
  language: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  title_az: string;
  title_en: string;
  excerpt_az: string;
  excerpt_en: string;
  category_az: string;
  category_en: string;
  read_time_az: string;
  read_time_en: string;
  author_az: string;
  author_en: string;
  content_az: string;
  content_en: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  language: string;
  created_at: string;
}

// Fallback data when database is not available - ORIGINAL DATA
const fallbackSiteContent = {
  hero: {
    title: { az: 'İsveçrə keyfiyyətində', en: 'Swiss Quality' },
    subtitle: { az: 'Premium uşaq qidası', en: 'Premium Baby Formula' },
    description: { az: 'Swissneo — 100 ildən artıq İsveçrə təcrübəsi ilə hazırlanmış super premium uşaq qarışığı. Uşağınızın sağlam inkişafı və güclü immunitet üçün.', en: 'Swissneo — super premium baby formula crafted with over 100 years of Swiss expertise. For your baby\'s healthy development and strong immunity.' }
  },
  product1: {
    name: { az: 'Swissneo Super Premium Formula 0-6 ay', en: 'Swissneo Super Premium Formula 0-6 months' },
    description: { az: 'Doğulduğu gündən etibarən 6 ayadək olan körpələr üçün başlanğıc süd qarışığı', en: 'Starting infant milk formula for babies from birth to 6 months' }
  },
  product2: {
    name: { az: 'Swissneo Super Premium Formula 6-12 ay', en: 'Swissneo Super Premium Formula 6-12 months' },
    description: { az: '6-12 aylıq körpələr üçün növbəti mərhələ süd qarışığı', en: 'Follow-on milk formula for babies from 6 to 12 months' }
  },
  contact: {
    phone: '+994 XX XXX XX XX',
    email: 'info@swissneo.az',
    address: { az: 'Bakı, Azərbaycan', en: 'Baku, Azerbaijan' }
  },
  company: {
    description: { az: 'Swissneo — süd məhsulları sahəsində 100 ildən artıq təcrübəyə malik İsveçrənin super premium uşaq qidası markasıdır.', en: 'Swissneo is a super premium baby food brand from Switzerland with over 100 years of experience in dairy products.' },
    mission: { az: 'Keyfiyyətə önəm verən və uşaqlarına ən yaxşısını vermək istəyən Azərbaycan valideynlərinin artan tələbatını qarşılamaq.', en: 'To meet the growing demand of knowledgeable Azerbaijani parents who value quality and want to give their children the best.' },
    quality: { az: 'İsveçrənin ən yüksək keyfiyyət standartları ilə istehsal olunan məhsullarımız uşağınızın təhlükəsizliyi üçün bütün sertifikatları daşıyır.', en: 'Our products manufactured with Switzerland\'s highest quality standards carry all certifications for your child\'s safety.' }
  },
  instructions: {
    title: { az: 'Qidalandırma Təlimatları', en: 'Feeding Instructions' },
    description: { az: 'Körpənizi düzgün qidalandırmaq üçün vacib təlimatlar', en: 'Important instructions for properly feeding your baby' }
  },
  articles: {
    title: { az: 'Məqalələr və Məsləhətlər', en: 'Articles & Tips' },
    description: { az: 'Körpə qidalandırması haqqında faydalı məqalələr', en: 'Useful articles about baby nutrition' }
  },
  footer: {
    description: { az: 'Swissneo — İsveçrə keyfiyyətində premium uşaq qidası', en: 'Swissneo — Premium baby food with Swiss quality' },
    copyright: { az: '© 2024 Swissneo. Bütün hüquqlar qorunur.', en: '© 2024 Swissneo. All rights reserved.' }
  }
};

const fallbackArticles: Article[] = [
  {
    id: 1,
    title_az: 'İlk 6 Ayda Körpə Qidalandırması',
    title_en: 'Baby Nutrition in First 6 Months',
    excerpt_az: 'Yeni doğulmuş körpələrin qidalandırılması üçün əsas məlumatlar',
    excerpt_en: 'Essential information for feeding newborns',
    category_az: 'Qidalandırma',
    category_en: 'Nutrition',
    read_time_az: '5 dəq',
    read_time_en: '5 min',
    author_az: 'Dr. Aynur Məmmədova',
    author_en: 'Dr. Aynur Mammadova',
    content_az: 'Körpə qidalandırması haqqında ətraflı məlumat...',
    content_en: 'Detailed information about baby nutrition...',
    created_at: '2024-01-15T00:00:00.000Z',
    updated_at: '2024-01-15T00:00:00.000Z'
  },
  {
    id: 2,
    title_az: 'DHA və ARA-nın Əhəmiyyəti',
    title_en: 'Importance of DHA and ARA',
    excerpt_az: 'Bu vacib yağ turşularının körpə inkişafındakı rolu',
    excerpt_en: 'The role of these essential fatty acids in baby development',
    category_az: 'Sağlamlıq',
    category_en: 'Health',
    read_time_az: '7 dəq',
    read_time_en: '7 min',
    author_az: 'Dr. Elnur Hüseynov',
    author_en: 'Dr. Elnur Huseynov',
    content_az: 'DHA və ARA haqqında ətraflı məlumat...',
    content_en: 'Detailed information about DHA and ARA...',
    created_at: '2024-01-20T00:00:00.000Z',
    updated_at: '2024-01-20T00:00:00.000Z'
  }
];

class DatabaseService {
  private isConnected = false;

  constructor() {
    this.checkConnection();
  }

  private async checkConnection() {
    try {
      this.isConnected = await testConnection();
      console.log(this.isConnected ? '✅ Database connected' : '⚠️ Using fallback data');
    } catch (error) {
      console.log('⚠️ Database connection failed, using fallback data');
      this.isConnected = false;
    }
  }

  // Authentication
  async authenticateUser(username: string, password: string): Promise<User | null> {
    if (!this.isConnected) {
      // Fallback authentication
      if (username === 'admin' && password === 'swissneo2024') {
        return {
          id: 1,
          username: 'admin',
          password_hash: 'fallback',
          role: 'admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      }
      return null;
    }

    try {
      const bcrypt = await import('bcrypt');
      const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );

      if (result.rows.length === 0) {
        return null;
      }

      const user = result.rows[0];
      const isValidPassword = await bcrypt.default.compare(password, user.password_hash);

      if (!isValidPassword) {
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error authenticating user:', error);
      return null;
    }
  }

  // Site Content Operations
  async getSiteContent(): Promise<Record<string, any>> {
    if (!this.isConnected) {
      return fallbackSiteContent;
    }

    try {
      const result = await pool.query('SELECT * FROM site_content');
      const content: Record<string, any> = {};

      result.rows.forEach((row: SiteContent) => {
        if (!content[row.section]) {
          content[row.section] = {};
        }
        if (!content[row.section][row.field]) {
          content[row.section][row.field] = {};
        }
        content[row.section][row.field][row.language] = row.content;
      });

      return content;
    } catch (error) {
      console.error('Error getting site content:', error);
      return fallbackSiteContent;
    }
  }

  async updateSiteContent(section: string, field: string, language: string, content: string): Promise<void> {
    if (!this.isConnected) {
      console.log('⚠️ Database not connected, content not saved');
      return;
    }

    try {
      await pool.query(
        `INSERT INTO site_content (section, field, language, content) 
         VALUES ($1, $2, $3, $4) 
         ON CONFLICT (section, field, language) 
         DO UPDATE SET content = $4, updated_at = CURRENT_TIMESTAMP`,
        [section, field, language, content]
      );
    } catch (error) {
      console.error('Error updating site content:', error);
      throw error;
    }
  }

  // Articles Operations
  async getArticles(): Promise<Article[]> {
    if (!this.isConnected) {
      return fallbackArticles;
    }

    try {
      const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      console.error('Error getting articles:', error);
      return fallbackArticles;
    }
  }

  async getArticleById(id: number): Promise<Article | null> {
    if (!this.isConnected) {
      return fallbackArticles.find(article => article.id === id) || null;
    }

    try {
      const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error getting article:', error);
      return fallbackArticles.find(article => article.id === id) || null;
    }
  }

  async createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
    if (!this.isConnected) {
      const newArticle: Article = {
        ...article,
        id: Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      fallbackArticles.unshift(newArticle);
      return newArticle;
    }

    try {
      const result = await pool.query(
        `INSERT INTO articles (title_az, title_en, excerpt_az, excerpt_en, category_az, category_en, 
         read_time_az, read_time_en, author_az, author_en, content_az, content_en) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
         RETURNING *`,
        [
          article.title_az, article.title_en, article.excerpt_az, article.excerpt_en,
          article.category_az, article.category_en, article.read_time_az, article.read_time_en,
          article.author_az, article.author_en, article.content_az, article.content_en
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  }

  async updateArticle(id: number, updates: Partial<Article>): Promise<Article | null> {
    if (!this.isConnected) {
      const index = fallbackArticles.findIndex(article => article.id === id);
      if (index !== -1) {
        fallbackArticles[index] = { ...fallbackArticles[index], ...updates, updated_at: new Date().toISOString() };
        return fallbackArticles[index];
      }
      return null;
    }

    try {
      const fields = Object.keys(updates).filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at');
      const values = Object.values(updates).filter((_, index) => fields[index]);
      
      if (fields.length === 0) return null;

      const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
      const query = `UPDATE articles SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`;
      
      const result = await pool.query(query, [id, ...values]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  }

  async deleteArticle(id: number): Promise<boolean> {
    if (!this.isConnected) {
      const index = fallbackArticles.findIndex(article => article.id === id);
      if (index !== -1) {
        fallbackArticles.splice(index, 1);
        return true;
      }
      return false;
    }

    try {
      const result = await pool.query('DELETE FROM articles WHERE id = $1', [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  }

  // Contact Submissions Operations
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    if (!this.isConnected) {
      return [];
    }

    try {
      const result = await pool.query('SELECT * FROM contact_submissions ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      console.error('Error getting contact submissions:', error);
      return [];
    }
  }

  async createContactSubmission(submission: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<ContactSubmission> {
    if (!this.isConnected) {
      const newSubmission: ContactSubmission = {
        ...submission,
        id: Date.now(),
        created_at: new Date().toISOString()
      };
      return newSubmission;
    }

    try {
      const result = await pool.query(
        'INSERT INTO contact_submissions (name, email, phone, message, language) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [submission.name, submission.email, submission.phone, submission.message, submission.language]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating contact submission:', error);
      throw error;
    }
  }

  async deleteContactSubmission(id: number): Promise<boolean> {
    if (!this.isConnected) {
      return false;
    }

    try {
      const result = await pool.query('DELETE FROM contact_submissions WHERE id = $1', [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error deleting contact submission:', error);
      throw error;
    }
  }

  // Close database connection
  async close() {
    if (this.isConnected) {
      await pool.end();
    }
  }
}

// Create singleton instance
const databaseService = new DatabaseService();

export default databaseService;
