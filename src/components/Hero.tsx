import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Award, Heart } from 'lucide-react';

export const Hero = () => {
  const { t } = useLanguage();

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
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
              <span className="text-primary">{t('hero.title')}</span>
              <br />
              {t('hero.subtitle')}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              {t('hero.description')}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 mb-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                100+ İsveçrə təcrübəsi
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="w-5 h-5 text-secondary" />
                Təbii komponentlər
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-5 h-5 text-accent" />
                Premium keyfiyyət
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="premium" 
                size="lg"
                onClick={scrollToProducts}
                className="group"
              >
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={scrollToAbout}
              >
                {t('hero.learn')}
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative mx-auto max-w-md">
              {/* Main product showcase */}
              <div className="relative bg-card rounded-3xl shadow-premium p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-hero opacity-5 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="w-48 h-64 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                    <div className="text-6xl font-bold text-primary/30">S</div>
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="font-semibold text-foreground mb-2">Swissneo Formula</h3>
                    <p className="text-sm text-muted-foreground">İsveçrə keyfiyyəti</p>
                  </div>
                </div>
              </div>

              {/* Floating quality badges */}
              <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-3 py-2 rounded-xl text-sm font-medium shadow-card">
                🇨🇭 Swiss Made
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-3 py-2 rounded-xl text-sm font-medium shadow-card">
                ✨ Premium
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};