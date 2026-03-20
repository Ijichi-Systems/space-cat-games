/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

interface AuthContextType {
  user: GoogleUser | null;
  setUser: (user: GoogleUser | null) => void;
  logout: () => void;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'scg_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<GoogleUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isConfigured = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

  const setUser = (u: GoogleUser | null) => {
    setUserState(u);
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isConfigured }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
