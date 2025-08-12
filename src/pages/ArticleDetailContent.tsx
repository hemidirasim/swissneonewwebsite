import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';

export const ArticleDetailContent = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { adminData } = useAdminData();
  const navigate = useNavigate();

  const article = adminData.articles?.find(a => a.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Məqalə tapılmadı</h2>
            <p className="text-muted-foreground mb-6">
              Axtardığınız məqalə mövcud deyil və ya silinib.
            </p>
            <Button onClick={() => navigate('/articles')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Məqalələrə qayıt
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/articles')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Məqalələrə qayıt
          </Button>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden">
          {/* Article Image */}
          {article.image && (
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={article.image}
                alt={article.title[language]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          <CardContent className="p-8">
            {/* Article Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {article.title[language]}
              </h1>

              <div className="text-sm text-muted-foreground">
                {new Date(article.date).toLocaleDateString(
                  language === 'az' ? 'az-AZ' : 'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }
                )}
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                {article.content[language]}
              </div>
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t">
              <Button
                variant="outline"
                onClick={() => navigate('/articles')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Bütün məqalələr
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
