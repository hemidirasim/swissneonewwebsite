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
  AlertTriangle,
  Plus,
  Image as ImageIcon,
  Upload
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

  // Articles state
  const [articles, setArticles] = useState<Article[]>([]);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: { az: '', en: '' },
    excerpt: { az: '', en: '' },
    category: { az: '', en: '' },
    readTime: { az: '', en: '' },
    author: { az: '', en: '' },
    content: { az: '', en: '' },
    image: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Load site data on mount
  useEffect(() => {
    loadSiteData();
    loadArticles();
  }, []);

  const loadSiteData = () => {
    try {
      const data = databaseService.getData();
      setSiteData(data);
    } catch (error) {
      console.error('Error loading site data:', error);
    }
  };

  const loadArticles = () => {
    try {
      const articlesData = databaseService.getArticles();
      setArticles(articlesData);
    } catch (error) {
      console.error('Error loading articles:', error);
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

  // Article functions
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddArticle = async () => {
    try {
      let imagePath = '';
      if (selectedImage) {
        imagePath = await databaseService.uploadImage(selectedImage);
      }

      const articleData = {
        ...newArticle,
        date: new Date().toISOString().split('T')[0],
        image: imagePath
      } as Omit<Article, 'id'>;

      databaseService.addArticle(articleData);
      loadArticles();
      setShowArticleForm(false);
      setNewArticle({
        title: { az: '', en: '' },
        excerpt: { az: '', en: '' },
        category: { az: '', en: '' },
        readTime: { az: '', en: '' },
        author: { az: '', en: '' },
        content: { az: '', en: '' },
        image: ''
      });
      setSelectedImage(null);
      setImagePreview('');

      toast({
        title: 'Uğurlu!',
        description: 'Məqalə əlavə edildi.',
      });
    } catch (error) {
      toast({
        title: 'Xəta!',
        description: 'Məqalə əlavə edilə bilmədi.',
        variant: 'destructive',
      });
    }
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setNewArticle(article);
    setImagePreview(article.image || '');
    setShowArticleForm(true);
  };

  const handleUpdateArticle = async () => {
    if (!editingArticle) return;

    try {
      let imagePath = editingArticle.image || '';
      if (selectedImage) {
        imagePath = await databaseService.uploadImage(selectedImage);
      }

      const updates = {
        ...newArticle,
        image: imagePath
      };

      databaseService.updateArticle(editingArticle.id, updates);
      loadArticles();
      setShowArticleForm(false);
      setEditingArticle(null);
      setNewArticle({
        title: { az: '', en: '' },
        excerpt: { az: '', en: '' },
        category: { az: '', en: '' },
        readTime: { az: '', en: '' },
        author: { az: '', en: '' },
        content: { az: '', en: '' },
        image: ''
      });
      setSelectedImage(null);
      setImagePreview('');

      toast({
        title: 'Uğurlu!',
        description: 'Məqalə yeniləndi.',
      });
    } catch (error) {
      toast({
        title: 'Xəta!',
        description: 'Məqalə yenilənə bilmədi.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteArticle = (id: number) => {
    if (confirm('Bu məqaləni silmək istədiyinizə əminsiniz?')) {
      try {
        databaseService.deleteArticle(id);
        loadArticles();
        toast({
          title: 'Uğurlu!',
          description: 'Məqalə silindi.',
        });
      } catch (error) {
        toast({
          title: 'Xəta!',
          description: 'Məqalə silinə bilmədi.',
          variant: 'destructive',
        });
      }
    }
  };

  const updateArticleField = (field: keyof Article, lang: 'az' | 'en', value: string) => {
    setNewArticle(prev => ({
      ...prev,
      [field]: {
        ...prev[field] as { az: string; en: string },
        [lang]: value
      }
    }));
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
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Məqalələr ({articles.length})
                  </div>
                  <Button onClick={() => setShowArticleForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Məqalə
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showArticleForm ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {editingArticle ? 'Məqaləni Redaktə Et' : 'Yeni Məqalə'}
                      </h3>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowArticleForm(false);
                          setEditingArticle(null);
                          setNewArticle({
                            title: { az: '', en: '' },
                            excerpt: { az: '', en: '' },
                            category: { az: '', en: '' },
                            readTime: { az: '', en: '' },
                            author: { az: '', en: '' },
                            content: { az: '', en: '' },
                            image: ''
                          });
                          setSelectedImage(null);
                          setImagePreview('');
                        }}
                      >
                        Ləğv et
                      </Button>
                    </div>

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

                    {/* Article Form */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Başlıq ({currentLang})</Label>
                        <Input
                          value={newArticle.title?.[currentLang] || ''}
                          onChange={(e) => updateArticleField('title', currentLang, e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Kateqoriya ({currentLang})</Label>
                        <Input
                          value={newArticle.category?.[currentLang] || ''}
                          onChange={(e) => updateArticleField('category', currentLang, e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Müəllif ({currentLang})</Label>
                        <Input
                          value={newArticle.author?.[currentLang] || ''}
                          onChange={(e) => updateArticleField('author', currentLang, e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Oxuma vaxtı ({currentLang})</Label>
                        <Input
                          value={newArticle.readTime?.[currentLang] || ''}
                          onChange={(e) => updateArticleField('readTime', currentLang, e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Qısa məzmun ({currentLang})</Label>
                      <Textarea
                        value={newArticle.excerpt?.[currentLang] || ''}
                        onChange={(e) => updateArticleField('excerpt', currentLang, e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Ətraflı məzmun ({currentLang})</Label>
                      <Textarea
                        value={newArticle.content?.[currentLang] || ''}
                        onChange={(e) => updateArticleField('content', currentLang, e.target.value)}
                        rows={6}
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <Label>Şəkil</Label>
                      <div className="mt-2 space-y-4">
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('image-upload')?.click()}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Şəkil Seç
                          </Button>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                          />
                        </div>
                        {imagePreview && (
                          <div className="relative w-32 h-32">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={editingArticle ? handleUpdateArticle : handleAddArticle}
                      className="w-full"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingArticle ? 'Yenilə' : 'Əlavə Et'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {articles.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        Hələ heç bir məqalə yoxdur. Yeni məqalə əlavə edin.
                      </p>
                    ) : (
                      articles.map((article) => (
                        <Card key={article.id} className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              {article.image && (
                                <img
                                  src={article.image}
                                  alt={article.title[currentLang]}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              )}
                              <div className="flex-1">
                                <h4 className="font-semibold">{article.title[currentLang]}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {article.excerpt[currentLang]}
                                </p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                  <span>{article.author[currentLang]}</span>
                                  <span>{article.category[currentLang]}</span>
                                  <span>{article.readTime[currentLang]}</span>
                                  <span>{article.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditArticle(article)}
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteArticle(article.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                )}
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