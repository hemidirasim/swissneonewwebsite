import { useLanguage } from '@/contexts/LanguageContext';
import { Heart } from 'lucide-react';

export const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Swissneo</h3>
                <p className="text-sm opacity-80">Super Premium Formula</p>
              </div>
            </div>
            <p className="text-sm opacity-80 max-w-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quicklinks')}</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  {t('nav.products')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
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
            © 2024 Swissneo. {t('footer.copyright')}
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