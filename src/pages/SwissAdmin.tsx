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
import databaseService, { User, SiteData } from '@/services/databaseService';

const SwissAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentLang, setCurrentLang] = useState<'az' | 'en'>('az');
  const [siteData, setSiteData] = useState<SiteData>({
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
    instructionsSteps: { az: [], en: [] },
    articlesTitle: { az: '', en: '' },
    articlesDescription: { az: '', en: '' },
    articles: [],
    footerDescription: { az: '', en: '' },
    footerCopyright: { az: '', en: '' }
  });

  // Load site data on mount
  useEffect(() => {
    loadSiteData();
  }, []);

  const loadSiteData = async () => {
    try {
      const data = await databaseService.getSiteData();
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
    setUsername('');
    setPassword('');
    toast({
      title: 'Çıxış edildi',
      description: 'Təhlükəsiz şəkildə çıxış etdiniz.',
    });
  };

  const handleSave = async () => {
    try {
      await databaseService.updateSiteData(siteData);
      toast({
        title: 'Məlumatlar saxlanıldı!',
        description: 'Dəyişikliklər uğurla saxlanıldı və saytda görünəcək.',
      });
    } catch (error) {
      toast({
        title: 'Xəta!',
        description: 'Məlumatları saxlayarkən xəta baş verdi.',
        variant: 'destructive',
      });
    }
  };

  const handleBilingualInputChange = (field: keyof SiteData, lang: 'az' | 'en', value: string) => {
    setSiteData(prev => ({
      ...prev,
      [field]: {
        ...prev[field] as { az: string; en: string },
        [lang]: value
      }
    }));
  };

  const handleSimpleInputChange = (field: keyof SiteData, value: string) => {
    setSiteData(prev => ({ ...prev, [field]: value }));
  };

  const handleInstructionsStepChange = (lang: 'az' | 'en', index: number, value: string) => {
    setSiteData(prev => ({
      ...prev,
      instructionsSteps: {
        ...prev.instructionsSteps,
        [lang]: prev.instructionsSteps[lang].map((step, i) => i === index ? value : step)
      }
    }));
  };

  const handleAddInstructionsStep = (lang: 'az' | 'en') => {
    setSiteData(prev => ({
      ...prev,
      instructionsSteps: {
        ...prev.instructionsSteps,
        [lang]: [...prev.instructionsSteps[lang], 'Yeni addım']
      }
    }));
  };

  const handleRemoveInstructionsStep = (lang: 'az' | 'en', index: number) => {
    setSiteData(prev => ({
      ...prev,
      instructionsSteps: {
        ...prev.instructionsSteps,
        [lang]: prev.instructionsSteps[lang].filter((_, i) => i !== index)
      }
    }));
  };

  const handleArticleChange = (articleId: string, field: string, lang: 'az' | 'en', value: string) => {
    setSiteData(prev => ({
      ...prev,
      articles: prev.articles.map(article => 
        article.id === articleId 
          ? {
              ...article,
              [field]: {
                ...article[field as keyof typeof article] as { az: string; en: string },
                [lang]: value
              }
            }
          : article
      )
    }));
  };

  const handleAddArticle = () => {
    const newArticle = {
      id: Date.now().toString(),
      title: { az: 'Yeni məqalə', en: 'New Article' },
      excerpt: { az: 'Qısa məzmun', en: 'Short excerpt' },
      category: { az: 'Kateqoriya', en: 'Category' },
      readTime: { az: '5 dəq', en: '5 min' },
      author: { az: 'Müəllif', en: 'Author' },
      date: new Date().toISOString().split('T')[0],
      content: { az: 'Ətraflı məzmun...', en: 'Detailed content...' }
    };

    setSiteData(prev => ({
      ...prev,
      articles: [...prev.articles, newArticle]
    }));
  };

  const handleRemoveArticle = (articleId: string) => {
    setSiteData(prev => ({
      ...prev,
      articles: prev.articles.filter(article => article.id !== articleId)
    }));
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
                <Label htmlFor="username">İstifadəçi adı</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="İstifadəçi adını daxil edin"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Şifrə</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrəni daxil edin"
                  required
                />
              </div>
              <Button type="submit" variant="premium" className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Daxil ol
              </Button>
            </form>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Test məlumatları:</strong><br />
                İstifadəçi adı: <code>admin</code><br />
                Şifrə: <code>swissneo2024</code>
              </p>
            </div>
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
                <p className="text-sm text-muted-foreground">
                  Xoş gəlmisiniz, {currentUser?.username}!
                </p>
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
              
              {/* Save Button */}
              <Button onClick={handleSave} variant="premium" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Saxla
              </Button>
              
              {/* Logout Button */}
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Çıxış
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Məhsullar
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Əlaqə
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Şirkət
            </TabsTrigger>
            <TabsTrigger value="instructions" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Təlimatlar
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Məqalələr
            </TabsTrigger>
            <TabsTrigger value="footer" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Footer
            </TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Hero Bölməsi - {currentLang === 'az' ? 'Azərbaycan' : 'English'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Başlıq</Label>
                  <Input
                    id="heroTitle"
                    value={siteData.heroTitle?.[currentLang] || ''}
                    onChange={(e) => handleBilingualInputChange('heroTitle', currentLang, e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Alt başlıq</Label>
                  <Input
                    id="heroSubtitle"
                    value={siteData.heroSubtitle?.[currentLang] || ''}
                    onChange={(e) => handleBilingualInputChange('heroSubtitle', currentLang, e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heroDescription">Təsvir</Label>
                  <Textarea
                    id="heroDescription"
                    value={siteData.heroDescription?.[currentLang] || ''}
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
              {/* Product 1 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Swissneo 1 - {currentLang === 'az' ? 'Azərbaycan' : 'English'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="product1Name">Məhsul adı</Label>
                    <Input
                      id="product1Name"
                      value={siteData.product1Name?.[currentLang] || ''}
                      onChange={(e) => handleBilingualInputChange('product1Name', currentLang, e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="product1Description">Məhsul təsviri</Label>
                    <Textarea
                      id="product1Description"
                      value={siteData.product1Description?.[currentLang] || ''}
                      onChange={(e) => handleBilingualInputChange('product1Description', currentLang, e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Product 2 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Swissneo 2 - {currentLang === 'az' ? 'Azərbaycan' : 'English'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="product2Name">Məhsul adı</Label>
                    <Input
                      id="product2Name"
                      value={siteData.product2Name?.[currentLang] || ''}
                      onChange={(e) => handleBilingualInputChange('product2Name', currentLang, e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="product2Description">Məhsul təsviri</Label>
                    <Textarea
                      id="product2Description"
                      value={siteData.product2Description?.[currentLang] || ''}
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
                  Əlaqə Məlumatları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Telefon</Label>
                  <Input
                    id="contactPhone"
                    value={siteData.contactPhone || ''}
                    onChange={(e) => handleSimpleInputChange('contactPhone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={siteData.contactEmail || ''}
                    onChange={(e) => handleSimpleInputChange('contactEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactAddress">Ünvan - {currentLang === 'az' ? 'Azərbaycan' : 'English'}</Label>
                  <Input
                    id="contactAddress"
                    value={siteData.contactAddress?.[currentLang] || ''}
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
                  Şirkət Məlumatları - {currentLang === 'az' ? 'Azərbaycan' : 'English'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Şirkət təsviri</Label>
                  <Textarea
                    id="companyDescription"
                    value={siteData.companyDescription?.[currentLang] || ''}
                    onChange={(e) => handleBilingualInputChange('companyDescription', currentLang, e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyMission">Missiya</Label>
                  <Textarea
                    id="companyMission"
                    value={siteData.companyMission?.[currentLang] || ''}
                    onChange={(e) => handleBilingualInputChange('companyMission', currentLang, e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyQuality">Keyfiyyət</Label>
                  <Textarea
                    id="companyQuality"
                    value={siteData.companyQuality?.[currentLang] || ''}
                    onChange={(e) => handleBilingualInputChange('companyQuality', currentLang, e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Instructions Section */}
          <TabsContent value="instructions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Qidalandırma Təlimatları - {currentLang === 'az' ? 'Azərbaycan' : 'English'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="instructionsTitle">Başlıq</Label>
                  <Input
                    id="instructionsTitle"
                    value={siteData.instructionsTitle?.[currentLang] || ''}
                    onChange={(e) => handleBilingualInputChange('instructionsTitle', currentLang, e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instructionsDescription">Açıqlama</Label>
                  <Textarea
                    id="instructionsDescription"
                    value={siteData.instructionsDescription?.[currentLang] || ''}
                    onChange={(e) => handleBilingualInputChange('instructionsDescription', currentLang, e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Təlimat addımları</Label>
                  <div className="space-y-3">
                    {(siteData.instructionsSteps?.[currentLang] || []).map((step, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Badge variant="outline" className="w-8 h-8 p-0 flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        <Input
                          value={step}
                          onChange={(e) => handleInstructionsStepChange(currentLang, index, e.target.value)}
                          placeholder={`Addım ${index + 1}`}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveInstructionsStep(currentLang, index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => handleAddInstructionsStep(currentLang)}
                      className="w-full"
                    >
                      + Yeni addım əlavə et
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Articles Section */}
          <TabsContent value="articles">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Məqalələr - {currentLang === 'az' ? 'Azərbaycan' : 'English'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="articlesTitle">Bölmə başlığı</Label>
                  <Input
                    id="articlesTitle"
                    value={siteData.articlesTitle?.[currentLang] || ''}
                    onChange={(e) => handleBilingualInputChange('articlesTitle', currentLang, e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="articlesDescription">Bölmə açıqlaması</Label>
                  <Textarea
                    id="articlesDescription"
                    value={siteData.articlesDescription?.[currentLang] || ''}
                    onChange={(e) => handleBilingualInputChange('articlesDescription', currentLang, e.target.value)}
                    rows={3}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Məqalələr ({(siteData.articles || []).length})</Label>
                    <Button
                      variant="outline"
                      onClick={() => handleAddArticle()}
                      size="sm"
                    >
                      + Yeni məqalə
                    </Button>
                  </div>
                  
                  {(siteData.articles || []).map((article, index) => (
                    <Card key={article.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="secondary">Məqalə {index + 1}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveArticle(article.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Başlıq</Label>
                            <Input
                              value={article.title?.[currentLang] || ''}
                              onChange={(e) => handleArticleChange(article.id, 'title', currentLang, e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Kateqoriya</Label>
                            <Input
                              value={article.category?.[currentLang] || ''}
                              onChange={(e) => handleArticleChange(article.id, 'category', currentLang, e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Müəllif</Label>
                            <Input
                              value={article.author?.[currentLang] || ''}
                              onChange={(e) => handleArticleChange(article.id, 'author', currentLang, e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Oxuma vaxtı</Label>
                            <Input
                              value={article.readTime?.[currentLang] || ''}
                              onChange={(e) => handleArticleChange(article.id, 'readTime', currentLang, e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2 mt-4">
                          <Label>Qısa məzmun</Label>
                          <Textarea
                            value={article.excerpt?.[currentLang] || ''}
                            onChange={(e) => handleArticleChange(article.id, 'excerpt', currentLang, e.target.value)}
                            rows={2}
                          />
                        </div>
                        
                        <div className="space-y-2 mt-4">
                          <Label>Ətraflı məzmun</Label>
                          <Textarea
                            value={article.content?.[currentLang] || ''}
                            onChange={(e) => handleArticleChange(article.id, 'content', currentLang, e.target.value)}
                            rows={4}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Footer Section */}
          <TabsContent value="footer">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Footer - {currentLang === 'az' ? 'Azərbaycan' : 'English'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="footerDescription">Footer təsviri</Label>
                  <Textarea
                    id="footerDescription"
                    value={siteData.footerDescription?.[currentLang] || ''}
                    onChange={(e) => handleBilingualInputChange('footerDescription', currentLang, e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="footerCopyright">Müəllif hüququ</Label>
                  <Input
                    id="footerCopyright"
                    value={siteData.footerCopyright?.[currentLang] || ''}
                    onChange={(e) => handleBilingualInputChange('footerCopyright', currentLang, e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SwissAdmin;