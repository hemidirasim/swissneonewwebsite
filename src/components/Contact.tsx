import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock, MessageCircle, Youtube, Instagram, Facebook, Share2 } from 'lucide-react';

export const Contact = () => {
  const { t, language } = useLanguage();
  const { adminData } = useAdminData();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Social media links
  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://youtube.com/@swissneo.azerbaijan?si=cqyNw6tk1_yiL-Xs',
      icon: Youtube,
      color: 'hover:text-red-500',
      bgColor: 'bg-red-500/10 hover:bg-red-500/20'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/swissneo.az?igsh=MWUwbHpiemYwOThtbQ%3D%3D&utm_source=qr',
      icon: Instagram,
      color: 'hover:text-pink-500',
      bgColor: 'bg-pink-500/10 hover:bg-pink-500/20'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@swissneo.az?_t=ZS-8yqM9i2X294&_r=1',
      icon: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: 'hover:text-black',
      bgColor: 'bg-black/10 hover:bg-black/20'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61577014692181',
      icon: Facebook,
      color: 'hover:text-blue-600',
      bgColor: 'bg-blue-500/10 hover:bg-blue-500/20'
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('contact.phone'),
      value: adminData?.contactPhone || '+994 XX XXX XX XX',
      description: t('contact.phone.hours'),
      color: 'text-primary'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('contact.email'),
      value: adminData?.contactEmail || 'info@swissneo.az',
      description: t('contact.email.response'),
      color: 'text-secondary'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('contact.address'),
      value: adminData?.contactAddress?.[language] || 'Bakı, Azərbaycan',
      description: t('contact.address.office'),
      color: 'text-accent'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {t('contact.title')}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('contact.question')}
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

        {/* Social Media Section */}
        <div className="mb-16">
          <Card className="border-0 shadow-card bg-white">
            <CardContent className="p-12 text-center">
              <div className="flex items-center justify-center mb-6">
                <Share2 className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold text-foreground">{t('social.follow.title')}</h3>
              </div>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('social.follow.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center p-6 rounded-xl transition-all duration-300 ${social.bgColor} hover:scale-105`}
                    title={social.name}
                  >
                    <div className={`w-12 h-12 rounded-full bg-white/80 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 ${social.color}`}>
                      <social.icon className="w-6 h-6" />
                    </div>
                    <span className="font-medium text-foreground">{social.name}</span>
                    <span className="text-sm text-muted-foreground">{t('social.follow.button')}</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="border-0 shadow-card bg-gradient-hero text-white">
          <CardContent className="p-12 text-center">
            <MessageCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h3 className="text-2xl font-bold mb-4">
              {t('contact.cta.title')}
            </h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              {t('contact.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
                asChild
              >
                <a href={`tel:${adminData?.contactPhone || '+994 XX XXX XX XX'}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  {t('contact.call')}
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
                onClick={() => setIsContactFormOpen(true)}
              >
                <Mail className="w-5 h-5 mr-2" />
                {t('contact.inquiry')}
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