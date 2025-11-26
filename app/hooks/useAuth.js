'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      console.log('🔍 Checking auth status...');
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      console.log('Auth check result:', data);
      setUser(data.user);
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      console.log('🔐 Login attempt:', credentials);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Login API response:', result);
      
      if (result.success) {
        setUser(result.user);
        // منتظر بمانید و دوباره وضعیت را چک کنید
        await checkAuth();
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'خطا در ارتباط با سرور' };
    }
  };

  const register = async (userData) => {
    try {
      console.log('📝 Register attempt:', userData);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Register API response:', result);
      
      if (result.success) {
        setUser(result.user);
        // منتظر بمانید و دوباره وضعیت را چک کنید
        await checkAuth();
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'خطا در ثبت‌نام' };
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Logging out...');
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    console.log('🔄 AuthProvider mounted');
    checkAuth();
  }, []);

  const value = {
    user, 
    loading, 
    login, 
    register, 
    logout, 
    checkAuth 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}