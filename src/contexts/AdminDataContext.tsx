import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Article, 
  ContactSubmission, 
  loadArticles, 
  saveArticle, 
  updateArticle, 
  deleteArticle, 
  loadContactSubmissions, 
  addContactSubmission,
  deleteContactSubmission
} from '@/services/prismaService';

interface AdminDataContextType {
  adminData: any;
  articles: Article[];
  contactSubmissions: ContactSubmission[];
  updateAdminData: (newData: any) => void;
  addArticle: (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateArticle: (id: string, updates: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  addContactSubmission: (submission: Omit<ContactSubmission, 'id' | 'created_at'>) => Promise<ContactSubmission>;
  deleteContactSubmission: (id: string) => Promise<void>;
  loading: boolean;
  refreshData: () => Promise<void>;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

// Cache for articles to avoid unnecessary reloads
let articlesCache: Article[] | null = null;
let lastLoadTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminData, setAdminData] = useState<any>({});
  const [articles, setArticles] = useState<Article[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading data from remote database...');
      
      // Check if we have cached articles and they're still fresh
      const now = Date.now();
      if (articlesCache && (now - lastLoadTime) < CACHE_DURATION) {
        console.log('📦 Using cached articles');
        setArticles(articlesCache);
        setLoading(false);
        return;
      }
      
      // Load articles only (contact submissions are not needed for articles page)
      const articlesData = await loadArticles();
      
      console.log('📝 Articles loaded:', articlesData.length);
      
      // Update cache
      articlesCache = articlesData;
      lastLoadTime = now;
      
      setArticles(articlesData);
      setContactSubmissions([]); // Don't load contact submissions unless needed
    } catch (error) {
      console.error('❌ Error loading data:', error);
      // No fallback - only remote database
      setArticles([]);
      setContactSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    // Clear cache and reload
    articlesCache = null;
    lastLoadTime = 0;
    await loadData();
  };

  const updateAdminData = (newData: any) => {
    setAdminData(prev => ({ ...prev, ...newData }));
  };

  const addArticle = async (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newArticle = await saveArticle(article);
      setArticles(prev => [newArticle, ...prev]);
      // Update cache
      articlesCache = [newArticle, ...(articlesCache || [])];
    } catch (error) {
      console.error('Error adding article:', error);
      throw error;
    }
  };

  const updateArticleById = async (id: string, updates: Partial<Article>) => {
    try {
      const updatedArticle = await updateArticle(id, updates);
      setArticles(prev => prev.map(article => 
        article.id === id ? updatedArticle : article
      ));
      // Update cache
      if (articlesCache) {
        articlesCache = articlesCache.map(article => 
          article.id === id ? updatedArticle : article
        );
      }
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  };

  const deleteArticleById = async (id: string) => {
    try {
      await deleteArticle(id);
      setArticles(prev => prev.filter(article => article.id !== id));
      // Update cache
      if (articlesCache) {
        articlesCache = articlesCache.filter(article => article.id !== id);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  };

  const addContactSubmissionHandler = async (submission: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<ContactSubmission> => {
    try {
      const newSubmission = await addContactSubmission(submission);
      setContactSubmissions(prev => [newSubmission, ...prev]);
      return newSubmission;
    } catch (error) {
      console.error('Error adding contact submission:', error);
      throw error;
    }
  };

  const deleteContactSubmissionById = async (id: string) => {
    try {
      await deleteContactSubmission(id);
      setContactSubmissions(prev => prev.filter(submission => submission.id !== id));
    } catch (error) {
      console.error('Error deleting contact submission:', error);
      throw error;
    }
  };

  const value: AdminDataContextType = {
    adminData,
    articles,
    contactSubmissions,
    updateAdminData,
    addArticle,
    updateArticle: updateArticleById,
    deleteArticle: deleteArticleById,
    addContactSubmission,
    deleteContactSubmission: deleteContactSubmissionById,
    loading,
    refreshData
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (context === undefined) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};