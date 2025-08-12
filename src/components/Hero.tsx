import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Shield, 
  Heart, 
  ArrowRight 
} from 'lucide-react';
import motherChildImage from '@/assets/mother-child-hero.jpg';

export const Hero = () => {
  const { t, language } = useLanguage();
  const { adminData } = useAdminData();
  const navigate = useNavigate();

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      const headerHeight = 80; // Header hündürlüyü
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      const headerHeight = 80; // Header hündürlüyü
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-subtle"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Super Premium Formula
            </div>

            {/* Main heading */}
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-primary">{adminData?.heroTitle?.[language] || 'İsveçrə keyfiyyətində'}</span>
              <br />
              {adminData?.heroSubtitle?.[language] || 'Premium uşaq qidası'}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              {adminData?.heroDescription?.[language] || 'Swissneo — 100 ildən artıq İsveçrə təcrübəsi ilə hazırlanmış super premium uşaq qarışığı. Uşağınızın sağlam inkişafı və güclü immunitet üçün.'}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 mb-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                100+ {t('hero.experience')}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="w-5 h-5 text-secondary" />
                {t('hero.natural')}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-5 h-5 text-accent" />
                {t('hero.premium')}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="premium" 
                size="lg"
                onClick={() => navigate('/products')}
                className="group"
              >
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/about')}
              >
                {t('hero.learn')}
              </Button>
            </div>
          </div>

          {/* Visual - Mother & Child */}
          <div className="relative">
            <div className="relative mx-auto max-w-lg">
              {/* Main mother-child image */}
              <div className="relative bg-card rounded-3xl shadow-premium overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-hero opacity-10 rounded-3xl"></div>
                <img 
                  src={motherChildImage} 
                  alt="Ana və övlad - Swissneo premium uşaq qidası"
                  className="w-full h-auto rounded-3xl"
                />
                
                {/* Overlay content */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="font-semibold text-foreground mb-1">Swissneo Formula</h3>
                  <p className="text-sm text-muted-foreground">{t('hero.imageTitle')}</p>
                </div>
              </div>

              {/* Floating quality badges */}
              <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-xl text-sm font-medium shadow-card animate-bounce">
                🇨🇭 {t('hero.swiss')}
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium shadow-card animate-bounce delay-500">
                ✨ {t('hero.premium.badge')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};