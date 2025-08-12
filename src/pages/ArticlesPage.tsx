import { LanguageProvider } from '@/contexts/LanguageContext';
import { AdminDataProvider } from '@/contexts/AdminDataContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticlesContent } from './ArticlesContent';
import { useEffect } from 'react';

const ArticlesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LanguageProvider>
      <AdminDataProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="flex-1">
            <ArticlesContent />
          </main>
          <Footer />
        </div>
      </AdminDataProvider>
    </LanguageProvider>
  );
};

export default ArticlesPage;

