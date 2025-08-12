import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Articles = () => {
  const { t, language } = useLanguage();
  const { adminData } = useAdminData();
  const navigate = useNavigate();

  const articles = (adminData.articles || []).map(article => ({
    id: article.id,
    title: article.title[language],
    excerpt: article.excerpt[language],
    category: article.category[language],
    readTime: article.readTime[language],
    author: article.author[language],
    date: article.date,
    image: article.image || '📄',
    color: 'from-blue-400 to-blue-600',
  }));

  const handleArticleClick = (articleId: number) => {
    navigate(`/articles/${articleId}`);
  };

  return (
    <section id="articles" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {adminData.articlesTitle?.[language] || 'Məqalələr'}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {adminData.articlesTitle?.[language] || 'Məqalələr'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {adminData.articlesDescription?.[language] || 'Faydalı məqalələr'}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString(language === 'az' ? 'az-AZ' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleArticleClick(article.id)}
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

        {/* View All Button */}
        {articles.length > 0 && (
          <div className="text-center">
            <Button
              onClick={() => navigate('/articles')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {t('articles.viewAll')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
