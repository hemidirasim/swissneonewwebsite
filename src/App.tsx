import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminDataProvider } from './contexts/AdminDataContext';
import Index from "./pages/Index";
import SwissAdmin from "./pages/SwissAdmin";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import InstructionsPage from "./pages/InstructionsPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Vercel deployment cache busting - latest version v2.2
const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LanguageProvider>
        <AdminDataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Redirect root to default language */}
              <Route path="/" element={<Navigate to="/az" replace />} />
              
              {/* Language-specific routes */}
              <Route path="/:lang" element={<Index />} />
              <Route path="/:lang/admin" element={<SwissAdmin />} />
              <Route path="/:lang/product/:productId" element={<ProductDetailPage />} />
              <Route path="/:lang/about" element={<AboutPage />} />
              <Route path="/:lang/contact" element={<ContactPage />} />
              <Route path="/:lang/products" element={<ProductsPage />} />
              <Route path="/:lang/instructions" element={<InstructionsPage />} />
              <Route path="/:lang/articles" element={<ArticlesPage />} />
              <Route path="/:lang/articles/:id" element={<ArticleDetailPage />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AdminDataProvider>
      </LanguageProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
