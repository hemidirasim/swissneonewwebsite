import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Vercel deployment cache busting - latest version v2.1
const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AdminDataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<SwissAdmin />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/instructions" element={<InstructionsPage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/articles/:id" element={<ArticleDetailPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminDataProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
