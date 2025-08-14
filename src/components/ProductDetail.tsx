import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  CheckCircle, 
  Baby, 
  Clock, 
  Weight, 
  MapPin, 
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Info,
  Leaf,
  Shield,
  Zap
} from 'lucide-react';

export const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { adminData } = useAdminData();

  // Səhifə yükləndikdə yuxarıdan başla
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Convert string productId to number for comparison
  const productIdNum = productId ? parseInt(productId, 10) : null;

  const products = [
    {
      id: 1,
      image: '/lovable-uploads/b0d62079-dc9d-4d61-a539-2cde4f82d6c3.png',
      name: adminData?.product1Name?.[language] || 'Swissneo 1',
      stage: t('product1.stage'),
      description: adminData?.product1Description?.[language] || t('product1.description'),
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      detailedDescription: language === 'az' 
        ? 'Yeni doğulmuş körpələrdən 6 aylığa qədər olan körpələrin qidalanması üçün toz körpə südü qarışığı. İsveçrədə istehsal olunub. Körpələrin inkişafının hər mərhələsində ehtiyaclarına uyğun hazırlanıb. Süni dadvericilər, konservantlar və boyalar yoxdur. Sağlam böyümə üçün lazım olan vitaminlər, minerallar və faydalı yağ turşuları (DHA və ARA daxil olmaqla) ilə zəngindir.'
        : 'Powdered infant milk formula for feeding babies from newborn to 6 months. Made in Switzerland. Formulated to meet the needs of babies at every stage of development. No artificial flavors, preservatives or colors. Rich in vitamins, minerals and beneficial fatty acids (including DHA and ARA) necessary for healthy growth.',
      weight: '400g',
      origin: 'İsveçrə',
      age: '0-6 ay',
      preparation: language === 'az' 
        ? 'Qablaşdırmada göstərilən cədvələ uyğun olaraq hazırlanır'
        : 'Prepared according to the feeding table shown on packaging',
      storage: language === 'az'
        ? 'Quru, sərin yerdə, 25°C-dən yüksək olmayan temperaturda saxlayın. Açıldıqdan sonra 2 həftə ərzində istifadə edin.'
        : 'Store in a dry, cool place at temperature not exceeding 25°C. Use within 2 weeks after opening.',
      features: language === 'az' ? [
        'Palma yağsız - daha sağlam yağ tərkibi',
        'Prebiotik, DHA və ARA tərkibli',
        'Avropa İstehsalı - yüksək keyfiyyət standartları',
        'Beynəlxalq standartlara uyğun istehsal olunur'
      ] : [
        'Palm oil free - healthier fat composition',
        'Contains prebiotics, DHA and ARA',
        'European production - high quality standards',
        'Manufactured according to international standards'
      ],
      nutritionalInfo: language === 'az' ? {
        energy: '68 kcal/100ml',
        protein: '1.4g/100ml',
        fat: '3.6g/100ml',
        carbohydrates: '7.4g/100ml',
        vitamins: ['A', 'D', 'E', 'K', 'C', 'B1', 'B2', 'B6', 'B12'],
        minerals: ['Kalsium', 'Fosfor', 'Maqnezium', 'Kalium', 'Natrium', 'Xlorid', 'Sink', 'Dəmir']
      } : {
        energy: '68 kcal/100ml',
        protein: '1.4g/100ml',
        fat: '3.6g/100ml',
        carbohydrates: '7.4g/100ml',
        vitamins: ['A', 'D', 'E', 'K', 'C', 'B1', 'B2', 'B6', 'B12'],
        minerals: ['Calcium', 'Phosphorus', 'Magnesium', 'Potassium', 'Sodium', 'Chloride', 'Zinc', 'Iron']
      }
    },
    {
      id: 2,
      image: '/lovable-uploads/1b436833-1495-456b-bdfb-0184d54c29b7.png',
      name: adminData?.product2Name?.[language] || 'Swissneo 2',
      stage: t('product2.stage'),
      description: adminData?.product2Description?.[language] || t('product2.description'),
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      detailedDescription: language === 'az'
        ? '6 aydan 12 aylığa qədər körpələrin qidalanması üçün toz süd qarışığı. İsveçrədə istehsal olunub. Körpələrin ikinci yarımilində qida ehtiyaclarını ödəmək üçün balanslaşdırılmış formula. Süni dadvericilər, konservantlar və boyalar yoxdur. Dəmir, kalsium, vitaminlər, DHA və ARA ilə zənginləşdirilib.'
        : 'Powdered milk formula for feeding babies from 6 to 12 months. Made in Switzerland. Balanced formula to meet the nutritional needs of babies in their second half year. No artificial flavors, preservatives or colors. Enriched with iron, calcium, vitamins, DHA and ARA.',
      weight: '400g',
      origin: 'İsveçrə',
      age: '6-12 ay',
      preparation: language === 'az'
        ? 'Qablaşdırmada göstərilən cədvələ uyğun olaraq hazırlanır'
        : 'Prepared according to the feeding table shown on packaging',
      storage: language === 'az'
        ? 'Quru, sərin yerdə, 25°C-dən yüksək olmayan temperaturda saxlayın. Açıldıqdan sonra 2 həftə ərzində istifadə edin.'
        : 'Store in a dry, cool place at temperature not exceeding 25°C. Use within 2 weeks after opening.',
      features: language === 'az' ? [
        'Palma yağsız - daha sağlam yağ tərkibi',
        'Prebiotik, DHA və ARA tərkibli',
        'Avropa İstehsalı - yüksək keyfiyyət standartları',
        'Beynəlxalq standartlara uyğun istehsal olunur'
      ] : [
        'Palm oil free - healthier fat composition',
        'Contains prebiotics, DHA and ARA',
        'European production - high quality standards',
        'Manufactured according to international standards'
      ],
      nutritionalInfo: language === 'az' ? {
        energy: '70 kcal/100ml',
        protein: '1.5g/100ml',
        fat: '3.8g/100ml',
        carbohydrates: '7.6g/100ml',
        vitamins: ['A', 'D', 'E', 'K', 'C', 'B1', 'B2', 'B6', 'B12'],
        minerals: ['Kalsium', 'Fosfor', 'Maqnezium', 'Kalium', 'Natrium', 'Xlorid', 'Sink', 'Dəmir']
      } : {
        energy: '70 kcal/100ml',
        protein: '1.5g/100ml',
        fat: '3.8g/100ml',
        carbohydrates: '7.6g/100ml',
        vitamins: ['A', 'D', 'E', 'K', 'C', 'B1', 'B2', 'B6', 'B12'],
        minerals: ['Calcium', 'Phosphorus', 'Magnesium', 'Potassium', 'Sodium', 'Chloride', 'Zinc', 'Iron']
      }
    }
  ];

  // Find the product by ID
  const product = products.find(p => p.id === productIdNum);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {t('product.detail.productNotFound')}
        </h2>
        <Button onClick={() => navigate('/')}>
          {t('product.detail.backToHome')}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 relative z-10 mt-20"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('product.detail.back')}
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            <div className={`${product.bgColor} rounded-3xl p-12 relative overflow-hidden`}>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto max-w-md mx-auto relative z-10"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-10`}></div>
            </div>
            

          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.stage}
              </Badge>
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.detailedDescription}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg">
                <Weight className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t('product.detail.weight')}
                  </p>
                  <p className="font-semibold">{product.weight}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t('product.detail.origin')}
                  </p>
                  <p className="font-semibold">{product.origin}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg">
                <Baby className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t('product.detail.ageGroup')}
                  </p>
                  <p className="font-semibold">{product.age}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t('product.detail.preparation')}
                  </p>
                  <p className="font-semibold text-xs">{product.preparation}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  {t('product.detail.keyFeatures')}
                </h3>
                <div className="grid gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advantages */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              {language === 'az' ? 'Üstünlükləri' : 'Advantages'}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium">
                  {language === 'az' ? 'Palma yağsız' : 'Palm oil free'}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium">
                  {language === 'az' ? 'Prebiotik, DHA və ARA tərkibli' : 'Contains prebiotics, DHA and ARA'}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <span className="text-sm font-medium">
                  {language === 'az' ? 'Avropa İstehsalı' : 'European production'}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <span className="text-sm font-medium">
                  {language === 'az' ? 'Beynəlxalq standartlara uyğun' : 'Complies with international standards'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-12" />

        {/* Preparation Instructions */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {language === 'az' ? 'Hazırlanma qaydası' : 'Preparation Instructions'}
            </h3>
            
            <div className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">1</div>
                  <span className="text-sm">{language === 'az' ? 'Qarışığı hazırlamazdan əvvəl əllərinizi yuyun.' : 'Wash your hands before preparing the mixture.'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">2</div>
                  <span className="text-sm">{language === 'az' ? 'Şüşə qabı və əmziyi sterilizasiya edin.' : 'Sterilize the bottle container and nipple.'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">3</div>
                  <span className="text-sm">{language === 'az' ? 'Suyu qaynadın və 50°C-yə qədər soyudun.' : 'Boil water and cool it to 50°C.'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">4</div>
                  <span className="text-sm">{language === 'az' ? 'Qablaşdırmada göstərilən cədvələ uyğun olaraq lazımi miqdarda suyu şüşəyə tökün.' : 'Pour the required amount of water into the bottle according to the table shown on the packaging.'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">5</div>
                  <span className="text-sm">{language === 'az' ? 'Müvafiq sayda ölçü qaşığı tozu əlavə edin.' : 'Add the appropriate number of measuring spoons of powder.'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">6</div>
                  <span className="text-sm">{language === 'az' ? 'Şüşəni bağlayın və toz tam həll olana qədər yaxşıca çalxalayın.' : 'Close the bottle and shake well until the powder is completely dissolved.'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">7</div>
                  <span className="text-sm">{language === 'az' ? 'Qarışığı 37°C-yə qədər soyudun və biləyinizin iç tərəfi ilə temperaturu yoxlayın.' : 'Cool the mixture to 37°C and check the temperature with the inside of your wrist.'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">8</div>
                  <span className="text-sm">{language === 'az' ? 'Hazırlanmış qarışığı dərhal və ya 30 dəqiqə ərzində istifadə edin.' : 'Use the prepared mixture immediately or within 30 minutes.'}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm font-semibold text-amber-800 mb-2">
                  {language === 'az' ? 'Vacib:' : 'Important:'}
                </p>
                <p className="text-sm text-amber-700">
                  {language === 'az' 
                    ? 'Təlimata və dozaya ciddi əməl edin. Artıq qalmış qarışığı təkrar istifadə etməyin.'
                    : 'Strictly follow the instructions and dosage. Do not reuse leftover mixture.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Nutritional Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                {t('product.detail.nutritionalInfo')}
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {t('product.detail.energy')}
                    </p>
                    <p className="font-semibold">{product.nutritionalInfo.energy}</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {t('product.detail.protein')}
                    </p>
                    <p className="font-semibold">{product.nutritionalInfo.protein}</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {t('product.detail.fat')}
                    </p>
                    <p className="font-semibold">{product.nutritionalInfo.fat}</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {t('product.detail.carbohydrates')}
                    </p>
                    <p className="font-semibold">{product.nutritionalInfo.carbohydrates}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('product.detail.vitamins')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.nutritionalInfo.vitamins.map((vitamin, index) => (
                      <Badge key={index} variant="outline">
                        {vitamin}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">
                    {t('product.detail.minerals')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.nutritionalInfo.minerals.map((mineral, index) => (
                      <Badge key={index} variant="outline">
                        {mineral}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Assurance */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                {t('product.detail.qualityAssurance')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">
                      {t('product.detail.naturalIngredients')}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {language === 'az' 
                        ? 'Alp dağlarının təmiz havasında bəslənən inəklərdən alınan yüksək keyfiyyətli süd'
                        : 'High-quality milk from cows grazing in the clean air of the Alps'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">
                      {t('product.detail.scientificResearch')}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {language === 'az'
                        ? '100 ildən artıq süd məhsulları sahəsində tədqiqat və inkişaf'
                        : 'Over 100 years of research and development in dairy products'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">
                      {t('product.detail.certification')}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {language === 'az'
                        ? 'Bütün beynəlxalq keyfiyyət və təhlükəsizlik standartlarına uyğun'
                        : 'Complies with all international quality and safety standards'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h4 className="font-semibold mb-2">
                  {t('product.detail.storageConditions')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {product.storage}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Special Features */}
        <Card className="mt-12">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              {language === 'az' ? 'Xüsusiyyətləri' : 'Special Features'}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {language === 'az' ? 'İmmun sistemi gücləndirici' : 'Immune system strengthening'}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {language === 'az' 
                        ? 'Prebiotiklər və vitaminlərlə immun sistemini gücləndirir'
                        : 'Strengthens the immune system with prebiotics and vitamins'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {language === 'az' ? 'Fiziki və zehni inkişaf' : 'Physical and mental development'}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {language === 'az' 
                        ? 'DHA və ARA ilə beyin və göz inkişafını dəstəkləyir'
                        : 'Supports brain and eye development with DHA and ARA'
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {language === 'az' ? 'Balanslaşdırılmış tərkib' : 'Balanced composition'}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {language === 'az' 
                        ? 'Körpənin ehtiyaclarına uyğun optimal nisbətlərdə'
                        : 'Optimal ratios adapted to baby\'s needs'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Heart className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {language === 'az' ? 'Rahat həzm' : 'Easy digestion'}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {language === 'az' 
                        ? 'Prebiotiklərlə həzm sistemini dəstəkləyir'
                        : 'Supports digestive system with prebiotics'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card className="mt-12">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" />
              {language === 'az' ? 'Tərkibi' : 'Ingredients'}
            </h3>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'az' 
                  ? 'Yağsız süd, laktoza, bitki yağları (günəbaxan yağı, kolza yağı, kokos yağı), zərdab protein konsentratı, susuz süd yağı, qalaktoliqosakkaridlər (laktozadan GOS), minerallar (kalsium karbonat, kalium xlorid, dəmir sulfat, natrium xlorid, maqnezium sitrat, kalsium fosfat, natrium sitrat, kalium hidroksid, sink sulfat, natrium selenat, kup sulfat, kalium yodat, manqan sulfat), təmizlənmiş balıq yağı, emulqator (günəbaxan lesitini), vitaminlər (natrium askorbat, DL-alfa-tokoferil asetat, retinil asetat, nikotinamid, xolekalsiferol, kalsium D-pantotenat, filloquinon, D-biotin, fol turşusu, siyanokobalamin, piridoksin hidroxlorid, tiamin mononitrat, riboflavin), Mortierella alpina yağı, 2\'-fukosillaktoza, xolin bitartrat, L-tirozin, taurin, L-triptofan, nukleotidlər (sitidin 5\'-monofosfat, uridin 5\'-monofosfat, adenozin 5\'-monofosfat, inozin 5\'-monofosfat, guanozin 5\'-monofosfat), antioksidantlar (tokoferolla zəngin ekstrakt, askorbil palmitat), L-sistein, L-karnitin-L-tartrat, inositol.'
                  : 'Skimmed milk, lactose, vegetable oils (sunflower oil, rapeseed oil, coconut oil), whey protein concentrate, anhydrous milk fat, galactooligosaccharides (GOS from lactose), minerals (calcium carbonate, potassium chloride, iron sulfate, sodium chloride, magnesium citrate, calcium phosphate, sodium citrate, potassium hydroxide, zinc sulfate, sodium selenate, copper sulfate, potassium iodate, manganese sulfate), purified fish oil, emulsifier (sunflower lecithin), vitamins (sodium ascorbate, DL-alpha-tocopheryl acetate, retinyl acetate, nicotinamide, cholecalciferol, calcium D-pantothenate, phylloquinone, D-biotin, folic acid, cyanocobalamin, pyridoxine hydrochloride, thiamine mononitrate, riboflavin), Mortierella alpina oil, 2\'-fucosyllactose, choline bitartrate, L-tyrosine, taurine, L-tryptophan, nucleotides (cytidine 5\'-monophosphate, uridine 5\'-monophosphate, adenosine 5\'-monophosphate, inosine 5\'-monophosphate, guanosine 5\'-monophosphate), antioxidants (tocopherol-rich extract, ascorbyl palmitate), L-cysteine, L-carnitine-L-tartrate, inositol.'
                }
              </p>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {language === 'az' ? 'GMO-suz' : 'GMO-free'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manufacturer Info */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {language === 'az' ? 'İstehsalçı' : 'Manufacturer'}
            </h3>
            
            <div className="space-y-2">
              <p className="font-semibold">Hochdorf Swiss Nutrition AG</p>
              <p className="text-sm text-muted-foreground">Siedereistrasse 9, 6281 Hochdorf, İsveçrə</p>
              <p className="text-sm text-muted-foreground">Siedereistrasse 9, 6281 Hochdorf, Switzerland</p>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {t('product.detail.chooseSwissneo')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {language === 'az'
                ? 'İsveçrə keyfiyyətində premium uşaq qidası ilə uşağınızın optimal inkişafını təmin edin.'
                : 'Ensure your baby\'s optimal development with premium baby food of Swiss quality.'
              }
            </p>
                         <div className="flex gap-4 justify-center">
               <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
                 {t('product.detail.contactUs')}
               </Button>
               <Button variant="outline" size="lg" onClick={() => navigate('/instructions')}>
                 {language === 'az' ? 'Təlimat' : 'Instructions'}
               </Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
