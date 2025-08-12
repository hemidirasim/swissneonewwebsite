import React, { createContext, useContext, useState, useEffect } from 'react';
import databaseService, { Article, ContactSubmission } from '@/services/databaseService';

interface AdminDataContextType {
  adminData: any;
  articles: Article[];
  contactSubmissions: ContactSubmission[];
  updateAdminData: (newData: any) => void;
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (id: number, updates: Partial<Article>) => void;
  deleteArticle: (id: number) => void;
  addContactSubmission: (submission: Omit<ContactSubmission, 'id' | 'createdAt'>) => void;
  deleteContactSubmission: (id: number) => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminData, setAdminData] = useState<any>({});
  const [articles, setArticles] = useState<Article[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = databaseService.getData();
    setAdminData(data);
    setArticles(data.articles || []);
    setContactSubmissions(data.contactSubmissions || []);
  };

  const updateAdminData = (newData: any) => {
    databaseService.updateData(newData);
    loadData();
  };

  const addArticle = (article: Omit<Article, 'id'>) => {
    databaseService.addArticle(article);
    loadData();
  };

  const updateArticle = (id: number, updates: Partial<Article>) => {
    databaseService.updateArticle(id, updates);
    loadData();
  };

  const deleteArticle = (id: number) => {
    databaseService.deleteArticle(id);
    loadData();
  };

  const addContactSubmission = (submission: Omit<ContactSubmission, 'id' | 'createdAt'>) => {
    databaseService.addContactSubmission(submission);
    loadData();
  };

  const deleteContactSubmission = (id: number) => {
    databaseService.deleteContactSubmission(id);
    loadData();
  };

  return (
    <AdminDataContext.Provider value={{
      adminData,
      articles,
      contactSubmissions,
      updateAdminData,
      addArticle,
      updateArticle,
      deleteArticle,
      addContactSubmission,
      deleteContactSubmission
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