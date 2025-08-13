import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminDataProvider } from './contexts/AdminDataContext';
import { Toaster } from './components/ui/toaster';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Index from './pages/Index';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ContactPage from './pages/ContactPage';
import InstructionsPage from './pages/InstructionsPage';
import SwissAdmin from './pages/SwissAdmin';
import NotFound from './pages/NotFound';
import './App.css';

// Vercel deployment cache busting - latest version
function App() {
  return (
    <LanguageProvider>
      <AdminDataProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/articles/:id" element={<ArticleDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/instructions" element={<InstructionsPage />} />
                <Route path="/admin" element={<SwissAdmin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      </AdminDataProvider>
    </LanguageProvider>
  );
}

export default App;
