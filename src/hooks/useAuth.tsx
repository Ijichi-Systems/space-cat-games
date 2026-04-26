/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const NETLIFY_IDENTITY_URL = 'https://spacecatgame.netlify.app/.netlify/identity';

export interface NetlifyUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface AuthContextType {
  user: NetlifyUser | null;
  login: () => void;
  logout: () => void;
  isSupported: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<NetlifyUser | null>(null);

  const isSupported = 
    window.location.hostname === 'spacecatgame.netlify.app' || 
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  useEffect(() => {
    if (!isSupported) return;

    netlifyIdentity.init({ APIUrl: NETLIFY_IDENTITY_URL });

    const current = netlifyIdentity.currentUser() as NetlifyUser | null;
    if (current) setUser(current);

    netlifyIdentity.on('login', (u) => {
      setUser(u as NetlifyUser);
      netlifyIdentity.close();
    });

    netlifyIdentity.on('logout', () => {
      setUser(null);
    });

    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
    };
  }, []);

  const login = () => {
    if (isSupported) {
      netlifyIdentity.open('login');
    }
  };
  const logout = () => {
    if (isSupported) {
      netlifyIdentity.logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isSupported }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
