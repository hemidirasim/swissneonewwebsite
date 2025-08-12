import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Baby, 
  Heart, 
  Clock, 
  ArrowRight,
  Leaf,
  Shield,
  Star,
  Users,
  Calendar
} from 'lucide-react';

export const Articles = () => {
  const { t, language } = useLanguage();
  const { articles, siteData } = useAdminData();
  const navigate = useNavigate();

  const processedArticles = articles.map(article => ({
    id: article.id,
    title: language === 'az' ? article.title_az : article.title_en,
    excerpt: language === 'az' ? article.excerpt_az : article.excerpt_en,
    category: language === 'az' ? article.category_az : article.category_en,
    readTime: language === 'az' ? article.read_time_az : article.read_time_en,
    author: language === 'az' ? article.author_az : article.author_en,
    date: article.created_at,
    image: '📄',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50'
  }));

  return (
    <section id="articles" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {siteData.articles?.title?.[language] || 'Məqalələr'}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {siteData.articles?.title?.[language] || 'Məqalələr'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {siteData.articles?.description?.[language] || 'Faydalı məqalələr'}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {processedArticles.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                {/* Article Image */}
                <div className={`${article.bgColor} p-8 text-center relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${article.color} opacity-10`}></div>
                  <div className="text-6xl mb-4 relative z-10">{article.image}</div>
                  <Badge variant="secondary" className="relative z-10">
                    {article.category}
                  </Badge>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform"
                    onClick={() => navigate(`/article/${article.id}`)}
                  >
                    {language === 'az' ? 'Oxu' : 'Read'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
