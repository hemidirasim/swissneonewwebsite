import { LanguageProvider } from '@/contexts/LanguageContext';
import { AdminDataProvider } from '@/contexts/AdminDataContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Products } from '@/components/Products';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <AdminDataProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Hero />
            <Products />
            <About />
            <Contact />
          </main>
          <Footer />
        </div>
      </AdminDataProvider>
    </LanguageProvider>
  );
};

export default Index;
