import React, { createContext, useContext, useState } from 'react';

export type Language = 'az' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  az: {
    // Navigation
    'nav.home': 'Ana səhifə',
    'nav.products': 'Məhsullar',
    'nav.about': 'Haqqımızda',
    'nav.contact': 'Əlaqə',
    
    // Hero section
    'hero.title': 'İsveçrə keyfiyyətində',
    'hero.subtitle': 'Premium uşaq qidası',
    'hero.description': 'Swissneo — 100 ildən artıq İsveçrə təcrübəsi ilə hazırlanmış super premium uşaq qarışığı. Uşağınızın sağlam inkişafı və güclü immunitet üçün.',
    'hero.cta': 'Məhsulları kəşf edin',
    'hero.learn': 'Ətraflı öyrən',
    
    // Products
    'products.title': 'Məhsullar',
    'products.subtitle': 'Hər yaş qrupu üçün mükemmel qidalanma',
    'product1.name': 'Swissneo 1',
    'product1.stage': '0-6 ay',
    'product1.description': 'Doğulduğu gündən etibarən 6 ayadək olan körpələr üçün başlanğıc süd qarışığı',
    'product2.name': 'Swissneo 2', 
    'product2.stage': '6-12 ay',
    'product2.description': '6-12 aylıq körpələr üçün növbəti mərhələ süd qarışığı',
    'product.weight': '400q',
    'product.origin': 'İsveçrə istehsalı',
    'product.features': 'Xüsusiyyətlər',
    'product.feature1': 'Yüksək keyfiyyətli İsveçrə südü',
    'product.feature2': 'Vitaminlər və minerallarla zənginləşdirilmiş',
    'product.feature3': 'Prebiotiklər daxil',
    'product.feature4': 'Süni rənglər və qoruyucular yox',
    
    // About
    'about.title': 'İsveçrə keyfiyyəti, Azərbaycan ailələri üçün',
    'about.description': 'Swissneo — süd məhsulları sahəsində 100 ildən artıq təcrübəyə malik İsveçrənin super premium uşaq qidası markasıdır. Brendin missiyası uşaqların sağlam inkişafını dəstəkləyən, təbii komponentlər və innovativ formulalar əsasında optimal qidalanma təmin etməkdir.',
    'about.mission': 'Missiyamız',
    'about.mission.text': 'Keyfiyyətə önəm verən və uşaqlarına ən yaxşısını vermək istəyən Azərbaycan valideynlərinin artan tələbatını qarşılamaq.',
    'about.quality': 'Keyfiyyət təminatı',
    'about.quality.text': 'İsveçrənin ən yüksək keyfiyyət standartları ilə istehsal olunan məhsullarımız uşağınızın təhlükəsizliyi üçün bütün sertifikatları daşıyır.',
    
    // Contact
    'contact.title': 'Bizimlə əlaqə',
    'contact.description': 'Swissneo haqqında suallarınız varsa, bizimlə əlaqə saxlayın.',
    
    // Footer
    'footer.description': 'İsveçrə keyfiyyətində premium uşaq qidası'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero section
    'hero.title': 'Swiss Quality',
    'hero.subtitle': 'Premium Baby Formula',
    'hero.description': 'Swissneo — super premium baby formula crafted with over 100 years of Swiss expertise. For your baby\'s healthy development and strong immunity.',
    'hero.cta': 'Explore Products',
    'hero.learn': 'Learn More',
    
    // Products
    'products.title': 'Products',
    'products.subtitle': 'Perfect nutrition for every age',
    'product1.name': 'Swissneo 1',
    'product1.stage': '0-6 months',
    'product1.description': 'Starting infant milk formula for babies from birth to 6 months',
    'product2.name': 'Swissneo 2',
    'product2.stage': '6-12 months',
    'product2.description': 'Follow-on milk formula for babies from 6 to 12 months',
    'product.weight': '400g',
    'product.origin': 'Made in Switzerland',
    'product.features': 'Features',
    'product.feature1': 'High-quality Swiss milk',
    'product.feature2': 'Enriched with vitamins and minerals',
    'product.feature3': 'Contains prebiotics',
    'product.feature4': 'No artificial colors or preservatives',
    
    // About
    'about.title': 'Swiss Quality for Azerbaijani Families',
    'about.description': 'Swissneo is a super premium baby food brand from Switzerland with over 100 years of experience in dairy products. Our mission is to provide optimal nutrition based on natural ingredients and innovative formulas that support children\'s healthy development.',
    'about.mission': 'Our Mission',
    'about.mission.text': 'To meet the growing demand of knowledgeable Azerbaijani parents who value quality and want to give their children the best.',
    'about.quality': 'Quality Assurance',
    'about.quality.text': 'Our products manufactured with Switzerland\'s highest quality standards carry all certifications for your child\'s safety.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.description': 'If you have any questions about Swissneo, feel free to contact us.',
    
    // Footer
    'footer.description': 'Premium baby food with Swiss quality'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('az');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['az']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};