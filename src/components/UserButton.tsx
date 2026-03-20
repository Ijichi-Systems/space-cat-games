/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function UserButton() {
  const { user, login, logout } = useAuth();
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

  if (!user) {
    return (
      <button
        onClick={login}
        style={{
          padding: '6px 14px',
          background: '#4285F4',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          whiteSpace: 'nowrap',
        }}
      >
        Sign in
      </button>
    );
  }

  const name = user.user_metadata?.full_name || user.email;
  const avatar = user.user_metadata?.avatar_url;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        title={name}
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
          color: '#fff',
          fontSize: '0.85rem',
          fontWeight: '600',
        }}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            width={30}
            height={30}
            style={{ borderRadius: '50%', display: 'block' }}
            referrerPolicy="no-referrer"
          />
        ) : (
          <span style={{ lineHeight: 1 }}>
            {name.charAt(0).toUpperCase()}
          </span>
        )}
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
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontWeight: '600', color: '#eee', fontSize: '0.9rem' }}>{name}</div>
            <div style={{ color: '#888', fontSize: '0.78rem' }}>{user.email}</div>
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
