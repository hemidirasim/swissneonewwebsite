import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Shield, Award, Users, Heart, Microscope } from 'lucide-react';

export const About = () => {
  const { t } = useLanguage();
  const { adminData } = useAdminData();

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: t('about.mission'),
      description: adminData.companyMission,
      color: 'text-primary'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('about.quality'),
      description: adminData.companyQuality,
      color: 'text-secondary'
    }
  ];

  const stats = [
    { number: '100+', label: 'İllik təcrübə' },
    { number: '2', label: 'Məhsul çeşidi' },
    { number: '🇨🇭', label: 'İsveçrə keyfiyyəti' },
    { number: '100%', label: 'Təbii formula' }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {t('nav.about')}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 max-w-4xl mx-auto">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {adminData.companyDescription}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-card hover:shadow-premium transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="group hover:shadow-premium transition-all duration-500 border-0">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className={`${value.color} group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Swiss Quality Features */}
        <Card className="border-0 shadow-card bg-gradient-subtle">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">İsveçrə keyfiyyət standartları</h3>
              <p className="text-muted-foreground">Nə üçün İsveçrə süd məhsulları dünyada ən yaxşısıdır?</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Microscope className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Elmi tədqiqat</h4>
                <p className="text-sm text-muted-foreground">100 ildən artıq süd məhsulları sahəsində tədqiqat və inkişaf</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Heart className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Təbii mənbə</h4>
                <p className="text-sm text-muted-foreground">Alp dağlarının təmiz havasında bəslənən inəklərdən alınan süd</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Sertifikat</h4>
                <p className="text-sm text-muted-foreground">Bütün beynəlxalq keyfiyyət və təhlükəsizlik standartlarına uyğun</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};