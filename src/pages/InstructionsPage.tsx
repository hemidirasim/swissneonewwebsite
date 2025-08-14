import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Instructions } from '@/components/Instructions';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const InstructionsPage = () => {
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Instructions />
      </main>
      <Footer />
    </div>
  );
};

export default InstructionsPage;
