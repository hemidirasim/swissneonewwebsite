import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { stripHtmlTags } from '@/lib/utils';

export const ArticlesContent = () => {
  const { language } = useLanguage();
  const { articles, loading } = useAdminData();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  console.log('📋 ArticlesContent - articles:', articles);
  console.log('📋 ArticlesContent - loading:', loading);

  const handleArticleClick = (articleId: string) => {
    console.log('📋 ArticlesContent - handleArticleClick - articleId:', articleId);
    console.log('📋 ArticlesContent - handleArticleClick - articleId type:', typeof articleId);
    const currentLang = lang || language;
    const targetUrl = `/${currentLang}/articles/${articleId}`;
    console.log('📋 ArticlesContent - handleArticleClick - navigating to:', targetUrl);
    navigate(targetUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-6 py-32">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-primary mr-3" />
            <Badge variant="outline">
              {language === 'az' ? 'Məqalələr' : 'Articles'}
            </Badge>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {language === 'az' ? 'Məqalələr və Məsləhətlər' : 'Articles and Advice'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'az' ? 'Körpə qidalandırması haqqında faydalı məqalələr' : 'Useful articles about baby nutrition'}
          </p>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <h2 className="text-2xl font-bold mb-2">
              {language === 'az' ? 'Məqalələr yüklənir...' : 'Loading articles...'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'az' ? 'Zəhmət olmasa gözləyin.' : 'Please wait.'}
            </p>
          </div>
        ) : articles && articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Article Image */}
                  <div className="relative h-48 overflow-hidden">
                    {article.image && article.image !== '📄' ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-4xl">
                        📄
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {stripHtmlTags(article.content || '').substring(0, 150)}...
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.created_at).toLocaleDateString(language === 'az' ? 'az-AZ' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleArticleClick(article.id.toString())}
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">
              {language === 'az' ? 'Məqalə tapılmadı' : 'No articles found'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'az' ? 'Hələ heç bir məqalə yoxdur.' : 'No articles available yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
