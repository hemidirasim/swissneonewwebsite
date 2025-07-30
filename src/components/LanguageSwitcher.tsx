import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex rounded-lg border border-border overflow-hidden">
        <Button
          variant={language === 'az' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('az')}
          className="rounded-none text-xs px-3 py-1"
        >
          AZ
        </Button>
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('en')}
          className="rounded-none text-xs px-3 py-1"
        >
          EN
        </Button>
      </div>
    </div>
  );
};