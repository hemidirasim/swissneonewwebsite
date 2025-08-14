import { SwissAdminContent } from './SwissAdminContent';
import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const SwissAdmin = () => {
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

  return <SwissAdminContent />;
};

export default SwissAdmin;