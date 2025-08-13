// Types
export interface Admin {
  id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Login function
export async function loginAdmin(credentials: LoginCredentials): Promise<Admin> {
  try {
    console.log('🔐 Attempting admin login...');
    
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Login failed');
    }

    console.log('✅ Admin login successful:', result.data.username);
    return result.data;
  } catch (error) {
    console.error('❌ Admin login error:', error);
    throw error;
  }
}

// Logout function
export function logoutAdmin(): void {
  // Clear any stored admin data
  localStorage.removeItem('adminData');
  localStorage.removeItem('isLoggedIn');
  console.log('🔓 Admin logged out');
}

// Check if admin is logged in
export function isAdminLoggedIn(): boolean {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn === 'true';
}

// Get stored admin data
export function getStoredAdminData(): Admin | null {
  const adminData = localStorage.getItem('adminData');
  return adminData ? JSON.parse(adminData) : null;
}

// Store admin data
export function storeAdminData(admin: Admin): void {
  localStorage.setItem('adminData', JSON.stringify(admin));
  localStorage.setItem('isLoggedIn', 'true');
}
