import { LanguageProvider } from '@/contexts/LanguageContext';
import { AdminDataProvider } from '@/contexts/AdminDataContext';
import { SwissAdminContent } from './SwissAdminContent';

const SwissAdmin = () => {
  return (
    <LanguageProvider>
      <AdminDataProvider>
        <SwissAdminContent />
      </AdminDataProvider>
    </LanguageProvider>
  );
};

export default SwissAdmin;