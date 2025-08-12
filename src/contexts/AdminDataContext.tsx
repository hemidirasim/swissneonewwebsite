import React, { createContext, useContext, useState, useEffect } from 'react';
import databaseService, { Article, ContactSubmission } from '@/services/databaseService';

interface SiteData {
  hero: {
    title: { az: string; en: string };
    subtitle: { az: string; en: string };
    description: { az: string; en: string };
  };
  product1: {
    name: { az: string; en: string };
    description: { az: string; en: string };
  };
  product2: {
    name: { az: string; en: string };
    description: { az: string; en: string };
  };
  contact: {
    phone: string;
    email: string;
    address: { az: string; en: string };
  };
  company: {
    description: { az: string; en: string };
    mission: { az: string; en: string };
    quality: { az: string; en: string };
  };
  instructions: {
    title: { az: string; en: string };
    description: { az: string; en: string };
  };
  articles: {
    title: { az: string; en: string };
    description: { az: string; en: string };
  };
  footer: {
    description: { az: string; en: string };
    copyright: { az: string; en: string };
  };
}

interface AdminDataContextType {
  siteData: SiteData;
  articles: Article[];
  contactSubmissions: ContactSubmission[];
  isLoading: boolean;
  error: string | null;
  updateSiteContent: (section: string, field: string, language: string, content: string) => Promise<void>;
  refreshData: () => Promise<void>;
  addContactSubmission: (submission: Omit<ContactSubmission, 'id' | 'created_at'>) => Promise<void>;
  deleteContactSubmission: (id: number) => Promise<void>;
  addArticle: (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateArticle: (id: number, updates: Partial<Article>) => Promise<void>;
  deleteArticle: (id: number) => Promise<void>;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>({
    hero: { title: { az: '', en: '' }, subtitle: { az: '', en: '' }, description: { az: '', en: '' } },
    product1: { name: { az: '', en: '' }, description: { az: '', en: '' } },
    product2: { name: { az: '', en: '' }, description: { az: '', en: '' } },
    contact: { phone: '', email: '', address: { az: '', en: '' } },
    company: { description: { az: '', en: '' }, mission: { az: '', en: '' }, quality: { az: '', en: '' } },
    instructions: { title: { az: '', en: '' }, description: { az: '', en: '' } },
    articles: { title: { az: '', en: '' }, description: { az: '', en: '' } },
    footer: { description: { az: '', en: '' }, copyright: { az: '', en: '' } }
  });
  const [articles, setArticles] = useState<Article[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [contentData, articlesData, submissionsData] = await Promise.all([
        databaseService.getSiteContent(),
        databaseService.getArticles(),
        databaseService.getContactSubmissions()
      ]);

      // Transform content data to SiteData structure
      const transformedSiteData: SiteData = {
        hero: {
          title: { az: contentData.hero?.title?.az || '', en: contentData.hero?.title?.en || '' },
          subtitle: { az: contentData.hero?.subtitle?.az || '', en: contentData.hero?.subtitle?.en || '' },
          description: { az: contentData.hero?.description?.az || '', en: contentData.hero?.description?.en || '' }
        },
        product1: {
          name: { az: contentData.product1?.name?.az || '', en: contentData.product1?.name?.en || '' },
          description: { az: contentData.product1?.description?.az || '', en: contentData.product1?.description?.en || '' }
        },
        product2: {
          name: { az: contentData.product2?.name?.az || '', en: contentData.product2?.name?.en || '' },
          description: { az: contentData.product2?.description?.az || '', en: contentData.product2?.description?.en || '' }
        },
        contact: {
          phone: contentData.contact?.phone?.az || '',
          email: contentData.contact?.email?.az || '',
          address: { az: contentData.contact?.address?.az || '', en: contentData.contact?.address?.en || '' }
        },
        company: {
          description: { az: contentData.company?.description?.az || '', en: contentData.company?.description?.en || '' },
          mission: { az: contentData.company?.mission?.az || '', en: contentData.company?.mission?.en || '' },
          quality: { az: contentData.company?.quality?.az || '', en: contentData.company?.quality?.en || '' }
        },
        instructions: {
          title: { az: contentData.instructions?.title?.az || '', en: contentData.instructions?.title?.en || '' },
          description: { az: contentData.instructions?.description?.az || '', en: contentData.instructions?.description?.en || '' }
        },
        articles: {
          title: { az: contentData.articles?.title?.az || '', en: contentData.articles?.title?.en || '' },
          description: { az: contentData.articles?.description?.az || '', en: contentData.articles?.description?.en || '' }
        },
        footer: {
          description: { az: contentData.footer?.description?.az || '', en: contentData.footer?.description?.en || '' },
          copyright: { az: contentData.footer?.copyright?.az || '', en: contentData.footer?.copyright?.en || '' }
        }
      };

      setSiteData(transformedSiteData);
      setArticles(articlesData);
      setContactSubmissions(submissionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSiteContent = async (section: string, field: string, language: string, content: string) => {
    try {
      await databaseService.updateSiteContent(section, field, language, content);
      await loadData(); // Reload all data to get updated content
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating content');
      throw err;
    }
  };

  const refreshData = async () => {
    await loadData();
  };

  const addContactSubmission = async (submission: Omit<ContactSubmission, 'id' | 'created_at'>) => {
    try {
      const newSubmission = await databaseService.createContactSubmission(submission);
      setContactSubmissions(prev => [newSubmission, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding contact submission');
      throw err;
    }
  };

  const deleteContactSubmission = async (id: number) => {
    try {
      const success = await databaseService.deleteContactSubmission(id);
      if (success) {
        setContactSubmissions(prev => prev.filter(sub => sub.id !== id));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting contact submission');
      throw err;
    }
  };

  const addArticle = async (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newArticle = await databaseService.createArticle(article);
      setArticles(prev => [newArticle, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding article');
      throw err;
    }
  };

  const updateArticle = async (id: number, updates: Partial<Article>) => {
    try {
      const updatedArticle = await databaseService.updateArticle(id, updates);
      if (updatedArticle) {
        setArticles(prev => prev.map(article => article.id === id ? updatedArticle : article));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating article');
      throw err;
    }
  };

  const deleteArticle = async (id: number) => {
    try {
      const success = await databaseService.deleteArticle(id);
      if (success) {
        setArticles(prev => prev.filter(article => article.id !== id));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting article');
      throw err;
    }
  };

  return (
    <AdminDataContext.Provider value={{
      siteData,
      articles,
      contactSubmissions,
      isLoading,
      error,
      updateSiteContent,
      refreshData,
      addContactSubmission,
      deleteContactSubmission,
      addArticle,
      updateArticle,
      deleteArticle
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