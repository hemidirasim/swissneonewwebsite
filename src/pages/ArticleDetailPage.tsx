import { LanguageProvider } from '@/contexts/LanguageContext';
import { AdminDataProvider } from '@/contexts/AdminDataContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticleDetailContent } from './ArticleDetailContent';
import { useEffect } from 'react';

const ArticleDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LanguageProvider>
      <AdminDataProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="flex-1">
            <ArticleDetailContent />
          </main>
          <Footer />
        </div>
      </AdminDataProvider>
    </LanguageProvider>
  );
};

export default ArticleDetailPage;
