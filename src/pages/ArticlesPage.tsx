import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticlesContent } from './ArticlesContent';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const ArticlesPage = () => {
  const { lang } = useParams<{ lang: string }>();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    // Set language from URL parameter
    if (lang && (lang === 'az' || lang === 'en')) {
      setLanguage(lang as 'az' | 'en');
    }
  }, [lang, setLanguage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <ArticlesContent />
      </main>
      <Footer />
    </div>
  );
};

export default ArticlesPage;

