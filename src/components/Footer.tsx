import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Heart, Youtube, Instagram, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const { t, language } = useLanguage();
  const { adminData } = useAdminData();
  const navigate = useNavigate();

  // Social media links
  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://youtube.com/@swissneo.azerbaijan?si=cqyNw6tk1_yiL-Xs',
      icon: Youtube,
      color: 'hover:text-red-500'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/swissneo.az?igsh=MWUwbHpiemYwOThtbQ%3D%3D&utm_source=qr',
      icon: Instagram,
      color: 'hover:text-pink-500'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@swissneo.az?_t=ZS-8yqM9i2X294&_r=1',
      icon: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: 'hover:text-black'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61577014692181',
      icon: Facebook,
      color: 'hover:text-blue-600'
    }
  ];

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
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
              <li>👶 0-12 {t('footer.ageGroup')}</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">{t('social.title')}</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-background/10 flex items-center justify-center transition-all duration-300 ${social.color} hover:bg-background/20`}
                  title={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-sm opacity-80 mt-3">
              {t('social.follow.footer')}
            </p>
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