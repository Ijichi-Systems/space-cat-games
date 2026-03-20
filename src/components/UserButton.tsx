/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../hooks/useAuth';

function LoginButton() {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch user info');
        const info = await res.json();
        setUser({
          name: info.name,
          email: info.email,
          picture: info.picture,
          sub: info.sub,
        });
      } catch (err) {
        console.error('Google login error:', err);
      } finally {
        setLoading(false);
      }
    },
    onError: (err) => {
      console.error('Google login failed:', err);
      setLoading(false);
    },
  });

  return (
    <button
      onClick={() => { setLoading(true); login(); }}
      disabled={loading}
      style={{
        padding: '6px 14px',
        background: '#4285F4',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: loading ? 'wait' : 'pointer',
        fontSize: '0.85rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        whiteSpace: 'nowrap',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#fff"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#fff" fillOpacity=".85"/>
        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#fff" fillOpacity=".7"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#fff" fillOpacity=".55"/>
      </svg>
      {loading ? 'Signing in…' : 'Sign in'}
    </button>
  );
}

function ProfileMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!user) return null;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: 'none',
          border: '2px solid #4285F4',
          borderRadius: '50%',
          padding: '0',
          cursor: 'pointer',
          width: '34px',
          height: '34px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title={user.name}
      >
        <img
          src={user.picture}
          alt={user.name}
          width={30}
          height={30}
          style={{ borderRadius: '50%', display: 'block' }}
          referrerPolicy="no-referrer"
        />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '42px',
          background: '#1a1a2e',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '12px 16px',
          minWidth: '200px',
          zIndex: 9999,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <img
              src={user.picture}
              alt={user.name}
              width={40}
              height={40}
              style={{ borderRadius: '50%' }}
              referrerPolicy="no-referrer"
            />
            <div>
              <div style={{ fontWeight: '600', color: '#eee', fontSize: '0.9rem' }}>{user.name}</div>
              <div style={{ color: '#888', fontSize: '0.78rem' }}>{user.email}</div>
            </div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '0 0 10px' }} />
          <button
            onClick={() => { logout(); setOpen(false); }}
            style={{
              background: 'none',
              border: '1px solid #c0392b',
              color: '#e74c3c',
              padding: '5px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.82rem',
              width: '100%',
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default function UserButton() {
  const { user, isConfigured } = useAuth();
  console.log("[UserButton] isConfigured:", isConfigured, "| user:", user?.email ?? null);

  if (!isConfigured) return null;

  return user ? <ProfileMenu /> : <LoginButton />;
}
