import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export const Contact = () => {
  const { t, language } = useLanguage();
  const { adminData } = useAdminData();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Telefon',
      value: adminData.contactPhone,
      description: 'Bazar ertəsi - Cümə, 09:00-18:00',
      color: 'text-primary'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: adminData.contactEmail,
      description: '24 saat ərzində cavab veririk',
      color: 'text-secondary'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Ünvan',
      value: adminData.contactAddress[language],
      description: 'Əsas ofis',
      color: 'text-accent'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {t('contact.title')}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Suallarınız var?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="group hover:shadow-premium transition-all duration-500 border-0 text-center">
              <CardContent className="p-8">
                <div className={`${method.color} mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center`}>
                  {method.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{method.title}</h3>
                <p className="text-foreground font-medium mb-2">{method.value}</p>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="border-0 shadow-card bg-gradient-hero text-white">
          <CardContent className="p-12 text-center">
            <MessageCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h3 className="text-2xl font-bold mb-4">
              Swissneo haqqında ətraflı məlumat almaq istəyirsiniz?
            </h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Məhsullarımız, qidalanma məsləhətləri və ya Swissneo ailə proqramları haqqında məlumat üçün bizimlə əlaqə saxlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
              >
                <Phone className="w-5 h-5 mr-2" />
                Zəng et
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
                onClick={() => setIsContactFormOpen(true)}
              >
                <Mail className="w-5 h-5 mr-2" />
                Sorğu göndər
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form Popup */}
        <ContactForm 
          isOpen={isContactFormOpen} 
          onClose={() => setIsContactFormOpen(false)} 
        />
      </div>
    </section>
  );
};