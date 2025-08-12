import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const { t, language } = useLanguage();
  const { adminData } = useAdminData();
  const navigate = useNavigate();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/swissneo-logo.png" 
                alt="Swissneo Logo" 
                className="h-10 w-auto"
              />
              <div className="hidden sm:block">
                <p className="text-sm opacity-80">Super Premium Formula</p>
              </div>
            </div>
            <p className="text-sm opacity-80 max-w-sm">
              {adminData.footerDescription?.[language] || 'Swissneo — İsveçrə keyfiyyətində premium uşaq qidası'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quicklinks')}</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate('/')}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/products')}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  {t('nav.products')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/about')}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/instructions')}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  {t('nav.instructions')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/articles')}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  {t('nav.articles')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact')}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.products.info')}</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>🇨🇭 {t('hero.swiss')}</li>
              <li>🌱 100% {t('hero.natural')}</li>
              <li>✨ Super {t('hero.premium')}</li>
              <li>👶 0-12 {language === 'az' ? 'ay yaş qrupu' : 'months age group'}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80">
            {adminData.footerCopyright?.[language] || '© 2024 Swissneo. Bütün hüquqlar qorunur.'}
          </p>
          <div className="flex items-center gap-2 text-sm opacity-80 mt-4 md:mt-0">
            <span>{t('footer.made')}</span>
            <Heart className="w-4 h-4 text-red-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};