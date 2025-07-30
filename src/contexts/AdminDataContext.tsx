import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AdminData {
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // Products
  product1Name: string;
  product1Description: string;
  product2Name: string;
  product2Description: string;
  
  // Contact Info
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  
  // Company Info
  companyDescription: string;
  companyMission: string;
  companyQuality: string;
}

const defaultAdminData: AdminData = {
  heroTitle: 'İsveçrə keyfiyyətində',
  heroSubtitle: 'Premium uşaq qidası',
  heroDescription: 'Swissneo — 100 ildən artıq İsveçrə təcrübəsi ilə hazırlanmış super premium uşaq qarışığı. Uşağınızın sağlam inkişafı və güclü immunitet üçün.',
  
  product1Name: 'Swissneo 1',
  product1Description: 'Doğulduğu gündən etibarən 6 ayadək olan körpələr üçün başlanğıc süd qarışığı',
  product2Name: 'Swissneo 2',
  product2Description: '6-12 aylıq körpələr üçün növbəti mərhələ süd qarışığı',
  
  contactPhone: '+994 XX XXX XX XX',
  contactEmail: 'info@swissneo.az',
  contactAddress: 'Bakı, Azərbaycan',
  
  companyDescription: 'Swissneo — süd məhsulları sahəsində 100 ildən artıq təcrübəyə malik İsveçrənin super premium uşaq qidası markasıdır.',
  companyMission: 'Keyfiyyətə önəm verən və uşaqlarına ən yaxşısını vermək istəyən Azərbaycan valideynlərinin artan tələbatını qarşılamaq.',
  companyQuality: 'İsveçrənin ən yüksək keyfiyyət standartları ilə istehsal olunan məhsullarımız uşağınızın təhlükəsizliyi üçün bütün sertifikatları daşıyır.',
};

interface AdminDataContextType {
  adminData: AdminData;
  updateAdminData: (data: AdminData) => void;
  refreshAdminData: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminData, setAdminData] = useState<AdminData>(defaultAdminData);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('swissneo_admin_data');
    if (savedData) {
      try {
        setAdminData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing admin data:', error);
        setAdminData(defaultAdminData);
      }
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