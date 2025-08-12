// Client-side database service - uses fallback data only
// PostgreSQL operations are handled server-side

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
  // Client-side only - always use fallback data
  private isConnected = false;

  constructor() {
    console.log('⚠️ Using client-side fallback data');
    this.isConnected = false;
  }

  // Authentication - client-side fallback
  async authenticateUser(username: string, password: string): Promise<User | null> {
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

  // Site Content Operations - always return fallback
  async getSiteContent(): Promise<Record<string, any>> {
    return fallbackSiteContent;
  }

  async updateSiteContent(section: string, field: string, language: string, content: string): Promise<void> {
    console.log('⚠️ Client-side: Content update not saved (use admin panel)');
    // In a real app, this would make an API call to the server
  }

  // Articles Operations - always return fallback
  async getArticles(): Promise<Article[]> {
    return fallbackArticles;
  }

  async getArticleById(id: number): Promise<Article | null> {
    return fallbackArticles.find(article => article.id === id) || null;
  }

  async createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
    const newArticle: Article = {
      ...article,
      id: Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    fallbackArticles.unshift(newArticle);
    return newArticle;
  }

  async updateArticle(id: number, updates: Partial<Article>): Promise<Article | null> {
    const index = fallbackArticles.findIndex(article => article.id === id);
    if (index !== -1) {
      fallbackArticles[index] = { ...fallbackArticles[index], ...updates, updated_at: new Date().toISOString() };
      return fallbackArticles[index];
    }
    return null;
  }

  async deleteArticle(id: number): Promise<boolean> {
    const index = fallbackArticles.findIndex(article => article.id === id);
    if (index !== -1) {
      fallbackArticles.splice(index, 1);
      return true;
    }
    return false;
  }

  // Contact Submissions Operations - client-side only
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return [];
  }

  async createContactSubmission(submission: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<ContactSubmission> {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: Date.now(),
      created_at: new Date().toISOString()
    };
    return newSubmission;
  }

  async deleteContactSubmission(id: number): Promise<boolean> {
    return false;
  }

  // Close database connection - not needed for client-side
  async close() {
    // No connection to close
  }
}

// Create singleton instance
const databaseService = new DatabaseService();

export default databaseService;
