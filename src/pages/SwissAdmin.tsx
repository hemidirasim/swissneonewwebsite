import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Settings, 
  Package, 
  Phone, 
  Globe, 
  Save, 
  LogOut,
  Edit3,
  Users,
  BarChart3,
  Languages,
  Mail,
  MessageSquare,
  Trash2,
  Calendar,
  Clock
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AdminData } from '@/contexts/AdminDataContext';

const ADMIN_PASSWORD = 'swissneo2024';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  language: string;
}

const SwissAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [currentLang, setCurrentLang] = useState<'az' | 'en'>('az');
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [adminData, setAdminData] = useState<AdminData>({
    heroTitle: { az: 'İsveçrə keyfiyyətində', en: 'Swiss Quality' },
    heroSubtitle: { az: 'Premium uşaq qidası', en: 'Premium Baby Formula' },
    heroDescription: { 
      az: 'Swissneo — 100 ildən artıq İsveçrə təcrübəsi ilə hazırlanmış super premium uşaq qarışığı. Uşağınızın sağlam inkişafı və güclü immunitet üçün.',
      en: 'Swissneo — super premium baby formula crafted with over 100 years of Swiss expertise. For your baby\'s healthy development and strong immunity.'
    },
    product1Name: { az: 'Swissneo 1', en: 'Swissneo 1' },
    product1Description: { 
      az: 'Doğulduğu gündən etibarən 6 ayadək olan körpələr üçün başlanğıc süd qarışığı',
      en: 'Starting infant milk formula for babies from birth to 6 months'
    },
    product2Name: { az: 'Swissneo 2', en: 'Swissneo 2' },
    product2Description: { 
      az: '6-12 aylıq körpələr üçün növbəti mərhələ süd qarışığı',
      en: 'Follow-on milk formula for babies from 6 to 12 months'
    },
    contactPhone: '+994 XX XXX XX XX',
    contactEmail: 'info@swissneo.az',
    contactAddress: { az: 'Bakı, Azərbaycan', en: 'Baku, Azerbaijan' },
    companyDescription: { 
      az: 'Swissneo — süd məhsulları sahəsində 100 ildən artıq təcrübəyə malik İsveçrənin super premium uşaq qidası markasıdır.',
      en: 'Swissneo is a super premium baby food brand from Switzerland with over 100 years of experience in dairy products.'
    },
    companyMission: { 
      az: 'Keyfiyyətə önəm verən və uşaqlarına ən yaxşısını vermək istəyən Azərbaycan valideynlərinin artan tələbatını qarşılamaq.',
      en: 'To meet the growing demand of knowledgeable Azerbaijani parents who value quality and want to give their children the best.'
    },
    companyQuality: { 
      az: 'İsveçrənin ən yüksək keyfiyyət standartları ilə istehsal olunan məhsullarımız uşağınızın təhlükəsizliyi üçün bütün sertifikatları daşıyır.',
      en: 'Our products manufactured with Switzerland\'s highest quality standards carry all certifications for your child\'s safety.'
    },
  });

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('swissneo_admin_data');
    if (savedData) {
      try {
        setAdminData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing admin data:', error);
      }
    }

    // Load contact submissions
    const savedSubmissions = localStorage.getItem('swissneo_contact_submissions');
    if (savedSubmissions) {
      try {
        setContactSubmissions(JSON.parse(savedSubmissions));
      } catch (error) {
        console.error('Error parsing contact submissions:', error);
      }
    }

    // Listen for new contact submissions
    const handleSubmissionsUpdate = () => {
      const submissions = localStorage.getItem('swissneo_contact_submissions');
      if (submissions) {
        try {
          setContactSubmissions(JSON.parse(submissions));
        } catch (error) {
          console.error('Error parsing contact submissions:', error);
        }
      }
    };

    window.addEventListener('contactSubmissionsUpdated', handleSubmissionsUpdate);
    return () => window.removeEventListener('contactSubmissionsUpdated', handleSubmissionsUpdate);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: 'Giriş uğurlu!',
        description: 'Admin panelinə xoş gəlmisiniz.',
      });
    } else {
      toast({
        title: 'Yanlış şifrə!',
        description: 'Doğru şifrəni daxil edin.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleSave = () => {
    localStorage.setItem('swissneo_admin_data', JSON.stringify(adminData));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('adminDataUpdated'));
    toast({
      title: 'Məlumatlar saxlanıldı!',
      description: 'Dəyişikliklər uğurla saxlanıldı və saytda görünəcək.',
    });
  };

  const handleBilingualInputChange = (field: keyof AdminData, lang: 'az' | 'en', value: string) => {
    setAdminData(prev => ({
      ...prev,
      [field]: {
        ...prev[field] as { az: string; en: string },
        [lang]: value
      }
    }));
  };

  const handleSimpleInputChange = (field: keyof AdminData, value: string) => {
    setAdminData(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteSubmission = (submissionId: string) => {
    const updatedSubmissions = contactSubmissions.filter(sub => sub.id !== submissionId);
    setContactSubmissions(updatedSubmissions);
    localStorage.setItem('swissneo_contact_submissions', JSON.stringify(updatedSubmissions));
    toast({
      title: 'Sorğu silindi!',
      description: 'Sorğu uğurla silindi.',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('az-AZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-premium">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Swissneo Admin</CardTitle>
            <p className="text-muted-foreground">Admin panelinə daxil olun</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Şifrə</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin şifrəsini daxil edin"
                  required
                />
              </div>
              <Button type="submit" variant="premium" className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Daxil ol
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Swissneo Admin Panel</h1>
                <p className="text-sm text-muted-foreground">Sayt məlumatlarını idarə edin</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-muted-foreground" />
                <div className="flex rounded-lg border border-border overflow-hidden">
                  <Button
                    variant={currentLang === 'az' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentLang('az')}
                    className="rounded-none text-xs px-3 py-1"
                  >
                    AZ
                  </Button>
                  <Button
                    variant={currentLang === 'en' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentLang('en')}
                    className="rounded-none text-xs px-3 py-1"
                  >
                    EN
                  </Button>
                </div>
              </div>
              <Button onClick={handleSave} variant="premium">
                <Save className="w-4 h-4 mr-2" />
                Saxla
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Çıxış
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Language Indicator */}
        <div className="mb-6">
          <Badge variant="outline" className="text-sm">
            {currentLang === 'az' ? '🇦🇿 Azərbaycan dili' : '🇬🇧 English language'} redaktə edilir
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mətn blokları</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Məhsullar</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Languages className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dillər</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-600">Aktiv</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="hero">Ana səhifə</TabsTrigger>
            <TabsTrigger value="products">Məhsullar</TabsTrigger>
            <TabsTrigger value="contact">Əlaqə</TabsTrigger>
            <TabsTrigger value="company">Şirkət</TabsTrigger>
            <TabsTrigger value="submissions" className="relative">
              Sorğular
              {contactSubmissions.length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                  {contactSubmissions.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Ana səhifə məlumatları - {currentLang === 'az' ? 'Azərbaycan' : 'English'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Ana başlıq</Label>
                  <Input
                    id="heroTitle"
                    value={adminData.heroTitle[currentLang]}
                    onChange={(e) => handleBilingualInputChange('heroTitle', currentLang, e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Alt başlıq</Label>
                  <Input
                    id="heroSubtitle"
                    value={adminData.heroSubtitle[currentLang]}
                    onChange={(e) => handleBilingualInputChange('heroSubtitle', currentLang, e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heroDescription">Açıqlama</Label>
                  <Textarea
                    id="heroDescription"
                    value={adminData.heroDescription[currentLang]}
                    onChange={(e) => handleBilingualInputChange('heroDescription', currentLang, e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Section */}
          <TabsContent value="products">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Swissneo 1 (0-6 ay) - {currentLang === 'az' ? 'Azərbaycan' : 'English'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="product1Name">Məhsul adı</Label>
                    <Input
                      id="product1Name"
                      value={adminData.product1Name[currentLang]}
                      onChange={(e) => handleBilingualInputChange('product1Name', currentLang, e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="product1Description">Açıqlama</Label>
                    <Textarea
                      id="product1Description"
                      value={adminData.product1Description[currentLang]}
                      onChange={(e) => handleBilingualInputChange('product1Description', currentLang, e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Swissneo 2 (6-12 ay) - {currentLang === 'az' ? 'Azərbaycan' : 'English'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="product2Name">Məhsul adı</Label>
                    <Input
                      id="product2Name"
                      value={adminData.product2Name[currentLang]}
                      onChange={(e) => handleBilingualInputChange('product2Name', currentLang, e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="product2Description">Açıqlama</Label>
                    <Textarea
                      id="product2Description"
                      value={adminData.product2Description[currentLang]}
                      onChange={(e) => handleBilingualInputChange('product2Description', currentLang, e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Section */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Əlaqə məlumatları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Telefon nömrəsi</Label>
                  <Input
                    id="contactPhone"
                    value={adminData.contactPhone}
                    onChange={(e) => handleSimpleInputChange('contactPhone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email ünvanı</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={adminData.contactEmail}
                    onChange={(e) => handleSimpleInputChange('contactEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactAddress">Ünvan - {currentLang === 'az' ? 'Azərbaycan' : 'English'}</Label>
                  <Input
                    id="contactAddress"
                    value={adminData.contactAddress[currentLang]}
                    onChange={(e) => handleBilingualInputChange('contactAddress', currentLang, e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Section */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Şirkət məlumatları - {currentLang === 'az' ? 'Azərbaycan' : 'English'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Şirkət açıqlaması</Label>
                  <Textarea
                    id="companyDescription"
                    value={adminData.companyDescription[currentLang]}
                    onChange={(e) => handleBilingualInputChange('companyDescription', currentLang, e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyMission">Missiya</Label>
                  <Textarea
                    id="companyMission"
                    value={adminData.companyMission[currentLang]}
                    onChange={(e) => handleBilingualInputChange('companyMission', currentLang, e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyQuality">Keyfiyyət təminatı</Label>
                  <Textarea
                    id="companyQuality"
                    value={adminData.companyQuality[currentLang]}
                    onChange={(e) => handleBilingualInputChange('companyQuality', currentLang, e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions Section */}
          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Gələn sorğular ({contactSubmissions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {contactSubmissions.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Hələ ki gələn sorğu yoxdur.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contactSubmissions.map((submission) => (
                      <Card key={submission.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Badge variant={submission.language === 'az' ? 'default' : 'secondary'}>
                                {submission.language === 'az' ? '🇦🇿 AZ' : '🇬🇧 EN'}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                {formatDate(submission.date)}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSubmission(submission.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label className="text-xs text-muted-foreground">Ad və Soyad</Label>
                              <p className="font-medium">{submission.name}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Email</Label>
                              <p className="font-medium break-all">{submission.email}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">Telefon</Label>
                              <p className="font-medium">{submission.phone}</p>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-xs text-muted-foreground">Mesaj</Label>
                            <p className="mt-1 p-3 bg-muted rounded-md text-sm">{submission.message}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-center pt-8">
          <Button onClick={handleSave} variant="premium" size="lg">
            <Save className="w-5 h-5 mr-2" />
            Bütün dəyişiklikləri saxla
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SwissAdmin;