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
  Clock,
  BookOpen,
  AlertTriangle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import databaseService, { Article, ContactSubmission } from '@/services/databaseService';

interface User {
  id: number;
  username: string;
  password_hash: string;
  role: string;
  created_at: string;
  updated_at: string;
}

const SwissAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentLang, setCurrentLang] = useState<'az' | 'en'>('az');
  const [siteData, setSiteData] = useState<any>({
    heroTitle: { az: '', en: '' },
    heroSubtitle: { az: '', en: '' },
    heroDescription: { az: '', en: '' },
    product1Name: { az: '', en: '' },
    product1Description: { az: '', en: '' },
    product2Name: { az: '', en: '' },
    product2Description: { az: '', en: '' },
    contactPhone: '',
    contactEmail: '',
    contactAddress: { az: '', en: '' },
    companyDescription: { az: '', en: '' },
    companyMission: { az: '', en: '' },
    companyQuality: { az: '', en: '' },
    instructionsTitle: { az: '', en: '' },
    instructionsDescription: { az: '', en: '' },
    articlesTitle: { az: '', en: '' },
    articlesDescription: { az: '', en: '' },
    footerDescription: { az: '', en: '' },
    footerCopyright: { az: '', en: '' }
  });

  // Load site data on mount
  useEffect(() => {
    loadSiteData();
  }, []);

  const loadSiteData = () => {
    try {
      const data = databaseService.getData();
      setSiteData(data);
    } catch (error) {
      console.error('Error loading site data:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await databaseService.authenticateUser(username, password);
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        setUsername('');
        setPassword('');
        toast({
          title: 'Giriş uğurlu!',
          description: 'Admin panelinə xoş gəlmisiniz.',
        });
      } else {
        toast({
          title: 'Yanlış məlumatlar!',
          description: 'İstifadəçi adı və ya şifrə yanlışdır.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Xəta!',
        description: 'Giriş zamanı xəta baş verdi.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast({
      title: 'Çıxış edildi',
      description: 'Admin panelindən çıxış etdiniz.',
    });
  };

  const updateSiteData = (field: string, value: any) => {
    setSiteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveSiteData = () => {
    try {
      databaseService.updateData(siteData);
      toast({
        title: 'Uğurlu!',
        description: 'Məlumatlar yadda saxlanıldı.',
      });
    } catch (error) {
      toast({
        title: 'Xəta!',
        description: 'Məlumatlar yadda saxlanıla bilmədi.',
        variant: 'destructive',
      });
    }
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Panel</CardTitle>
            <p className="text-muted-foreground">Swissneo Admin Panelinə giriş edin</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">İstifadəçi adı</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Şifrə</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Giriş et
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Test məlumatları:</p>
              <p>İstifadəçi adı: <strong>admin</strong></p>
              <p>Şifrə: <strong>swissneo2024</strong></p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Swissneo Admin Panel</h1>
                <p className="text-sm text-muted-foreground">
                  Xoş gəlmisiniz, {currentUser?.username}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Çıxış
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Məzmun</TabsTrigger>
            <TabsTrigger value="articles">Məqalələr</TabsTrigger>
            <TabsTrigger value="contact">Əlaqə</TabsTrigger>
            <TabsTrigger value="settings">Tənzimləmələr</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Sayt Məzmunu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language Selector */}
                <div className="flex gap-2">
                  <Button
                    variant={currentLang === 'az' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentLang('az')}
                  >
                    Azərbaycan
                  </Button>
                  <Button
                    variant={currentLang === 'en' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentLang('en')}
                  >
                    English
                  </Button>
                </div>

                {/* Hero Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Ana Səhifə</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Başlıq ({currentLang})</Label>
                      <Input
                        value={siteData.heroTitle?.[currentLang] || ''}
                        onChange={(e) => updateSiteData('heroTitle', {
                          ...siteData.heroTitle,
                          [currentLang]: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label>Alt başlıq ({currentLang})</Label>
                      <Input
                        value={siteData.heroSubtitle?.[currentLang] || ''}
                        onChange={(e) => updateSiteData('heroSubtitle', {
                          ...siteData.heroSubtitle,
                          [currentLang]: e.target.value
                        })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Təsvir ({currentLang})</Label>
                    <Textarea
                      value={siteData.heroDescription?.[currentLang] || ''}
                      onChange={(e) => updateSiteData('heroDescription', {
                        ...siteData.heroDescription,
                        [currentLang]: e.target.value
                      })}
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Products Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Məhsullar</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">Swissneo 1 (0-6 ay)</h4>
                      <div>
                        <Label>Ad ({currentLang})</Label>
                        <Input
                          value={siteData.product1Name?.[currentLang] || ''}
                          onChange={(e) => updateSiteData('product1Name', {
                            ...siteData.product1Name,
                            [currentLang]: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label>Təsvir ({currentLang})</Label>
                        <Textarea
                          value={siteData.product1Description?.[currentLang] || ''}
                          onChange={(e) => updateSiteData('product1Description', {
                            ...siteData.product1Description,
                            [currentLang]: e.target.value
                          })}
                          rows={2}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Swissneo 2 (6-12 ay)</h4>
                      <div>
                        <Label>Ad ({currentLang})</Label>
                        <Input
                          value={siteData.product2Name?.[currentLang] || ''}
                          onChange={(e) => updateSiteData('product2Name', {
                            ...siteData.product2Name,
                            [currentLang]: e.target.value
                          })}
                        />
                      </div>
                      <div>
                        <Label>Təsvir ({currentLang})</Label>
                        <Textarea
                          value={siteData.product2Description?.[currentLang] || ''}
                          onChange={(e) => updateSiteData('product2Description', {
                            ...siteData.product2Description,
                            [currentLang]: e.target.value
                          })}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Əlaqə Məlumatları</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Telefon</Label>
                      <Input
                        value={siteData.contactPhone || ''}
                        onChange={(e) => updateSiteData('contactPhone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        value={siteData.contactEmail || ''}
                        onChange={(e) => updateSiteData('contactEmail', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Ünvan ({currentLang})</Label>
                    <Input
                      value={siteData.contactAddress?.[currentLang] || ''}
                      onChange={(e) => updateSiteData('contactAddress', {
                        ...siteData.contactAddress,
                        [currentLang]: e.target.value
                      })}
                    />
                  </div>
                </div>

                <Button onClick={saveSiteData} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Yadda saxla
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Məqalələr
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Məqalələr bölməsi tezliklə əlavə ediləcək.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Əlaqə Mesajları
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Əlaqə mesajları bölməsi tezliklə əlavə ediləcək.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Tənzimləmələr
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tənzimləmələr bölməsi tezliklə əlavə ediləcək.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SwissAdmin;