import databaseData from '@/data/database.json';
import { ImageService } from './imageService';

export interface Article {
  id: number;
  title: { az: string; en: string };
  content: { az: string; en: string };
  image?: string;
  date: string;
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
  private data: any;

  constructor() {
    // Initialize data from localStorage or default
    this.loadFromLocalStorage();
  }

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
      const user = {
        id: 1,
        username: 'admin',
        password_hash: 'hashed_password',
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Save session to localStorage
      this.saveSession(user);
      
      return user;
    }
    return null;
  }

  // Save session
  private saveSession(user: User) {
    const session = {
      user,
      loginTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 gün
    };
    localStorage.setItem('swissneo-admin-session', JSON.stringify(session));
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    try {
      const sessionData = localStorage.getItem('swissneo-admin-session');
      if (!sessionData) return false;

      const session = JSON.parse(sessionData);
      const now = new Date();
      const expiresAt = new Date(session.expiresAt);

      // Session expired
      if (now > expiresAt) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking session:', error);
      return false;
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    try {
      if (!this.isLoggedIn()) return null;

      const sessionData = localStorage.getItem('swissneo-admin-session');
      if (!sessionData) return null;

      const session = JSON.parse(sessionData);
      return session.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Logout
  logout(): void {
    localStorage.removeItem('swissneo-admin-session');
  }

  // Extend session
  extendSession(): void {
    try {
      const sessionData = localStorage.getItem('swissneo-admin-session');
      if (!sessionData) return;

      const session = JSON.parse(sessionData);
      session.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 gün
      localStorage.setItem('swissneo-admin-session', JSON.stringify(session));
    } catch (error) {
      console.error('Error extending session:', error);
    }
  }

  // Upload image using ImageService
  async uploadImage(file: File): Promise<string> {
    try {
      // Validate image first
      const validation = ImageService.validateImage(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Compress image if needed
      let processedFile = file;
      if (file.size > 5 * 1024 * 1024) { // Compress if > 5MB
        processedFile = await ImageService.compressImage(file, 1024);
      }

      // Upload using ImageService
      const imageUrl = await ImageService.uploadImage(processedFile);
      
      console.log('Image uploaded successfully:', imageUrl);
      return imageUrl;
      
    } catch (error) {
      console.error('Error uploading image:', error);
      
      // Final fallback: return a placeholder image URL
      return 'https://via.placeholder.com/400x300?text=Image+Upload+Failed';
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
    
    // Ensure articles array exists
    if (!this.data.articles) {
      this.data.articles = [];
    }
    
    this.data.articles = [...this.data.articles, newArticle];
    this.saveToLocalStorage();
    
    console.log('Article added successfully:', newArticle);
    console.log('Total articles:', this.data.articles.length);
    
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
    
    // Ensure contactSubmissions array exists
    if (!this.data.contactSubmissions) {
      this.data.contactSubmissions = [];
    }
    
    this.data.contactSubmissions = [...this.data.contactSubmissions, newSubmission];
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
      console.log('Data saved to localStorage:', this.data);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // Load from localStorage
  private loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('swissneo-database');
      if (saved) {
        this.data = JSON.parse(saved);
        console.log('Data loaded from localStorage:', this.data);
      } else {
        // Initialize with default data if nothing in localStorage
        this.data = { ...databaseData };
        console.log('Initialized with default data:', this.data);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      // Fallback to default data
      this.data = { ...databaseData };
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

export default databaseService;
