import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    
    // Update URL to reflect the new language
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    // Remove existing language prefix if present
    if (pathSegments.length > 0 && (pathSegments[0] === 'az' || pathSegments[0] === 'en')) {
      pathSegments.shift();
    }
    
    // Add new language prefix
    const newPath = `/${newLanguage}${pathSegments.length > 0 ? '/' + pathSegments.join('/') : ''}`;
    
    // Preserve search params and hash
    const searchParams = location.search;
    const hash = location.hash;
    const fullPath = newPath + searchParams + hash;
    
    // Use push instead of replace to allow back/forward navigation
    navigate(fullPath);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex rounded-lg border border-border overflow-hidden">
        <Button
          variant={language === 'az' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleLanguageChange('az')}
          className="rounded-none text-xs px-3 py-1"
        >
          AZ
        </Button>
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleLanguageChange('en')}
          className="rounded-none text-xs px-3 py-1"
        >
          EN
        </Button>
      </div>
    </div>
  );
};