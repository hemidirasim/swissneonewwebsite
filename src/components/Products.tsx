import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Weight, 
  MapPin, 
  Shield, 
  Heart, 
  Award, 
  Star 
} from 'lucide-react';

export const Products = () => {
  const { t, language } = useLanguage();
  const { adminData } = useAdminData();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      image: '/lovable-uploads/b0d62079-dc9d-4d61-a539-2cde4f82d6c3.png',
      name: adminData?.product1Name?.[language] || 'Swissneo Super Premium Formula 0-6 ay',
      stage: t('product1.stage'),
      description: adminData?.product1Description?.[language] || 'Doğulduğu gündən etibarən 6 ayadək olan körpələr üçün başlanğıc süd qarışığı',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      image: '/lovable-uploads/1b436833-1495-456b-bdfb-0184d54c29b7.png',
      name: adminData?.product2Name?.[language] || 'Swissneo Super Premium Formula 6-12 ay',
      stage: t('product2.stage'),
      description: adminData?.product2Description?.[language] || '6-12 aylıq körpələr üçün növbəti mərhələ süd qarışığı',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const features = [
    t('product.feature1'),
    t('product.feature2'),
    t('product.feature3'),
    t('product.feature4')
  ];

  return (
    <section id="products" className="py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {t('products.title')}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('products.subtitle')}
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-premium transition-all duration-500 border-0 overflow-hidden">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Product Image */}
                  <div className={`relative ${product.bgColor} rounded-2xl p-8 group-hover:scale-105 transition-transform duration-500`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-auto max-w-48 mx-auto"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-10 rounded-2xl`}></div>
                  </div>

                  {/* Product Info */}
                  <div>
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-foreground mb-2">{product.name}</h3>
                      <Badge variant="secondary" className="mb-3">
                        {product.stage}
                      </Badge>
                      <p className="text-muted-foreground">{product.description}</p>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Weight className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{t('product.weight')}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{t('product.origin')}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Button 
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="w-full flex items-center gap-2 group"
                    >
                      {t('product.detail.viewDetails')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <Card className="border-0 shadow-card">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">{t('product.features.title')}</h3>
              <p className="text-muted-foreground">{t('product.features.description')}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-card/50">
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    {index === 0 && <Shield className="w-6 h-6 text-primary" />}
                    {index === 1 && <Heart className="w-6 h-6 text-secondary" />}
                    {index === 2 && <Award className="w-6 h-6 text-accent" />}
                    {index === 3 && <Star className="w-6 h-6 text-yellow-500" />}
                  </div>
                  <p className="text-sm font-medium text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};