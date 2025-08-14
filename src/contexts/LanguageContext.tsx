import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
    'nav.instructions': 'Təlimat',
    'nav.articles': 'Məqalələr',
    'article.detail.backToArticles': 'Məqalələrə qayıt',
    'article.detail.articleNotFound': 'Məqalə tapılmadı',
    'article.detail.relatedArticles': 'Əlaqəli Məqalələr',
    
    // Hero section
    'hero.title': 'İsveçrə keyfiyyətində',
    'hero.subtitle': 'Premium uşaq qidası',
    'hero.description': 'Swissneo — 100 ildən artıq İsveçrə təcrübəsi ilə hazırlanmış super premium uşaq qarışığı. Uşağınızın sağlam inkişafı və güclü immunitet üçün.',
    'hero.cta': 'Məhsulları kəşf edin',
    'hero.learn': 'Ətraflı öyrən',
    'hero.experience': 'illik təcrübə',
    'hero.natural': 'Təbii inqrediyentlər',
    'hero.premium': 'Premium keyfiyyət',
    'hero.swiss': 'İsveçrə istehsalı',
    'hero.premium.badge': 'Premium',
    'hero.imageTitle': 'Uşağınızın sağlam gələcəyi üçün',
    'hero.superPremium': 'Super Premium Formula',
    'hero.swissneoFormula': 'Swissneo Formula',
    'hero.motherChildAlt': 'Ana və övlad - Swissneo premium uşaq qidası',
    
    // Products
    'products.title': 'Məhsullar',
    'products.subtitle': 'Hər yaş qrupu üçün mükəmməl qidalanma',
    'product1.name': 'Swissneo Super Premium Formula 0-6 ay',
    'product1.stage': '0-6 ay',
    'product1.description': 'Doğulduğu gündən etibarən 6 ayadək olan körpələr üçün başlanğıc süd qarışığı',
    'product2.name': 'Swissneo Super Premium Formula 6-12 ay', 
    'product2.stage': '6-12 ay',
    'product2.description': '6-12 aylıq körpələr üçün növbəti mərhələ süd qarışığı',
    'product.weight': '400q',
    'product.origin': 'İsveçrə istehsalı',
    'product.features': 'Xüsusiyyətlər',
    'product.features.title': 'Məhsullarımızın Əsas Xüsusiyyətləri',
    'product.features.description': 'Her məhsulda olan keyfiyyət xüsusiyyətləri',
    'product.feature1': 'Yüksək keyfiyyətli İsveçrə südü',
    'product.feature2': 'Vitaminlər və minerallarla zənginləşdirilmiş',
    'product.feature3': 'Prebiotiklər daxil',
    'product.feature4': 'Süni rənglər və qoruyucular yox',
    'product.featureQuality':'Her məhsulda olan keyfiyyət xüsusiyyətləri',
    'product.detail.back': 'Geri qayıt',
    'product.detail.addToCart': 'Səbətə əlavə et',
    'product.detail.viewDetails': 'Ətraflı bax',
    'product.detail.weight': 'Çəki',
    'product.detail.origin': 'Mənşə',
    'product.detail.ageGroup': 'Yaş qrupu',
    'product.detail.preparation': 'Hazırlama',
    'product.detail.keyFeatures': 'Əsas xüsusiyyətlər',
    'product.detail.nutritionalInfo': 'Qidalanma məlumatları',
    'product.detail.energy': 'Enerji',
    'product.detail.protein': 'Protein',
    'product.detail.fat': 'Yağ',
    'product.detail.carbohydrates': 'Karbohidratlar',
    'product.detail.vitamins': 'Vitaminlər',
    'product.detail.minerals': 'Mineral maddələr',
    'product.detail.qualityAssurance': 'Keyfiyyət təminatı',
    'product.detail.naturalIngredients': 'Təbii inqrediyentlər',
    'product.detail.scientificResearch': 'Elmi tədqiqat',
    'product.detail.certification': 'Sertifikat',
    'product.detail.storageConditions': 'Saxlama şərtləri',
    'product.detail.chooseSwissneo': 'Uşağınızın sağlam gələcəyi üçün Swissneo seçin',
    'product.detail.orderNow': 'İndi sifariş et',
    'product.detail.contactUs': 'Əlaqə saxla',
    'product.detail.productNotFound': 'Məhsul tapılmadı',
    'product.detail.backToHome': 'Ana səhifəyə qayıt',
    
    // About
    'about.title': 'İsveçrə keyfiyyəti, Azərbaycan ailələri üçün',
    'about.description': 'Swissneo — süd məhsulları sahəsində 100 ildən artıq təcrübəyə malik İsveçrənin super premium uşaq qidası markasıdır. Brendin missiyası uşaqların sağlam inkişafını dəstəkləyən, təbii komponentlər və innovativ formulalar əsasında optimal qidalanma təmin etməkdir.',
    'about.mission': 'Missiyamız',
    'about.mission.text': 'Keyfiyyətə önəm verən və uşaqlarına ən yaxşısını vermək istəyən Azərbaycan valideynlərinin artan tələbatını qarşılamaq.',
    'about.quality': 'Keyfiyyət təminatı',
    'about.quality.text': 'İsveçrənin ən yüksək keyfiyyət standartları ilə istehsal olunan məhsullarımız uşağınızın təhlükəsizliyi üçün bütün sertifikatları daşıyır.',
    'about.stats.experience': 'İllik təcrübə',
    'about.stats.products': 'Məhsul çeşidi',
    'about.stats.quality': 'İsveçrə keyfiyyəti',
    'about.stats.natural': 'Təbii formula',
    'about.swiss.title': 'İsveçrə keyfiyyət standartları',
    'about.swiss.subtitle': 'Nə üçün İsveçrə süd məhsulları dünyada ən yaxşısıdır?',
    'about.swiss.research': 'Elmi tədqiqat',
    'about.swiss.research.text': '100 ildən artıq süd məhsulları sahəsində tədqiqat və inkişaf',
    'about.swiss.natural': 'Təbii mənbə',
    'about.swiss.natural.text': 'Alp dağlarının təmiz havasında bəslənən inəklərdən alınan süd',
    'about.swiss.cert': 'Sertifikat',
    'about.swiss.cert.text': 'Bütün beynəlxalq keyfiyyət və təhlükəsizlik standartlarına uyğun',
    
    // Contact
    'contact.title': 'Bizimlə əlaqə',
    'contact.description': 'Swissneo haqqında suallarınız varsa, bizimlə əlaqə saxlayın.',
    'contact.question': 'Suallarınız var?',
    'contact.phone': 'Telefon',
    'contact.email': 'Email',
    'contact.address': 'Ünvan',
    'contact.phone.hours': 'Bazar ertəsi - Cümə, 09:00-18:00',
    'contact.email.response': '24 saat ərzində cavab veririk',
    'contact.address.office': 'Əsas ofis',
    'contact.cta.title': 'Swissneo haqqında ətraflı məlumat almaq istəyirsiniz?',
    'contact.cta.description': 'Məhsullarımız, qidalanma məsləhətləri və ya Swissneo ailə proqramları haqqında məlumat üçün bizimlə əlaqə saxlayın.',
    'contact.call': 'Zəng et',
    'contact.inquiry': 'Sorğu göndər',
    
    // Footer
    'footer.description': 'İsveçrə keyfiyyətində premium uşaq qidası',
    'footer.quicklinks': 'Sürətli keçidlər',
    'footer.products.info': 'Məhsul məlumatları',
    'footer.copyright': 'Bütün hüquqlar qorunur.',
    'footer.made': 'İsveçrə keyfiyyəti ilə hazırlanıb',
    'footer.ageGroup': 'ay yaş qrupu',
    
    // Contact Form
    'form.send.inquiry': 'Sorğu göndərin',
    'form.fullname': 'Ad və Soyad',
    'form.fullname.placeholder': 'Adınızı daxil edin',
    'form.email.placeholder': 'Email ünvanınız',
    'form.phone': 'Telefon',
    'form.phone.placeholder': 'Telefon nömrəniz',
    'form.message': 'Mesaj',
    'form.message.placeholder': 'Mesajınızı yazın...',
    'form.cancel': 'Ləğv et',
    'form.send': 'Göndər',
    'form.success.title': 'Sorğu göndərildi!',
    'form.success.description': 'Tezliklə sizinlə əlaqə saxlayacağıq.',

    // Articles
    'articles.title': 'Məqalələr və Məsləhətlər',
    'articles.subtitle': 'Körpə qidalandırması haqqında faydalı məqalələr',
    'articles.loading.title': 'Məqalələr yüklənir...',
    'articles.loading.description': 'Zəhmət olmasa gözləyin.',
    'articles.notFound': 'Məqalələr yüklənir və ya mövcud deyil...',
    'articles.noArticles': 'Hələ heç bir məqalə yoxdur.',
    'articles.useful': 'Faydalı məqalələr',

    // Social Media
    'social.title': 'Sosial Şəbəkələr',
    'social.follow.title': 'Sosial Şəbəkələrdə Bizi İzləyin',
    'social.follow.description': 'Yeniliklərdən xəbərdar olmaq, məsləhətlər almaq və eksklüziv təklifləri görmək üçün sosial şəbəkələrimizə qoşulun!',
    'social.follow.footer': 'Bizi sosial şəbəkələrdə izləyin və yeniliklərdən xəbərdar olun!',
    'social.follow.button': 'İzlə',

    // Instructions
    'instructions.weight.monitoring': 'Çəki İzləmə'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.instructions': 'Instructions',
    'nav.articles': 'Articles',
    'article.detail.backToArticles': 'Back to Articles',
    'article.detail.articleNotFound': 'Article not found',
    'article.detail.relatedArticles': 'Related Articles',
    
    // Hero section
    'hero.title': 'Swiss Quality',
    'hero.subtitle': 'Premium Baby Formula',
    'hero.description': 'Swissneo — super premium baby formula crafted with over 100 years of Swiss expertise. For your baby\'s healthy development and strong immunity.',
    'hero.cta': 'Explore Products',
    'hero.learn': 'Learn More',
    'hero.experience': 'years of experience',
    'hero.natural': 'Natural ingredients',
    'hero.premium': 'Premium quality',
    'hero.swiss': 'Made in Switzerland',
    'hero.premium.badge': 'Premium',
    'hero.imageTitle': 'For your child\'s healthy future',
    'hero.superPremium': 'Super Premium Formula',
    'hero.swissneoFormula': 'Swissneo Formula',
    'hero.motherChildAlt': 'Mother and child - Swissneo premium baby food',
    
    // Products
    'products.title': 'Products',
    'products.subtitle': 'Perfect nutrition for every age',
    'product1.name': 'Swissneo Super Premium Formula 0-6 months',
    'product1.stage': '0-6 months',
    'product1.description': 'Starting infant milk formula for babies from birth to 6 months',
    'product2.name': 'Swissneo Super Premium Formula 6-12 months',
    'product2.stage': '6-12 months',
    'product2.description': 'Follow-on milk formula for babies from 6 to 12 months',
    'product.weight': '400g',
    'product.origin': 'Made in Switzerland',
    'product.features': 'Features',
    'product.features.title': 'Key Features of Our Products',
    'product.features.description': 'Quality features present in every product',
    'product.feature1': 'High-quality Swiss milk',
    'product.feature2': 'Enriched with vitamins and minerals',
    'product.feature3': 'Contains prebiotics',
    'product.feature4': 'No artificial colors or preservatives',
    'product.featureQuality':'Quality features present in every product',
    'product.detail.back': 'Go Back',
    'product.detail.addToCart': 'Add to Cart',
    'product.detail.viewDetails': 'View Details',
    'product.detail.weight': 'Weight',
    'product.detail.origin': 'Origin',
    'product.detail.ageGroup': 'Age Group',
    'product.detail.preparation': 'Preparation',
    'product.detail.keyFeatures': 'Key Features',
    'product.detail.nutritionalInfo': 'Nutritional Information',
    'product.detail.energy': 'Energy',
    'product.detail.protein': 'Protein',
    'product.detail.fat': 'Fat',
    'product.detail.carbohydrates': 'Carbohydrates',
    'product.detail.vitamins': 'Vitamins',
    'product.detail.minerals': 'Minerals',
    'product.detail.qualityAssurance': 'Quality Assurance',
    'product.detail.naturalIngredients': 'Natural Ingredients',
    'product.detail.scientificResearch': 'Scientific Research',
    'product.detail.certification': 'Certification',
    'product.detail.storageConditions': 'Storage Conditions',
    'product.detail.chooseSwissneo': 'Choose Swissneo for your baby\'s healthy future',
    'product.detail.orderNow': 'Order Now',
    'product.detail.contactUs': 'Contact Us',
    'product.detail.productNotFound': 'Product not found',
    'product.detail.backToHome': 'Back to Home',
    
    // About
    'about.title': 'Swiss Quality for Azerbaijani Families',
    'about.description': 'Swissneo is a super premium baby food brand from Switzerland with over 100 years of experience in dairy products. Our mission is to provide optimal nutrition based on natural ingredients and innovative formulas that support children\'s healthy development.',
    'about.mission': 'Our Mission',
    'about.mission.text': 'To meet the growing demand of knowledgeable Azerbaijani parents who value quality and want to give their children the best.',
    'about.quality': 'Quality Assurance',
    'about.quality.text': 'Our products manufactured with Switzerland\'s highest quality standards carry all certifications for your child\'s safety.',
    'about.stats.experience': 'Years of experience',
    'about.stats.products': 'Product range',
    'about.stats.quality': 'Swiss quality',
    'about.stats.natural': 'Natural formula',
    'about.swiss.title': 'Swiss Quality Standards',
    'about.swiss.subtitle': 'Why are Swiss dairy products the best in the world?',
    'about.swiss.research': 'Scientific research',
    'about.swiss.research.text': 'Over 100 years of research and development in dairy products',
    'about.swiss.natural': 'Natural source',
    'about.swiss.natural.text': 'Milk from cows grazing in the clean air of the Alps',
    'about.swiss.cert': 'Certification',
    'about.swiss.cert.text': 'Complies with all international quality and safety standards',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.description': 'If you have any questions about Swissneo, feel free to contact us.',
    'contact.question': 'Have questions?',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.phone.hours': 'Monday - Friday, 09:00-18:00',
    'contact.email.response': 'We respond within 24 hours',
    'contact.address.office': 'Main office',
    'contact.cta.title': 'Want to learn more about Swissneo?',
    'contact.cta.description': 'Contact us for information about our products, nutrition advice, or Swissneo family programs.',
    'contact.call': 'Call us',
    'contact.inquiry': 'Send Inquiry',
    
    // Footer
    'footer.description': 'Premium baby food with Swiss quality',
    'footer.quicklinks': 'Quick Links',
    'footer.products.info': 'Product Information',
    'footer.copyright': 'All rights reserved.',
    'footer.made': 'Made with Swiss quality',
    'footer.ageGroup': 'months age group',
    
    // Contact Form
    'form.send.inquiry': 'Send Inquiry',
    'form.fullname': 'Full Name',
    'form.fullname.placeholder': 'Enter your name',
    'form.email.placeholder': 'Your email address',
    'form.phone': 'Phone',
    'form.phone.placeholder': 'Your phone number',
    'form.message': 'Message',
    'form.message.placeholder': 'Write your message...',
    'form.cancel': 'Cancel',
    'form.send': 'Send',
    'form.success.title': 'Inquiry sent!',
    'form.success.description': 'We will contact you soon.',

    // Articles
    'articles.title': 'Articles and Advice',
    'articles.subtitle': 'Useful articles about baby nutrition',
    'articles.loading.title': 'Loading articles...',
    'articles.loading.description': 'Please wait.',
    'articles.notFound': 'Articles are loading or not available...',
    'articles.noArticles': 'No articles available yet.',
    'articles.useful': 'Useful articles',

    // Social Media
    'social.title': 'Social Media',
    'social.follow.title': 'Follow Us on Social Media',
    'social.follow.description': 'Join our social networks to stay updated with news, get advice, and see exclusive offers!',
    'social.follow.footer': 'Follow us on social media and stay updated with news!',
    'social.follow.button': 'Follow',

    // Instructions
    'instructions.weight.monitoring': 'Weight Monitoring'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguageState] = useState<Language>('az');

  // Extract language from URL path
  const getLanguageFromPath = (pathname: string): Language => {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0 && (pathSegments[0] === 'az' || pathSegments[0] === 'en')) {
      return pathSegments[0] as Language;
    }
    return 'az'; // default language
  };

  // Update URL when language changes
  const updateURL = (newLanguage: Language) => {
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
    
    navigate(fullPath, { replace: true });
  };

  // Set language and update URL
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    updateURL(lang);
  };

  // Initialize language from URL on mount and when location changes
  useEffect(() => {
    const urlLanguage = getLanguageFromPath(location.pathname);
    if (urlLanguage !== language) {
      setLanguageState(urlLanguage);
    }
  }, [location.pathname]);

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