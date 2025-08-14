import { useLocation, useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound = () => {
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const { t, setLanguage } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    // Set language from URL parameter
    if (lang && (lang === 'az' || lang === 'en')) {
      setLanguage(lang as 'az' | 'en');
    }
  }, [lang, setLanguage]);

  // If no language parameter, redirect to default language
  if (!lang) {
    return <Navigate to="/az" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">
          {lang === 'az' ? 'Oops! Səhifə tapılmadı' : 'Oops! Page not found'}
        </p>
        <a 
          href={`/${lang}`} 
          className="text-blue-500 hover:text-blue-700 underline"
        >
          {lang === 'az' ? 'Ana səhifəyə qayıt' : 'Return to Home'}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
