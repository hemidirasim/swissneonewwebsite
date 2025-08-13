import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar,
  BookOpen,
  Heart,
  Baby,
  Shield,
  Brain,
  Leaf
} from 'lucide-react';

export const ArticleDetail = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { articles, loading } = useAdminData();

  // Səhifə yükləndikdə yuxarıdan başla
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  // Find the current article
  const article = articles.find(a => a.id === articleId);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <p>Məqalə yüklənir...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Məqalə tapılmadı</h1>
          <Button onClick={() => navigate('/articles')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Məqalələrə qayıt
          </Button>
        </div>
      </div>
    );
  }

  // Calculate read time based on content length
  const wordCount = article.content.split(' ').length;
  const readTime = Math.ceil(wordCount / 200); // Average reading speed

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-20">
        {/* Back Button */}
        <div className="mb-8 max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/articles')}
            className="mb-4 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Məqalələrə qayıt
          </Button>
        </div>

        {/* Article Header */}
        <Card className="mb-8 overflow-hidden max-w-4xl mx-auto">
          <CardContent className="p-0">
            {/* Article Image */}
            {article.image && (
              <div className="relative h-64 md:h-96 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}

            {/* Article Info */}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {article.category}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {readTime} dəq oxuma
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {article.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.created_at).toLocaleDateString(language === 'az' ? 'az-AZ' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {wordCount} söz
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6 md:p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </CardContent>
        </Card>

        {/* Related Articles */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Əlaqəli məqalələr</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles
              .filter(a => a.id !== articleId && a.category === article.category)
              .slice(0, 3)
              .map((relatedArticle) => (
                <Card key={relatedArticle.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/articles/${relatedArticle.id}`)}>
                  <CardContent className="p-4">
                    {relatedArticle.image && (
                      <div className="h-32 mb-4 overflow-hidden rounded">
                        <img
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedArticle.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {relatedArticle.content.substring(0, 100)}...
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
