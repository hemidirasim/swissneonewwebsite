import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Baby, Clock, Weight, MapPin } from 'lucide-react';

export const Products = () => {
  const { t } = useLanguage();
  const { adminData } = useAdminData();

  const products = [
    {
      id: 1,
      image: '/lovable-uploads/b0d62079-dc9d-4d61-a539-2cde4f82d6c3.png',
      name: adminData.product1Name,
      stage: t('product1.stage'),
      description: adminData.product1Description,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      image: '/lovable-uploads/1b436833-1495-456b-bdfb-0184d54c29b7.png',
      name: adminData.product2Name,
      stage: t('product2.stage'),
      description: adminData.product2Description,
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
    <section id="products" className="py-20 bg-gradient-subtle">
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
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Weight className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{t('product.weight')}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{t('product.origin')}</span>
                      </div>
                    </div>
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
              <h3 className="text-2xl font-bold text-foreground mb-2">{t('product.features')}</h3>
              <p className="text-muted-foreground">Her məhsulda olan keyfiyyət xüsusiyyətləri</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};