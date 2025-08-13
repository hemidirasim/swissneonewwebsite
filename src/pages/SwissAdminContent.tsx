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
import { useAdminData } from '@/contexts/AdminDataContext';
import { Article } from '@/services/databaseService';
import { uploadImageWithFallback, validateImage } from '@/services/imageService';
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
  const { articles, addArticle, updateArticle, deleteArticle, loading } = useAdminData();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: '',
    content: '',
    image: '',
    category: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  // Check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    // Simple admin authentication
    const session = localStorage.getItem('swissneo-admin-session');
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        const now = new Date();
        const expiresAt = new Date(sessionData.expiresAt);
        
        if (now < expiresAt) {
          setIsLoggedIn(true);
          setCurrentUser(sessionData.user);
        } else {
          localStorage.removeItem('swissneo-admin-session');
        }
      } catch (error) {
        localStorage.removeItem('swissneo-admin-session');
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      // Simple admin authentication
      if (username === 'admin' && password === 'swissneo2024') {
        const user = {
          id: 1,
          username: 'admin',
          role: 'admin'
        };
        
        const session = {
          user,
          loginTime: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
        };
        
        localStorage.setItem('swissneo-admin-session', JSON.stringify(session));
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
    localStorage.removeItem('swissneo-admin-session');
    setIsLoggedIn(false);
    setCurrentUser(null);
    toast({
      title: "Çıxış edildi",
      description: "Təhlükəsiz şəkildə çıxış etdiniz.",
    });
  };



  // Image upload with validation
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImage(file);
    if (!validation.isValid) {
      toast({
        title: "Xəta!",
        description: validation.error || "Şəkil yüklənərkən xəta baş verdi.",
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



  const handleAddArticle = async () => {
    if (!newArticle.title || !newArticle.content || !newArticle.category) {
      toast({
        title: "Xəta!",
        description: "Başlıq, məzmun və kateqoriya məcburidir.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      let imageUrl = '';
      
      if (selectedImage) {
        const isDevelopment = import.meta.env.DEV;
        if (isDevelopment) {
          toast({
            title: "Development Mode",
            description: "Şəkil base64 formatında saxlanılır. Production-da Vercel Blob-a yüklənəcək.",
          });
        }
        
        imageUrl = await uploadImageWithFallback(selectedImage);
      }

      const articleData = {
        title: newArticle.title,
        content: newArticle.content,
        image: imageUrl || 'https://via.placeholder.com/400x300?text=No+Image',
        category: newArticle.category
      };

      await addArticle(articleData);
      
      setNewArticle({
        title: '',
        content: '',
        image: '',
        category: ''
      });
      setSelectedImage(null);
      setImagePreview('');
      setShowArticleForm(false);
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

    if (!newArticle.title || !newArticle.content) {
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
        const isDevelopment = import.meta.env.DEV;
        if (isDevelopment) {
          toast({
            title: "Development Mode",
            description: "Şəkil base64 formatında saxlanılır. Production-da Vercel Blob-a yüklənəcək.",
          });
        }
        
        imageUrl = await uploadImageWithFallback(selectedImage);
      }

      const updates = {
        title: newArticle.title,
        content: newArticle.content,
        image: imageUrl
      };

      updateArticle(editingArticle.id, updates);
      
      setEditingArticle(null);
      setNewArticle({
        title: '',
        content: '',
        image: '',
        category: ''
      });
      setSelectedImage(null);
      setImagePreview('');
      setShowArticleForm(false);
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

  const handleDeleteArticle = (id: string) => {
    if (confirm('Bu məqaləni silmək istədiyinizə əminsiniz?')) {
      deleteArticle(id);
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
                      title: '',
                      content: '',
                      image: '',
                      category: ''
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
                  <div>
                    <Label>Başlıq</Label>
                    <Input
                      value={newArticle.title || ''}
                      onChange={(e) => updateArticleField('title', e.target.value)}
                      className="mt-1"
                      placeholder="Məqalə başlığı..."
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <Label>Kateqoriya</Label>
                    <Input
                      value={newArticle.category || ''}
                      onChange={(e) => updateArticleField('category', e.target.value)}
                      className="mt-1"
                      placeholder="Məqalə kateqoriyası..."
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <Label>Məzmun</Label>
                    <Textarea
                      value={newArticle.content || ''}
                      onChange={(e) => updateArticleField('content', e.target.value)}
                      className="mt-1"
                      rows={10}
                      placeholder="Məqalə məzmunu..."
                    />
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
                                              {new Date(article.created_at).toLocaleDateString()}
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
