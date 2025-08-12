import databaseData from '@/data/database.json';
import { put } from '@vercel/blob';

export interface Article {
  id: number;
  title: { az: string; en: string };
  excerpt: { az: string; en: string };
  category: { az: string; en: string };
  readTime: { az: string; en: string };
  author: { az: string; en: string };
  date: string;
  content: { az: string; en: string };
  image?: string; // Şəkil yolu
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  language: string;
  createdAt: string;
}

export interface User {
  id: number;
  username: string;
  password_hash: string;
  role: string;
  created_at: string;
  updated_at: string;
}

class DatabaseService {
  private data = { ...databaseData };

  // Get all data
  getData() {
    return this.data;
  }

  // Update data
  updateData(newData: any) {
    this.data = { ...this.data, ...newData };
    this.saveToLocalStorage();
  }

  // Authentication
  async authenticateUser(username: string, password: string): Promise<User | null> {
    // Simple authentication for admin
    if (username === 'admin' && password === 'swissneo2024') {
      return {
        id: 1,
        username: 'admin',
        password_hash: 'hashed_password',
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    return null;
  }

  // Upload image to Vercel Blob Storage
  async uploadImage(file: File): Promise<string> {
    try {
      // Create unique filename
      const timestamp = Date.now();
      const fileName = `article_${timestamp}_${file.name}`;
      
      // Upload to Vercel Blob
      const { url } = await put(fileName, file, {
        access: 'public',
        addRandomSuffix: false
      });
      
      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Şəkil yüklənə bilmədi');
    }
  }

  // Get articles
  getArticles(): Article[] {
    return this.data.articles || [];
  }

  // Add article
  addArticle(article: Omit<Article, 'id'>): Article {
    const newArticle: Article = {
      ...article,
      id: Date.now()
    };
    this.data.articles = [...(this.data.articles || []), newArticle];
    this.saveToLocalStorage();
    return newArticle;
  }

  // Update article
  updateArticle(id: number, updates: Partial<Article>): Article | null {
    const index = this.data.articles?.findIndex(article => article.id === id);
    if (index !== undefined && index !== -1 && this.data.articles) {
      this.data.articles[index] = { ...this.data.articles[index], ...updates };
      this.saveToLocalStorage();
      return this.data.articles[index];
    }
    return null;
  }

  // Delete article
  deleteArticle(id: number): boolean {
    if (this.data.articles) {
      const index = this.data.articles.findIndex(article => article.id === id);
      if (index !== -1) {
        // Şəkli də sil
        const article = this.data.articles[index] as Article;
        if (article.image) {
          // Vercel Blob-dan şəkli silmək üçün API endpoint yarada bilərik
          // Hələlik sadəcə məqaləni silirik
        }
        this.data.articles.splice(index, 1);
        this.saveToLocalStorage();
        return true;
      }
    }
    return false;
  }

  // Get contact submissions
  getContactSubmissions(): ContactSubmission[] {
    return this.data.contactSubmissions || [];
  }

  // Add contact submission
  addContactSubmission(submission: Omit<ContactSubmission, 'id' | 'createdAt'>): ContactSubmission {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    this.data.contactSubmissions = [...(this.data.contactSubmissions || []), newSubmission];
    this.saveToLocalStorage();
    return newSubmission;
  }

  // Delete contact submission
  deleteContactSubmission(id: number): boolean {
    if (this.data.contactSubmissions) {
      const index = this.data.contactSubmissions.findIndex(submission => submission.id === id);
      if (index !== -1) {
        this.data.contactSubmissions.splice(index, 1);
        this.saveToLocalStorage();
        return true;
      }
    }
    return false;
  }

  // Save to localStorage
  private saveToLocalStorage() {
    try {
      localStorage.setItem('swissneo-database', JSON.stringify(this.data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // Load from localStorage
  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('swissneo-database');
      if (saved) {
        this.data = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }

  // Reset to default data
  resetToDefault() {
    this.data = { ...databaseData };
    this.saveToLocalStorage();
  }
}

// Create singleton instance
const databaseService = new DatabaseService();

// Load data from localStorage on initialization
databaseService.loadFromLocalStorage();

export default databaseService;
