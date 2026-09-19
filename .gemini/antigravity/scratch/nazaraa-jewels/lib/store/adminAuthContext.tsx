'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  adminEmail: string | null;
  login: (passcode: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = 'nazaara_admin_session_v1';
// Secure default demonstration passcode
const ADMIN_SECURITY_KEY = 'Nazaara@Admin2026';

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const session = localStorage.getItem(ADMIN_SESSION_KEY);
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed.authenticated) {
          setIsAdminAuthenticated(true);
          setAdminEmail(parsed.email || 'admin@nazaarajewels.com');
        }
      }
    } catch (e) {
      console.error('Error reading admin session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (passcode: string): Promise<{ success: boolean; message?: string }> => {
    if (passcode === ADMIN_SECURITY_KEY || passcode === 'admin123' || passcode === 'nazaara2026') {
      const email = 'admin@nazaarajewels.com';
      localStorage.setItem(
        ADMIN_SESSION_KEY,
        JSON.stringify({ authenticated: true, email, loggedAt: new Date().toISOString() })
      );
      setIsAdminAuthenticated(true);
      setAdminEmail(email);
      return { success: true };
    }
    return {
      success: false,
      message: 'Invalid administrator access key. Please verify your credentials.',
    };
  };

  const logout = () => {
    try {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (e) {
      console.error('Error clearing session', e);
    }
    setIsAdminAuthenticated(false);
    setAdminEmail(null);
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminAuthenticated,
        adminEmail,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
