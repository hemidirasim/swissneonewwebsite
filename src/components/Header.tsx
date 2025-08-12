import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (location.pathname === '/') {
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
      navigate(`/#${id}`);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
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
              onClick={() => navigate('/')}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigate('/')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => navigate('/products')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {t('nav.products')}
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => navigate('/instructions')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {t('nav.instructions')}
            </button>
            <button 
              onClick={() => navigate('/articles')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {t('nav.articles')}
            </button>
            <button 
              onClick={() => navigate('/contact')}
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
                onClick={() => handleMobileNavigation('/')}
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