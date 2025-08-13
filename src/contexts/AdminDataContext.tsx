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
  deleteContactSubmission,
  initializeDatabase 
} from '@/services/prismaService';

interface AdminDataContextType {
  adminData: any;
  articles: Article[];
  contactSubmissions: ContactSubmission[];
  updateAdminData: (newData: any) => void;
  addArticle: (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateArticle: (id: string, updates: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  addContactSubmission: (submission: Omit<ContactSubmission, 'id' | 'created_at'>) => Promise<void>;
  deleteContactSubmission: (id: string) => Promise<void>;
  loading: boolean;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminData, setAdminData] = useState<any>({
    heroTitle: { az: '', en: '' },
    heroSubtitle: { az: '', en: '' },
    heroDescription: { az: '', en: '' },
    product1Name: { az: '', en: '' },
    product1Description: { az: '', en: '' },
    product2Name: { az: '', en: '' },
    product2Description: { az: '', en: '' },
    contactPhone: '',
    contactEmail: '',
    contactAddress: { az: '', en: '' },
    companyDescription: { az: '', en: '' },
    companyMission: { az: '', en: '' },
    companyQuality: { az: '', en: '' },
    instructionsTitle: { az: '', en: '' },
    instructionsDescription: { az: '', en: '' },
    articlesTitle: { az: '', en: '' },
    articlesDescription: { az: '', en: '' },
    footerDescription: { az: '', en: '' },
    footerCopyright: { az: '', en: '' }
  });
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
      
      // Initialize database tables
      await initializeDatabase();
      
      // Load articles and contact submissions
      const [articlesData, contactData] = await Promise.all([
        loadArticles(),
        loadContactSubmissions()
      ]);
      
      setArticles(articlesData);
      setContactSubmissions(contactData);
    } catch (error) {
      console.error('Error loading data:', error);
      // Keep existing data if database fails
    } finally {
      setLoading(false);
    }
  };

  const updateAdminData = (newData: any) => {
    setAdminData(prev => ({ ...prev, ...newData }));
  };

  const addArticle = async (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newArticle = await saveArticle(article);
      setArticles(prev => [newArticle, ...prev]);
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
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  };

  const deleteArticleById = async (id: string) => {
    try {
      await deleteArticle(id);
      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  };

  const addContactSubmissionHandler = async (submission: Omit<ContactSubmission, 'id' | 'created_at'>) => {
    try {
      const newSubmission = await addContactSubmission(submission);
      setContactSubmissions(prev => [newSubmission, ...prev]);
    } catch (error) {
      console.error('Error adding contact submission:', error);
      throw error;
    }
  };

  const deleteContactSubmissionHandler = async (id: string) => {
    try {
      await deleteContactSubmission(id);
      setContactSubmissions(prev => prev.filter(submission => submission.id !== id));
    } catch (error) {
      console.error('Error deleting contact submission:', error);
      throw error;
    }
  };

  return (
    <AdminDataContext.Provider value={{
      adminData,
      articles,
      contactSubmissions,
      updateAdminData,
      addArticle,
      updateArticle: updateArticleById,
      deleteArticle: deleteArticleById,
      addContactSubmission: addContactSubmissionHandler,
      deleteContactSubmission: deleteContactSubmissionHandler,
      loading
    }}>
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