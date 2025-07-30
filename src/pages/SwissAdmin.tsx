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
  BarChart3
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ADMIN_PASSWORD = 'swissneo2024';

interface AdminData {
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // Products
  product1Name: string;
  product1Description: string;
  product2Name: string;
  product2Description: string;
  
  // Contact Info
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  
  // Company Info
  companyDescription: string;
  companyMission: string;
  companyQuality: string;
}

const SwissAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [adminData, setAdminData] = useState<AdminData>({
    // Default values
    heroTitle: 'İsveçrə keyfiyyətində',
    heroSubtitle: 'Premium uşaq qidası',
    heroDescription: 'Swissneo — 100 ildən artıq İsveçrə təcrübəsi ilə hazırlanmış super premium uşaq qarışığı. Uşağınızın sağlam inkişafı və güclü immunitet üçün.',
    
    product1Name: 'Swissneo 1',
    product1Description: 'Doğulduğu gündən etibarən 6 ayadək olan körpələr üçün başlanğıc süd qarışığı',
    product2Name: 'Swissneo 2',
    product2Description: '6-12 aylıq körpələr üçün növbəti mərhələ süd qarışığı',
    
    contactPhone: '+994 XX XXX XX XX',
    contactEmail: 'info@swissneo.az',
    contactAddress: 'Bakı, Azərbaycan',
    
    companyDescription: 'Swissneo — süd məhsulları sahəsində 100 ildən artıq təcrübəyə malik İsveçrənin super premium uşaq qidası markasıdır.',
    companyMission: 'Keyfiyyətə önəm verən və uşaqlarına ən yaxşısını vermək istəyən Azərbaycan valideynlərinin artan tələbatını qarşılamaq.',
    companyQuality: 'İsveçrənin ən yüksək keyfiyyət standartları ilə istehsal olunan məhsullarımız uşağınızın təhlükəsizliyi üçün bütün sertifikatları daşıyır.',
  });

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('swissneo_admin_data');
    if (savedData) {
      setAdminData(JSON.parse(savedData));
    }
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
    toast({
      title: 'Məlumatlar saxlanıldı!',
      description: 'Dəyişikliklər uğurla saxlanıldı.',
    });
  };

  const handleInputChange = (field: keyof AdminData, value: string) => {
    setAdminData(prev => ({ ...prev, [field]: value }));
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
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Əlaqə məlumatları</p>
                  <p className="text-2xl font-bold">3</p>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hero">Ana səhifə</TabsTrigger>
            <TabsTrigger value="products">Məhsullar</TabsTrigger>
            <TabsTrigger value="contact">Əlaqə</TabsTrigger>
            <TabsTrigger value="company">Şirkət</TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Ana səhifə məlumatları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Ana başlıq</Label>
                  <Input
                    id="heroTitle"
                    value={adminData.heroTitle}
                    onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Alt başlıq</Label>
                  <Input
                    id="heroSubtitle"
                    value={adminData.heroSubtitle}
                    onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heroDescription">Açıqlama</Label>
                  <Textarea
                    id="heroDescription"
                    value={adminData.heroDescription}
                    onChange={(e) => handleInputChange('heroDescription', e.target.value)}
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
                    Swissneo 1 (0-6 ay)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="product1Name">Məhsul adı</Label>
                    <Input
                      id="product1Name"
                      value={adminData.product1Name}
                      onChange={(e) => handleInputChange('product1Name', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="product1Description">Açıqlama</Label>
                    <Textarea
                      id="product1Description"
                      value={adminData.product1Description}
                      onChange={(e) => handleInputChange('product1Description', e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Swissneo 2 (6-12 ay)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="product2Name">Məhsul adı</Label>
                    <Input
                      id="product2Name"
                      value={adminData.product2Name}
                      onChange={(e) => handleInputChange('product2Name', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="product2Description">Açıqlama</Label>
                    <Textarea
                      id="product2Description"
                      value={adminData.product2Description}
                      onChange={(e) => handleInputChange('product2Description', e.target.value)}
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
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email ünvanı</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={adminData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactAddress">Ünvan</Label>
                  <Input
                    id="contactAddress"
                    value={adminData.contactAddress}
                    onChange={(e) => handleInputChange('contactAddress', e.target.value)}
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
                  Şirkət məlumatları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Şirkət açıqlaması</Label>
                  <Textarea
                    id="companyDescription"
                    value={adminData.companyDescription}
                    onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyMission">Missiya</Label>
                  <Textarea
                    id="companyMission"
                    value={adminData.companyMission}
                    onChange={(e) => handleInputChange('companyMission', e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyQuality">Keyfiyyət təminatı</Label>
                  <Textarea
                    id="companyQuality"
                    value={adminData.companyQuality}
                    onChange={(e) => handleInputChange('companyQuality', e.target.value)}
                    rows={3}
                  />
                </div>
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