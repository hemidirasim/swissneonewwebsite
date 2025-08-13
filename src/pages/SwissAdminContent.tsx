import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import databaseService, { Article, ContactSubmission } from '@/services/databaseService';
import { ImageUploader } from '@/components/ImageUploader';
import { 
  Settings, 
  FileText, 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  Upload,
  X
} from 'lucide-react';

export const SwissAdminContent = () => {
  const { language } = useLanguage();
  const { adminData, updateAdminData, addArticle, updateArticle, deleteArticle, addContactSubmission, deleteContactSubmission } = useAdminData();
  const { toast } = useToast();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: { az: '', en: '' },
    content: { az: '', en: '' },
    image: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Check session on mount
  useEffect(() => {
    checkSession();
    loadArticles();
  }, []);

  const checkSession = () => {
    const loggedIn = databaseService.isLoggedIn();
    const user = databaseService.getCurrentUser();
    setIsLoggedIn(loggedIn);
    setCurrentUser(user);
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
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const user = await databaseService.authenticateUser(username, password);
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        toast({
          title: "Giriş uğurlu!",
          description: "Admin panelinə xoş gəlmisiniz.",
        });
      } else {
        toast({
          title: "Giriş uğursuz!",
          description: "İstifadəçi adı və ya şifrə yanlışdır.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Xəta!",
        description: "Giriş zamanı xəta baş verdi.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    databaseService.logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
    toast({
      title: "Çıxış edildi",
      description: "Təhlükəsiz şəkildə çıxış etdiniz.",
    });
  };

  const updateSiteData = (field: string, value: any) => {
    const newData = { ...adminData };
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (!newData[parent]) newData[parent] = {};
      newData[parent][child] = value;
    } else {
      newData[field] = value;
    }
    updateAdminData(newData);
  };

  const saveSiteData = () => {
    toast({
      title: "Yadda saxlanıldı!",
      description: "Bütün dəyişikliklər uğurla yadda saxlanıldı.",
    });
  };

  // Article functions
  const handleImageSelect = (file: File, preview: string) => {
    setSelectedImage(file);
    setImagePreview(preview);
    // Preview üçün base64 istifadə et, amma yükləmə zamanı Vercel Blob-a göndər
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setImagePreview('');
    setNewArticle(prev => ({ ...prev, image: '' }));
  };

  const handleAddArticle = async () => {
    try {
      let imageUrl = '';
      if (selectedImage) {
        // Vercel Blob Storage-a yüklə
        imageUrl = await databaseService.uploadImage(selectedImage);
      }

      const articleData = {
        title: newArticle.title,
        content: newArticle.content,
        image: imageUrl, // Vercel Blob URL
        date: new Date().toISOString()
      } as Omit<Article, 'id'>;

      addArticle(articleData);
      setNewArticle({
        title: { az: '', en: '' },
        content: { az: '', en: '' },
        image: ''
      });
      setSelectedImage(null);
      setImagePreview('');
      setShowArticleForm(false);
      loadArticles();

      toast({
        title: "Məqalə əlavə edildi!",
        description: "Yeni məqalə uğurla əlavə edildi.",
      });
    } catch (error) {
      console.error('Error adding article:', error);
      toast({
        title: "Xəta!",
        description: "Məqalə əlavə edilərkən xəta baş verdi.",
        variant: "destructive",
      });
    }
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setNewArticle({
      title: article.title,
      content: article.content,
      image: article.image
    });
    setImagePreview(article.image || '');
    setShowArticleForm(true);
  };

  const handleUpdateArticle = async () => {
    if (!editingArticle) return;

    try {
      let imageUrl = editingArticle.image || '';
      if (selectedImage) {
        // Vercel Blob Storage-a yüklə
        imageUrl = await databaseService.uploadImage(selectedImage);
      }

      const updates = {
        title: newArticle.title,
        content: newArticle.content,
        image: imageUrl // Vercel Blob URL
      };

      updateArticle(editingArticle.id, updates);
      setEditingArticle(null);
      setNewArticle({
        title: { az: '', en: '' },
        content: { az: '', en: '' },
        image: ''
      });
      setSelectedImage(null);
      setImagePreview('');
      setShowArticleForm(false);
      loadArticles();

      toast({
        title: "Məqalə yeniləndi!",
        description: "Məqalə uğurla yeniləndi.",
      });
    } catch (error) {
      console.error('Error updating article:', error);
      toast({
        title: "Xəta!",
        description: "Məqalə yenilənərkən xəta baş verdi.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteArticle = (id: number) => {
    if (confirm('Bu məqaləni silmək istədiyinizə əminsiniz?')) {
      deleteArticle(id);
      loadArticles();
      toast({
        title: "Məqalə silindi!",
        description: "Məqalə uğurla silindi.",
      });
    }
  };

  const updateArticleField = (field: keyof Article, value: any) => {
    setNewArticle(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Extend session on any action
  const extendSession = () => {
    databaseService.extendSession();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Swissneo Admin Panel
            </CardTitle>
            <p className="text-gray-600">Zəhmət olmasa giriş edin</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">İstifadəçi adı</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Şifrə</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full">
                Giriş et
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Settings className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Swissneo Admin Panel</h1>
                <p className="text-sm text-gray-500">
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content" onClick={extendSession}>
              <FileText className="w-4 h-4 mr-2" />
              Məzmun
            </TabsTrigger>
            <TabsTrigger value="articles" onClick={extendSession}>
              <FileText className="w-4 h-4 mr-2" />
              Məqalələr
            </TabsTrigger>
            <TabsTrigger value="contact" onClick={extendSession}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Əlaqə
            </TabsTrigger>
            <TabsTrigger value="settings" onClick={extendSession}>
              <Settings className="w-4 h-4 mr-2" />
              Tənzimləmələr
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sayt Məzmunu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hero Section */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Ana Səhifə</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Başlıq (AZ)</Label>
                      <Input
                        value={adminData.heroTitle?.az || ''}
                        onChange={(e) => updateSiteData('heroTitle.az', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Başlıq (EN)</Label>
                      <Input
                        value={adminData.heroTitle?.en || ''}
                        onChange={(e) => updateSiteData('heroTitle.en', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Alt başlıq (AZ)</Label>
                      <Input
                        value={adminData.heroSubtitle?.az || ''}
                        onChange={(e) => updateSiteData('heroSubtitle.az', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Alt başlıq (EN)</Label>
                      <Input
                        value={adminData.heroSubtitle?.en || ''}
                        onChange={(e) => updateSiteData('heroSubtitle.en', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Products Section */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Məhsullar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Məhsul 1 Adı (AZ)</Label>
                      <Input
                        value={adminData.product1Name?.az || ''}
                        onChange={(e) => updateSiteData('product1Name.az', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Məhsul 1 Adı (EN)</Label>
                      <Input
                        value={adminData.product1Name?.en || ''}
                        onChange={(e) => updateSiteData('product1Name.en', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Məhsul 2 Adı (AZ)</Label>
                      <Input
                        value={adminData.product2Name?.az || ''}
                        onChange={(e) => updateSiteData('product2Name.az', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Məhsul 2 Adı (EN)</Label>
                      <Input
                        value={adminData.product2Name?.en || ''}
                        onChange={(e) => updateSiteData('product2Name.en', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Section */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Əlaqə Məlumatları</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Telefon</Label>
                      <Input
                        value={adminData.contactPhone || ''}
                        onChange={(e) => updateSiteData('contactPhone', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        value={adminData.contactEmail || ''}
                        onChange={(e) => updateSiteData('contactEmail', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={saveSiteData} className="w-full">
                  Yadda saxla
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Məqalələr</CardTitle>
                <Dialog open={showArticleForm} onOpenChange={setShowArticleForm}>
                  <DialogTrigger asChild>
                    <Button onClick={() => {
                      setEditingArticle(null);
                      setNewArticle({
                        title: { az: '', en: '' },
                        content: { az: '', en: '' },
                        image: ''
                      });
                      setSelectedImage(null);
                      setImagePreview('');
                    }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Yeni Məqalə
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingArticle ? 'Məqaləni Redaktə Et' : 'Yeni Məqalə Əlavə Et'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {/* Image Upload */}
                      <ImageUploader
                        onImageSelect={handleImageSelect}
                        currentPreview={imagePreview}
                        onRemove={handleImageRemove}
                      />

                      {/* Title */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Başlıq (AZ)</Label>
                          <Input
                            value={newArticle.title?.az || ''}
                            onChange={(e) => updateArticleField('title', { ...newArticle.title, az: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Başlıq (EN)</Label>
                          <Input
                            value={newArticle.title?.en || ''}
                            onChange={(e) => updateArticleField('title', { ...newArticle.title, en: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Məzmun (AZ)</Label>
                          <Textarea
                            value={newArticle.content?.az || ''}
                            onChange={(e) => updateArticleField('content', { ...newArticle.content, az: e.target.value })}
                            className="mt-1"
                            rows={10}
                          />
                        </div>
                        <div>
                          <Label>Məzmun (EN)</Label>
                          <Textarea
                            value={newArticle.content?.en || ''}
                            onChange={(e) => updateArticleField('content', { ...newArticle.content, en: e.target.value })}
                            className="mt-1"
                            rows={10}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowArticleForm(false)}>
                          Ləğv et
                        </Button>
                        <Button onClick={editingArticle ? handleUpdateArticle : handleAddArticle}>
                          {editingArticle ? 'Yenilə' : 'Əlavə et'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Şəkil</TableHead>
                      <TableHead>Başlıq</TableHead>
                      <TableHead>Tarix</TableHead>
                      <TableHead>Əməliyyatlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell>
                          {article.image ? (
                            <img
                              src={article.image}
                              alt={article.title[language]}
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                              <FileText className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{article.title[language]}</div>
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {article.content[language]?.substring(0, 100)}...
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(article.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditArticle(article)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteArticle(article.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Əlaqə Mesajları</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefon</TableHead>
                      <TableHead>Mesaj</TableHead>
                      <TableHead>Tarix</TableHead>
                      <TableHead>Əməliyyatlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(adminData.contactSubmissions || []).map((submission: ContactSubmission) => (
                      <TableRow key={submission.id}>
                        <TableCell>{submission.name}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.phone}</TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate">{submission.message}</div>
                        </TableCell>
                        <TableCell>
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteContactSubmission(submission.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tənzimləmələr</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Sessiya Məlumatları</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>İstifadəçi:</strong> {currentUser?.username}</p>
                    <p><strong>Rol:</strong> {currentUser?.role}</p>
                    <p><strong>Giriş vaxtı:</strong> {new Date().toLocaleString()}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Təhlükəsizlik</h3>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıxış et
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
