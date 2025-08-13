import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Article } from '@/services/prismaService';
import { uploadImageWithFallback, validateImage } from '@/services/imageService';
import { AdminLogin } from '@/components/AdminLogin';
import { isAdminLoggedIn, getStoredAdminData, logoutAdmin } from '@/services/authService';
import { RichTextEditor } from '@/components/RichTextEditor';
import type { Admin } from '@/services/authService';
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

// Predefined categories
const CATEGORIES = [
  { value: 'nutrition', label: 'Qidalanma' },
  { value: 'health', label: 'Sağlamlıq' },
  { value: 'development', label: 'İnkişaf' },
  { value: 'tips', label: 'Məsləhətlər' },
  { value: 'feeding', label: 'Qidalandırma' },
  { value: 'immunity', label: 'İmmunitet' },
  { value: 'growth', label: 'Böyümə' },
  { value: 'general', label: 'Ümumi' }
];

export const SwissAdminContent = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { articles, addArticle, updateArticle, deleteArticle, loading } = useAdminData();
  
  // Debug log for articles
  useEffect(() => {
    console.log('📋 Admin panel: Məqalələr yükləndi:', articles);
    console.log('📋 Admin panel: Loading status:', loading);
  }, [articles, loading]);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<Admin | null>(null);
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

  // Check authentication on mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    if (isAdminLoggedIn()) {
      const adminData = getStoredAdminData();
      if (adminData) {
        setIsLoggedIn(true);
        setCurrentUser(adminData);
      }
    }
  };

  const handleLoginSuccess = (admin: Admin) => {
    setIsLoggedIn(true);
    setCurrentUser(admin);
    toast({
      title: "Giriş uğurlu!",
      description: `Xoş gəlmisiniz, ${admin.username}!`,
    });
  };

  const handleLogout = () => {
    logoutAdmin();
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
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setImagePreview('');
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
      console.log('🔄 Admin panel: Yeni məqalə əlavə edilir...');
      console.log('📝 Yeni məqalə məlumatları:', newArticle);
      
      let imageUrl = '';
      
      if (selectedImage) {
        toast({
          title: "Şəkil yüklənir",
          description: "Şəkil Vercel Blob Storage-a yüklənir...",
        });
        
        // Compress image to reduce upload size
        const { compressImage } = await import('@/services/imageService');
        const compressedImage = await compressImage(selectedImage, 1200); // Max 1200px
        imageUrl = await uploadImageWithFallback(compressedImage);
        
        console.log('🖼️ Şəkil yükləndi:', imageUrl);
      }

      const articleData = {
        title: newArticle.title,
        content: newArticle.content,
        image: imageUrl,
        category: newArticle.category
      };

      console.log('📤 Remote databazaya göndərilən məlumatlar:', articleData);
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
        description: "Məqalə uğurla əlavə edildi.",
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
    if (!editingArticle || !newArticle.title || !newArticle.content || !newArticle.category) {
      toast({
        title: "Xəta!",
        description: "Başlıq, məzmun və kateqoriya məcburidir.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      console.log('🔄 Admin panel: Məqalə yenilənir...');
      console.log('📝 Yenilənəcək məqalə ID:', editingArticle.id);
      console.log('📝 Yeni məlumatlar:', newArticle);
      
      let imageUrl = editingArticle.image || '';
      
      if (selectedImage) {
        toast({
          title: "Şəkil yüklənir",
          description: "Şəkil Vercel Blob Storage-a yüklənir...",
        });
        
        // Compress image to reduce upload size
        const { compressImage } = await import('@/services/imageService');
        const compressedImage = await compressImage(selectedImage, 1200); // Max 1200px
        imageUrl = await uploadImageWithFallback(compressedImage);
        
        console.log('🖼️ Yeni şəkil yükləndi:', imageUrl);
      }

      const updates = {
        title: newArticle.title,
        content: newArticle.content,
        image: imageUrl,
        category: newArticle.category
      };

      console.log('📤 Remote databazaya göndərilən yeniləmələr:', updates);
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
      image: article.image,
      category: article.category
    });
    setImagePreview(article.image || '');
    setShowArticleForm(true);
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Bu məqaləni silmək istədiyinizə əminsiniz?')) {
      console.log('🗑️ Admin panel: Məqalə silinir:', id);
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

  const getCategoryLabel = (value: string) => {
    const category = CATEGORIES.find(cat => cat.value === value);
    return category ? category.label : value;
  };

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
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
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingArticle ? 'Məqaləni Redaktə Et' : 'Yeni Məqalə Əlavə Et'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
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
                      <Select 
                        value={newArticle.category || ''} 
                        onValueChange={(value) => updateArticleField('category', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Kateqoriya seçin..." />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Content */}
                    <div>
                      <Label>Məzmun</Label>
                      <div className="mt-1">
                        <RichTextEditor
                          value={newArticle.content || ''}
                          onChange={(value) => updateArticleField('content', value)}
                          placeholder="Məqalə məzmunu..."
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
                  <TableHead>Kateqoriya</TableHead>
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
                          alt={article.title}
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
                        <div className="font-medium">{article.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {article.content?.replace(/<[^>]*>/g, '').substring(0, 100)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getCategoryLabel(article.category)}
                      </span>
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
