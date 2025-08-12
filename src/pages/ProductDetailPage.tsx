import { LanguageProvider } from '@/contexts/LanguageContext';
import { AdminDataProvider } from '@/contexts/AdminDataContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductDetail } from '@/components/ProductDetail';

const ProductDetailPage = () => {
  return (
    <LanguageProvider>
      <AdminDataProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <ProductDetail />
          </main>
          <Footer />
        </div>
      </AdminDataProvider>
    </LanguageProvider>
  );
};

export default ProductDetailPage;
