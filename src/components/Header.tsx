import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get current language from URL or context
  const currentLang = lang || language;

  const scrollToSection = (id: string) => {
    if (location.pathname === `/${currentLang}` || location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        const headerHeight = 80; // Header hündürlüyü
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } else {
      navigate(`/${currentLang}#${id}`);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavigation = (path: string) => {
    navigate(`/${currentLang}${path}`);
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(`/${currentLang}${path}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/swissneo-logo.png" 
              alt="Swissneo Logo" 
              className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-300"
              onClick={() => navigate(`/${currentLang}`)}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavigation('')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => handleNavigation('/products')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {t('nav.products')}
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => handleNavigation('/instructions')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {t('nav.instructions')}
            </button>
            <button 
              onClick={() => handleNavigation('/articles')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {t('nav.articles')}
            </button>
            <button 
              onClick={() => handleNavigation('/contact')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {t('nav.contact')}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={handleMobileMenuToggle}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => handleMobileNavigation('')}
                className="text-left text-foreground hover:text-primary transition-colors duration-300 py-2"
              >
                {t('nav.home')}
              </button>
              <button 
                onClick={() => handleMobileNavigation('/products')}
                className="text-left text-foreground hover:text-primary transition-colors duration-300 py-2"
              >
                {t('nav.products')}
              </button>
              <button 
                onClick={() => handleMobileNavigation('/about')}
                className="text-left text-foreground hover:text-primary transition-colors duration-300 py-2"
              >
                {t('nav.about')}
              </button>
              <button 
                onClick={() => handleMobileNavigation('/instructions')}
                className="text-left text-foreground hover:text-primary transition-colors duration-300 py-2"
              >
                {t('nav.instructions')}
              </button>
              <button 
                onClick={() => handleMobileNavigation('/articles')}
                className="text-left text-foreground hover:text-primary transition-colors duration-300 py-2"
              >
                {t('nav.articles')}
              </button>
              <button 
                onClick={() => handleMobileNavigation('/contact')}
                className="text-left text-foreground hover:text-primary transition-colors duration-300 py-2"
              >
                {t('nav.contact')}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};