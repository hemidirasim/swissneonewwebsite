import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import databaseService, { Article } from '@/services/databaseService';
import { 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  Upload,
  X,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

export const SwissAdminContent = () => {
  const { language } = useLanguage();
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
  const [isUploading, setIsUploading] = useState(false);

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

  // Simple image upload with base64 fallback
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Xəta!",
        description: "Yalnız şəkil faylları yükləyə bilərsiniz.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Xəta!",
        description: "Şəkil ölçüsü 5MB-dan çox ola bilməz.",
        variant: "destructive",
      });
      return;
    }

    setSelectedImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setImagePreview('');
    setNewArticle(prev => ({ ...prev, image: '' }));
  };

  const uploadImageToVercel = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      console.log('Image uploaded to Vercel Blob:', result.url);
      return result.url;
    } catch (error) {
      console.error('Vercel Blob upload failed:', error);
      throw error;
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddArticle = async () => {
    if (!newArticle.title?.az || !newArticle.content?.az) {
      toast({
        title: "Xəta!",
        description: "Başlıq və məzmun məcburidir.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      let imageUrl = '';
      
      if (selectedImage) {
        try {
          // Try Vercel Blob first
          imageUrl = await uploadImageToVercel(selectedImage);
        } catch (error) {
          console.log('Vercel Blob failed, using base64 fallback');
          // Fallback to base64
          imageUrl = await convertToBase64(selectedImage);
        }
      }

      const articleData = {
        title: newArticle.title,
        content: newArticle.content,
        image: imageUrl,
        date: new Date().toISOString()
      } as Omit<Article, 'id'>;

      databaseService.addArticle(articleData);
      
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
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateArticle = async () => {
    if (!editingArticle) return;

    if (!newArticle.title?.az || !newArticle.content?.az) {
      toast({
        title: "Xəta!",
        description: "Başlıq və məzmun məcburidir.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      let imageUrl = editingArticle.image || '';
      
      if (selectedImage) {
        try {
          // Try Vercel Blob first
          imageUrl = await uploadImageToVercel(selectedImage);
        } catch (error) {
          console.log('Vercel Blob failed, using base64 fallback');
          // Fallback to base64
          imageUrl = await convertToBase64(selectedImage);
        }
      }

      const updates = {
        title: newArticle.title,
        content: newArticle.content,
        image: imageUrl
      };

      databaseService.updateArticle(editingArticle.id, updates);
      
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
    } finally {
      setIsUploading(false);
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

  const handleDeleteArticle = (id: number) => {
    if (confirm('Bu məqaləni silmək istədiyinizə əminsiniz?')) {
      databaseService.deleteArticle(id);
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
              <FileText className="w-8 h-8 text-blue-600" />
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
                  <div>
                    <Label>Şəkil</Label>
                    <div className="mt-2">
                      {imagePreview ? (
                        <div className="relative inline-block">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2"
                            onClick={handleImageRemove}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <Label htmlFor="image-upload" className="cursor-pointer">
                            <span className="text-blue-600 hover:text-blue-500">
                              Şəkil seçin
                            </span>
                          </Label>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Başlıq (AZ)</Label>
                      <Input
                        value={newArticle.title?.az || ''}
                        onChange={(e) => updateArticleField('title', { ...newArticle.title, az: e.target.value })}
                        className="mt-1"
                        placeholder="Məqalə başlığı..."
                      />
                    </div>
                    <div>
                      <Label>Başlıq (EN)</Label>
                      <Input
                        value={newArticle.title?.en || ''}
                        onChange={(e) => updateArticleField('title', { ...newArticle.title, en: e.target.value })}
                        className="mt-1"
                        placeholder="Article title..."
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
                        placeholder="Məqalə məzmunu..."
                      />
                    </div>
                    <div>
                      <Label>Məzmun (EN)</Label>
                      <Textarea
                        value={newArticle.content?.en || ''}
                        onChange={(e) => updateArticleField('content', { ...newArticle.content, en: e.target.value })}
                        className="mt-1"
                        rows={10}
                        placeholder="Article content..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowArticleForm(false)}>
                      Ləğv et
                    </Button>
                    <Button 
                      onClick={editingArticle ? handleUpdateArticle : handleAddArticle}
                      disabled={isUploading}
                    >
                      {isUploading ? 'Yüklənir...' : (editingArticle ? 'Yenilə' : 'Əlavə et')}
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
                          <ImageIcon className="w-6 h-6 text-gray-400" />
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
      </div>
    </div>
  );
};
