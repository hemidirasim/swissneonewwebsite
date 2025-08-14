import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Products } from '@/components/Products';
import { Articles } from '@/components/Articles';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { lang } = useParams<{ lang: string }>();
  const { setLanguage, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set language from URL parameter
    if (lang && (lang === 'az' || lang === 'en')) {
      setLanguage(lang as 'az' | 'en');
    }
  }, [lang, setLanguage]);

  // Update URL when language changes in context
  useEffect(() => {
    if (lang !== language && (language === 'az' || language === 'en')) {
      const currentPath = location.pathname;
      const pathSegments = currentPath.split('/').filter(Boolean);
      
      // Remove existing language prefix if present
      if (pathSegments.length > 0 && (pathSegments[0] === 'az' || pathSegments[0] === 'en')) {
        pathSegments.shift();
      }
      
      // Add new language prefix
      const newPath = `/${language}${pathSegments.length > 0 ? '/' + pathSegments.join('/') : ''}`;
      
      // Preserve search params and hash
      const searchParams = location.search;
      const hash = location.hash;
      const fullPath = newPath + searchParams + hash;
      
      navigate(fullPath, { replace: true });
    }
  }, [language, lang, navigate, location]);

  useEffect(() => {
    // URL-də hash varsa, o bölməyə scroll et
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        const headerHeight = 80; // Header hündürlüyü
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Products />
        <Articles />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
