import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar,
  BookOpen,
  Heart,
  Baby,
  Shield,
  Brain,
  Leaf
} from 'lucide-react';

export const ArticleDetail = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // Səhifə yükləndikdə yuxarıdan başla
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  const articles = language === 'az' ? [
    {
      id: '1',
      title: 'Körpə Qidalandırmasında İlk 6 Ay: Əsas Prinsiplər',
      excerpt: 'Yeni doğulmuş körpələrin qidalandırması haqqında ətraflı bələdçi',
      content: `
        <h2>Körpə Qidalandırmasında İlk 6 Ay: Əsas Prinsiplər</h2>
        
        <p>Yeni doğulmuş körpələrin qidalandırması onların sağlam inkişafı üçün ən vacib amillərdən biridir. İlk 6 ay ərzində körpələrin qida ehtiyacları çox spesifikdir və ana südü ilə qidalandırma ən yaxşı seçimdir.</p>

        <h3>Ana Südünün Üstünlükləri</h3>
        <ul>
          <li><strong>İmmun Sistemi:</strong> Ana südü körpənin immun sistemini gücləndirir və xəstəliklərdən qoruyur</li>
          <li><strong>Həzm:</strong> Körpənin həzm sistemini dəstəkləyir və qaz problemlərini azaldır</li>
          <li><strong>İnkişaf:</strong> Beyin və fiziki inkişaf üçün lazım olan bütün qida elementlərini təmin edir</li>
          <li><strong>Əlaqə:</strong> Ana ilə körpə arasında emosional əlaqəni gücləndirir</li>
        </ul>

        <h3>Qidalandırma Cədvəli</h3>
        <p>İlk həftələrdə körpə 2-3 saatdan bir qidalandırılmalıdır. Bu vaxt hər körpə üçün fərqli ola bilər:</p>
        <ul>
          <li><strong>0-1 ay:</strong> Gündə 8-12 dəfə</li>
          <li><strong>1-3 ay:</strong> Gündə 6-8 dəfə</li>
          <li><strong>3-6 ay:</strong> Gündə 5-6 dəfə</li>
        </ul>

        <h3>Qidalandırma Əlamətləri</h3>
        <p>Körpənin aclıq əlamətlərini tanımaq vacibdir:</p>
        <ul>
          <li>Başını yanlara çevirmə</li>
          <li>Ağzını açma və dil çıxarma</li>
          <li>Əllərini ağzına aparma</li>
          <li>Ağlama (son əlamət)</li>
        </ul>

        <h3>Əlavə Qida Başlanması</h3>
        <p>6 aydan sonra əlavə qida təqdim edilə bilər, lakin bu proses tədricən olmalıdır:</p>
        <ul>
          <li>Bir dəfədə yalnız bir yeni qida təqdim edin</li>
          <li>3-5 gün gözləyin və reaksiyaları izləyin</li>
          <li>Əvvəlcə təmiz və sadə qidalarla başlayın</li>
          <li>Şirin kartof, yulaf, armud kimi qidaları seçin</li>
        </ul>

        <h3>Diqqət Ediləsi Məqamlar</h3>
        <ul>
          <li>Körpəni həmişə dik vəziyyətdə tutun</li>
          <li>Qidalandırma zamanı sakit mühit yaradın</li>
          <li>Körpənin doyma əlamətlərini izləyin</li>
          <li>Qidalandırma vaxtını qeyd edin</li>
        </ul>

        <p><strong>Qeyd:</strong> Hər körpə fərqlidir və öz tempində inkişaf edir. Əgər narahatlığınız varsa, həkimə müraciət edin.</p>
      `,
      category: 'Qidalandırma',
      readTime: '8 dəq',
      author: 'Dr. Aynur Məmmədova',
      date: '2024-01-15',
      image: '/mother-child-hero.jpg'
    },
    {
      id: '2',
      title: 'Körpə Süddü Formulları: Seçim və İstifadə Təlimatları',
      excerpt: 'Süni qidalandırma üçün formula seçimi və düzgün istifadə qaydaları',
      content: `
        <h2>Körpə Süddü Formulları: Seçim və İstifadə Təlimatları</h2>
        
        <p>Ana südü ilə qidalandırma mümkün olmadıqda və ya əlavə qida kimi istifadə edildikdə, yüksək keyfiyyətli körpə südü formulaları vacibdir.</p>

        <h3>Formula Növləri</h3>
        <ul>
          <li><strong>Başlanğıc Formulları (0-6 ay):</strong> Yeni doğulmuş körpələr üçün</li>
          <li><strong>İkinci Mərhələ Formulları (6-12 ay):</strong> Böyüyən körpələr üçün</li>
          <li><strong>Xüsusi Formullar:</strong> Həssas həzm, allergiya və s. üçün</li>
        </ul>

        <h3>Formula Seçimində Diqqət Ediləsi Məqamlar</h3>
        <ul>
          <li><strong>Yaş Uyğunluğu:</strong> Körpənin yaşına uyğun formula seçin</li>
          <li><strong>Tərkib:</strong> Təbii tərkibli və GMO-suz olmalıdır</li>
          <li><strong>DHA və ARA:</strong> Beyin inkişafı üçün vacibdir</li>
          <li><strong>Prebiotiklər:</strong> Həzm sistemini dəstəkləyir</li>
          <li><strong>Palma Yağı:</strong> Əsasən olmamalıdır</li>
        </ul>

        <h3>Formula Hazırlama Təlimatları</h3>
        <ol>
          <li><strong>Təmizlik:</strong> Əllərinizi və bütün avadanlıqları yuyun</li>
          <li><strong>Su:</strong> Təmiz, qaynadılmış və soyudulmuş su istifadə edin</li>
          <li><strong>Temperatur:</strong> Su 50°C-yə qədər soyudulmalıdır</li>
          <li><strong>Ölçü:</strong> Qablaşdırmada göstərilən ölçülərə ciddi əməl edin</li>
          <li><strong>Qarışdırma:</strong> Toz tam həll olana qədər yaxşıca çalxalayın</li>
          <li><strong>Soyudma:</strong> Körpəyə verməzdən əvvəl 37°C-yə qədər soyudun</li>
        </ol>

        <h3>Qida Dəyəri</h3>
        <p>Yüksək keyfiyyətli formula aşağıdakı qida elementlərini təmin etməlidir:</p>
        <ul>
          <li><strong>Zülallar:</strong> 1.4-1.5q/100ml</li>
          <li><strong>Yağlar:</strong> 3.6-3.8q/100ml</li>
          <li><strong>Karbohidratlar:</strong> 7.2-7.4q/100ml</li>
          <li><strong>DHA:</strong> 0.02q/100ml</li>
          <li><strong>ARA:</strong> 0.02q/100ml</li>
        </ul>

        <h3>Saxlama Qaydaları</h3>
        <ul>
          <li>Quru və sərin yerdə saxlayın (25°C-dən yüksək olmayan)</li>
          <li>Açıldıqdan sonra qapağı möhkəm bağlayın</li>
          <li>Açıldıqdan sonra 2 həftə ərzində istifadə edin</li>
          <li>Hazırlanmış qarışığı 30 dəqiqə ərzində istifadə edin</li>
        </ul>

        <h3>Diqqət Ediləsi Məqamlar</h3>
        <ul>
          <li>Artıq qalmış qarışığı təkrar istifadə etməyin</li>
          <li>Mikrodalğalı sobadan istifadə etməyin</li>
          <li>Körpənin reaksiyalarını izləyin</li>
          <li>Əgər problemlər yaranırsa, həkimə müraciət edin</li>
        </ul>

        <p><strong>Vacib:</strong> Formula seçimi və istifadəsi haqqında həkiminizlə məsləhətləşin.</p>
      `,
      category: 'Formula',
      readTime: '10 dəq',
      author: 'Dr. Elnur Hüseynov',
      date: '2024-01-20',
      image: '/mother-child-hero.jpg'
    },
    {
      id: '3',
      title: 'Körpələrdə Qaz Problemləri və Həll Yolları',
      excerpt: 'Körpələrdə qaz problemlərinin səbəbləri və təbii həll yolları',
      content: `
        <h2>Körpələrdə Qaz Problemləri və Həll Yolları</h2>
        
        <p>Qaz problemləri körpələrdə çox tez-tez rast gəlinən problemdir və valideynlər üçün böyük narahatlıq yaradır. Bu problemin səbəblərini və həll yollarını bilmək vacibdir.</p>

        <h3>Qaz Problemlərinin Səbəbləri</h3>
        <ul>
          <li><strong>Həzm Sisteminin İnkişafı:</strong> Körpələrin həzm sistemi hələ tam inkişaf etməyib</li>
          <li><strong>Hava Udma:</strong> Qidalandırma zamanı həddindən artıq hava udulması</li>
          <li><strong>Qida Seçimi:</strong> Ana qidalandırması zamanı ananın yediyi qidalar</li>
          <li><strong>Formula:</strong> Uyğun olmayan formula seçimi</li>
          <li><strong>Qidalandırma Tezliyi:</strong> Həddindən artıq və ya az qidalandırma</li>
        </ul>

        <h3>Qaz Problemlərinin Əlamətləri</h3>
        <ul>
          <li>Körpənin ayaqlarını qarnına çəkməsi</li>
          <li>Qarın bölgəsində gərginlik</li>
          <li>Həddindən artıq ağlama</li>
          <li>Yuxu problemləri</li>
          <li>Qidalandırma zamanı narahatlıq</li>
        </ul>

        <h3>Təbii Həll Yolları</h3>
        <h4>1. Qarın Masajı</h4>
        <p>Körpənin qarnını saat əqrəbi istiqamətində yumşaq şəkildə masaj edin:</p>
        <ul>
          <li>Körpəni düz səthə yatırın</li>
          <li>İstəyə görə yağ istifadə edin</li>
          <li>5-10 dəqiqə masaj edin</li>
          <li>Gündə 2-3 dəfə təkrarlayın</li>
        </ul>

        <h4>2. "Velosiped" Hərəkəti</h4>
        <p>Körpənin ayaqlarını velosiped sürərmiş kimi hərəkət etdirin:</p>
        <ul>
          <li>Körpəni düz yatırın</li>
          <li>Ayaqlarını yumşaq şəkildə bükün</li>
          <li>Velosiped sürərmiş kimi hərəkət etdirin</li>
          <li>5-10 dəqiqə davam edin</li>
        </ul>

        <h4>3. Düzgün Qidalandırma Texnikası</h4>
        <ul>
          <li>Körpəni 45 dərəcə bucaqla tutun</li>
          <li>Qidalandırma zamanı sakit mühit yaradın</li>
          <li>Körpəni tez-tez dayandırın</li>
          <li>Qidalandırma sonrası "geyik" edin</li>
        </ul>

        <h3>Qidalandırma Təlimatları</h3>
        <h4>Ana Qidalandırması</h4>
        <p>Ana qidalandırması zamanı ananın yeməməli olduğu qidalar:</p>
        <ul>
          <li>Kətan, noxud, lobya</li>
          <li>Kələm, brokoli, karnabahar</li>
          <li>Kəskin ədviyyatlar</li>
          <li>Kofeinli içkilər</li>
          <li>Alkoqol</li>
        </ul>

        <h4>Formula Qidalandırması</h4>
        <p>Formula seçimi zamanı diqqət ediləsi məqamlar:</p>
        <ul>
          <li>Palma yağı olmayan formula seçin</li>
          <li>Prebiotik tərkibli olmalıdır</li>
          <li>DHA və ARA ilə zənginləşdirilmiş olmalıdır</li>
          <li>Həssas həzm üçün xüsusi formula istifadə edin</li>
        </ul>

        <h3>Geyik Etmə Texnikası</h3>
        <p>Qidalandırma sonrası geyik etmək vacibdir:</p>
        <ul>
          <li>Körpəni çiyninizə qoyun</li>
          <li>Yumşaq şəkildə arxasına vurun</li>
          <li>15-20 dəqiqə davam edin</li>
          <li>Geyik səsi eşidilənə qədər davam edin</li>
        </ul>

        <h3>Nə Zaman Həkimə Müraciət Etməli</h3>
        <ul>
          <li>Qaz problemi 24 saatdan çox davam edirsə</li>
          <li>Körpə qida qəbul etmir</li>
          <li>Qusma və ya ishal var</li>
          <li>Hərarət yüksəkdir</li>
          <li>Körpə çox ağlayır və sakitləşmir</li>
        </ul>

        <h3>Qoruyucu Tədbirlər</h3>
        <ul>
          <li>Körpəni həddindən artıq qidalandırmayın</li>
          <li>Qidalandırma vaxtlarını qeyd edin</li>
          <li>Körpənin reaksiyalarını izləyin</li>
          <li>Stressli mühitdən qaçının</li>
          <li>Körpə ilə fiziki əlaqə saxlayın</li>
        </ul>

        <p><strong>Qeyd:</strong> Hər körpə fərqlidir və öz tempində inkişaf edir. Əgər narahatlığınız varsa, həkimə müraciət edin.</p>
      `,
      category: 'Sağlamlıq',
      readTime: '12 dəq',
      author: 'Dr. Leyla Əliyeva',
      date: '2024-01-25',
      image: '/mother-child-hero.jpg'
    }
  ] : [
    {
      id: '1',
      title: 'Baby Nutrition in the First 6 Months: Basic Principles',
      excerpt: 'A comprehensive guide to feeding newborns',
      content: `
        <h2>Baby Nutrition in the First 6 Months: Basic Principles</h2>
        
        <p>Feeding newborns is one of the most important factors for their healthy development. During the first 6 months, babies have very specific nutritional needs, and breastfeeding is the best choice.</p>

        <h3>Benefits of Breastfeeding</h3>
        <ul>
          <li><strong>Immune System:</strong> Breast milk strengthens the baby's immune system and protects against diseases</li>
          <li><strong>Digestion:</strong> Supports the baby's digestive system and reduces gas problems</li>
          <li><strong>Development:</strong> Provides all necessary nutrients for brain and physical development</li>
          <li><strong>Bonding:</strong> Strengthens the emotional bond between mother and baby</li>
        </ul>

        <h3>Feeding Schedule</h3>
        <p>In the first weeks, the baby should be fed every 2-3 hours. This time may vary for each baby:</p>
        <ul>
          <li><strong>0-1 month:</strong> 8-12 times per day</li>
          <li><strong>1-3 months:</strong> 6-8 times per day</li>
          <li><strong>3-6 months:</strong> 5-6 times per day</li>
        </ul>

        <h3>Feeding Signs</h3>
        <p>It's important to recognize the baby's hunger signs:</p>
        <ul>
          <li>Turning head from side to side</li>
          <li>Opening mouth and sticking out tongue</li>
          <li>Bringing hands to mouth</li>
          <li>Crying (last sign)</li>
        </ul>

        <h3>Starting Solid Foods</h3>
        <p>After 6 months, solid foods can be introduced, but this process should be gradual:</p>
        <ul>
          <li>Introduce only one new food at a time</li>
          <li>Wait 3-5 days and monitor reactions</li>
          <li>Start with clean and simple foods</li>
          <li>Choose foods like sweet potato, oatmeal, pear</li>
        </ul>

        <h3>Important Points</h3>
        <ul>
          <li>Always hold the baby in an upright position</li>
          <li>Create a calm environment during feeding</li>
          <li>Monitor the baby's satiety signs</li>
          <li>Record feeding times</li>
        </ul>

        <p><strong>Note:</strong> Every baby is different and develops at their own pace. If you have concerns, consult a doctor.</p>
      `,
      category: 'Nutrition',
      readTime: '8 min',
      author: 'Dr. Aynur Mammadova',
      date: '2024-01-15',
      image: '/mother-child-hero.jpg'
    },
    {
      id: '2',
      title: 'Baby Formula: Selection and Usage Instructions',
      excerpt: 'Formula selection and proper usage guidelines for artificial feeding',
      content: `
        <h2>Baby Formula: Selection and Usage Instructions</h2>
        
        <p>When breastfeeding is not possible or used as supplementary feeding, high-quality baby formulas are important.</p>

        <h3>Types of Formulas</h3>
        <ul>
          <li><strong>Starter Formulas (0-6 months):</strong> For newborns</li>
          <li><strong>Second Stage Formulas (6-12 months):</strong> For growing babies</li>
          <li><strong>Special Formulas:</strong> For sensitive digestion, allergies, etc.</li>
        </ul>

        <h3>Important Points in Formula Selection</h3>
        <ul>
          <li><strong>Age Appropriateness:</strong> Choose formula appropriate for baby's age</li>
          <li><strong>Composition:</strong> Should be natural and GMO-free</li>
          <li><strong>DHA and ARA:</strong> Important for brain development</li>
          <li><strong>Prebiotics:</strong> Supports digestive system</li>
          <li><strong>Palm Oil:</strong> Should generally be avoided</li>
        </ul>

        <h3>Formula Preparation Instructions</h3>
        <ol>
          <li><strong>Cleanliness:</strong> Wash your hands and all equipment</li>
          <li><strong>Water:</strong> Use clean, boiled and cooled water</li>
          <li><strong>Temperature:</strong> Water should be cooled to 50°C</li>
          <li><strong>Measurement:</strong> Strictly follow measurements shown on packaging</li>
          <li><strong>Mixing:</strong> Shake well until powder is completely dissolved</li>
          <li><strong>Cooling:</strong> Cool to 37°C before giving to baby</li>
        </ol>

        <h3>Nutritional Value</h3>
        <p>High-quality formula should provide the following nutrients:</p>
        <ul>
          <li><strong>Proteins:</strong> 1.4-1.5g/100ml</li>
          <li><strong>Fats:</strong> 3.6-3.8g/100ml</li>
          <li><strong>Carbohydrates:</strong> 7.2-7.4g/100ml</li>
          <li><strong>DHA:</strong> 0.02g/100ml</li>
          <li><strong>ARA:</strong> 0.02g/100ml</li>
        </ul>

        <h3>Storage Rules</h3>
        <ul>
          <li>Store in a dry and cool place (not above 25°C)</li>
          <li>Close lid tightly after opening</li>
          <li>Use within 2 weeks after opening</li>
          <li>Use prepared mixture within 30 minutes</li>
        </ul>

        <h3>Important Points</h3>
        <ul>
          <li>Do not reuse leftover mixture</li>
          <li>Do not use microwave oven</li>
          <li>Monitor baby's reactions</li>
          <li>Consult a doctor if problems arise</li>
        </ul>

        <p><strong>Important:</strong> Consult your doctor about formula selection and usage.</p>
      `,
      category: 'Formula',
      readTime: '10 min',
      author: 'Dr. Elnur Huseynov',
      date: '2024-01-20',
      image: '/mother-child-hero.jpg'
    },
    {
      id: '3',
      title: 'Gas Problems in Babies and Solutions',
      excerpt: 'Causes of gas problems in babies and natural solutions',
      content: `
        <h2>Gas Problems in Babies and Solutions</h2>
        
        <p>Gas problems are very common in babies and cause great concern for parents. It's important to know the causes and solutions of this problem.</p>

        <h3>Causes of Gas Problems</h3>
        <ul>
          <li><strong>Digestive System Development:</strong> Babies' digestive systems are not yet fully developed</li>
          <li><strong>Air Swallowing:</strong> Excessive air swallowing during feeding</li>
          <li><strong>Food Choice:</strong> Foods eaten by mother during breastfeeding</li>
          <li><strong>Formula:</strong> Inappropriate formula selection</li>
          <li><strong>Feeding Frequency:</strong> Excessive or insufficient feeding</li>
        </ul>

        <h3>Signs of Gas Problems</h3>
        <ul>
          <li>Baby pulling legs to stomach</li>
          <li>Tension in abdominal area</li>
          <li>Excessive crying</li>
          <li>Sleep problems</li>
          <li>Discomfort during feeding</li>
        </ul>

        <h3>Natural Solutions</h3>
        <h4>1. Abdominal Massage</h4>
        <p>Gently massage the baby's stomach in a clockwise direction:</p>
        <ul>
          <li>Lay baby on a flat surface</li>
          <li>Use oil if desired</li>
          <li>Massage for 5-10 minutes</li>
          <li>Repeat 2-3 times daily</li>
        </ul>

        <h4>2. "Bicycle" Movement</h4>
        <p>Move baby's legs like riding a bicycle:</p>
        <ul>
          <li>Lay baby flat</li>
          <li>Gently bend legs</li>
          <li>Move like riding a bicycle</li>
          <li>Continue for 5-10 minutes</li>
        </ul>

        <h4>3. Proper Feeding Technique</h4>
        <ul>
          <li>Hold baby at 45-degree angle</li>
          <li>Create calm environment during feeding</li>
          <li>Stop baby frequently</li>
          <li>Burp after feeding</li>
        </ul>

        <h3>Feeding Instructions</h3>
        <h4>Breastfeeding</h4>
        <p>Foods mother should avoid during breastfeeding:</p>
        <ul>
          <li>Beans, peas, lentils</li>
          <li>Cabbage, broccoli, cauliflower</li>
          <li>Spicy spices</li>
          <li>Caffeinated drinks</li>
          <li>Alcohol</li>
        </ul>

        <h4>Formula Feeding</h4>
        <p>Important points when selecting formula:</p>
        <ul>
          <li>Choose formula without palm oil</li>
          <li>Should contain prebiotics</li>
          <li>Should be enriched with DHA and ARA</li>
          <li>Use special formula for sensitive digestion</li>
        </ul>

        <h3>Burping Technique</h3>
        <p>Burping after feeding is important:</p>
        <ul>
          <li>Place baby on your shoulder</li>
          <li>Gently pat their back</li>
          <li>Continue for 15-20 minutes</li>
          <li>Continue until burping sound is heard</li>
        </ul>

        <h3>When to Consult a Doctor</h3>
        <ul>
          <li>If gas problem continues for more than 24 hours</li>
          <li>Baby refuses food</li>
          <li>Vomiting or diarrhea</li>
          <li>High fever</li>
          <li>Baby cries excessively and doesn't calm down</li>
        </ul>

        <h3>Preventive Measures</h3>
        <ul>
          <li>Don't overfeed the baby</li>
          <li>Record feeding times</li>
          <li>Monitor baby's reactions</li>
          <li>Avoid stressful environment</li>
          <li>Maintain physical contact with baby</li>
        </ul>

        <p><strong>Note:</strong> Every baby is different and develops at their own pace. If you have concerns, consult a doctor.</p>
      `,
      category: 'Health',
      readTime: '12 min',
      author: 'Dr. Leyla Aliyeva',
      date: '2024-01-25',
      image: '/mother-child-hero.jpg'
    }
  ];

  const article = articles.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {t('article.detail.articleNotFound')}
          </h1>
          <Button onClick={() => navigate('/articles')}>
            {t('article.detail.backToArticles')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/articles')}
        className="mb-6 flex items-center gap-2 relative z-10 mt-20"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('article.detail.backToArticles')}
      </Button>

      {/* Article Header */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="secondary" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {article.category}
            </Badge>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString(language === 'az' ? 'az-AZ' : 'en-US')}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Article Content */}
      <Card>
        <CardContent className="p-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </CardContent>
      </Card>

      {/* Related Articles */}
      <div className="mt-12">
                 <h2 className="text-2xl font-bold mb-6">
           {t('article.detail.relatedArticles')}
         </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles
            .filter(a => a.id !== articleId)
            .slice(0, 3)
            .map((relatedArticle) => (
              <Card key={relatedArticle.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {relatedArticle.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {relatedArticle.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {relatedArticle.excerpt}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform"
                    onClick={() => navigate(`/article/${relatedArticle.id}`)}
                  >
                    {language === 'az' ? 'Oxu' : 'Read'}
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};
