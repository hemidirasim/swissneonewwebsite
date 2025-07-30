import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AdminData {
  // Hero Section - Bilingual
  heroTitle: {
    az: string;
    en: string;
  };
  heroSubtitle: {
    az: string;
    en: string;
  };
  heroDescription: {
    az: string;
    en: string;
  };
  
  // Products - Bilingual
  product1Name: {
    az: string;
    en: string;
  };
  product1Description: {
    az: string;
    en: string;
  };
  product2Name: {
    az: string;
    en: string;
  };
  product2Description: {
    az: string;
    en: string;
  };
  
  // Contact Info - Same for both languages
  contactPhone: string;
  contactEmail: string;
  contactAddress: {
    az: string;
    en: string;
  };
  
  // Company Info - Bilingual
  companyDescription: {
    az: string;
    en: string;
  };
  companyMission: {
    az: string;
    en: string;
  };
  companyQuality: {
    az: string;
    en: string;
  };
}

const defaultAdminData: AdminData = {
  heroTitle: {
    az: 'İsveçrə keyfiyyətində',
    en: 'Swiss Quality'
  },
  heroSubtitle: {
    az: 'Premium uşaq qidası',
    en: 'Premium Baby Formula'
  },
  heroDescription: {
    az: 'Swissneo — 100 ildən artıq İsveçrə təcrübəsi ilə hazırlanmış super premium uşaq qarışığı. Uşağınızın sağlam inkişafı və güclü immunitet üçün.',
    en: 'Swissneo — super premium baby formula crafted with over 100 years of Swiss expertise. For your baby\'s healthy development and strong immunity.'
  },
  
  product1Name: {
    az: 'Swissneo 1',
    en: 'Swissneo 1'
  },
  product1Description: {
    az: 'Doğulduğu gündən etibarən 6 ayadək olan körpələr üçün başlanğıc süd qarışığı',
    en: 'Starting infant milk formula for babies from birth to 6 months'
  },
  product2Name: {
    az: 'Swissneo 2',
    en: 'Swissneo 2'
  },
  product2Description: {
    az: '6-12 aylıq körpələr üçün növbəti mərhələ süd qarışığı',
    en: 'Follow-on milk formula for babies from 6 to 12 months'
  },
  
  contactPhone: '+994 XX XXX XX XX',
  contactEmail: 'info@swissneo.az',
  contactAddress: {
    az: 'Bakı, Azərbaycan',
    en: 'Baku, Azerbaijan'
  },
  
  companyDescription: {
    az: 'Swissneo — süd məhsulları sahəsində 100 ildən artıq təcrübəyə malik İsveçrənin super premium uşaq qidası markasıdır.',
    en: 'Swissneo is a super premium baby food brand from Switzerland with over 100 years of experience in dairy products.'
  },
  companyMission: {
    az: 'Keyfiyyətə önəm verən və uşaqlarına ən yaxşısını vermək istəyən Azərbaycan valideynlərinin artan tələbatını qarşılamaq.',
    en: 'To meet the growing demand of knowledgeable Azerbaijani parents who value quality and want to give their children the best.'
  },
  companyQuality: {
    az: 'İsveçrənin ən yüksək keyfiyyət standartları ilə istehsal olunan məhsullarımız uşağınızın təhlükəsizliyi üçün bütün sertifikatları daşıyır.',
    en: 'Our products manufactured with Switzerland\'s highest quality standards carry all certifications for your child\'s safety.'
  },
};

interface AdminDataContextType {
  adminData: AdminData;
  updateAdminData: (data: AdminData) => void;
  refreshAdminData: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminData, setAdminData] = useState<AdminData>(defaultAdminData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('swissneo_admin_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setAdminData(parsedData);
      } catch (error) {
        console.error('Error parsing admin data:', error);
        setAdminData(defaultAdminData);
      }
    } else {
      // If no saved data exists, save the default data
      localStorage.setItem('swissneo_admin_data', JSON.stringify(defaultAdminData));
      setAdminData(defaultAdminData);
    }
  }, []);

  // Listen for localStorage changes (when admin saves data)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedData = localStorage.getItem('swissneo_admin_data');
      if (savedData) {
        try {
          setAdminData(JSON.parse(savedData));
        } catch (error) {
          console.error('Error parsing admin data:', error);
        }
      }
    };

    // Listen for storage events from other tabs/windows
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('adminDataUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('adminDataUpdated', handleStorageChange);
    };
  }, []);

  const updateAdminData = (data: AdminData) => {
    setAdminData(data);
    localStorage.setItem('swissneo_admin_data', JSON.stringify(data));
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event('adminDataUpdated'));
  };

  const refreshAdminData = () => {
    const savedData = localStorage.getItem('swissneo_admin_data');
    if (savedData) {
      try {
        setAdminData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing admin data:', error);
      }
    }
  };

  return (
    <AdminDataContext.Provider value={{ adminData, updateAdminData, refreshAdminData }}>
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (context === undefined) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};