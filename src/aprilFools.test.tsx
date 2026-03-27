/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Manual mock for localStorage
const store = {};
const mockLocalStorage = {
  getItem: vi.fn((key) => store[key] || null),
  setItem: vi.fn((key, value) => { store[key] = value.toString(); }),
  removeItem: vi.fn((key) => { delete store[key]; }),
  clear: vi.fn(() => { for (const key in store) delete store[key]; })
};

vi.stubGlobal('localStorage', mockLocalStorage);

import { render } from '@testing-library/react';
import React from 'react';
import { SettingsProvider, useSettings } from './hooks/useSettings';

// Mock component to trigger applySettings
const TestComponent = () => {
  const { settings, updateSettings } = useSettings();
  return (
    <div>
      <button onClick={() => updateSettings({ testAprilFools: true })}>Enable Test</button>
      <button onClick={() => updateSettings({ testAprilFools: false })}>Disable Test</button>
      <div id="status">{settings.testAprilFools ? 'enabled' : 'disabled'}</div>
    </div>
  );
};

describe('April Fools Font Override', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    const style = document.getElementById('scg-april-fools');
    if (style) style.remove();
    localStorage.clear();
  });

  it('should not apply Comic Sans by default on a normal day', () => {
    const date = new Date(2026, 2, 27); // March 27, 2026
    vi.setSystemTime(date);

    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    const style = document.getElementById('scg-april-fools');
    expect(style).toBeNull();
  });

  it('should apply Comic Sans on April 1st', () => {
    const date = new Date(2026, 3, 1); // April 1, 2026 (Month is 0-indexed, so 3 is April)
    vi.setSystemTime(date);

    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    const style = document.getElementById('scg-april-fools');
    expect(style).not.toBeNull();
    expect(style?.textContent).toContain('Comic Sans MS');
  });

  it('should apply Comic Sans when testAprilFools is enabled even on a normal day', () => {
    const date = new Date(2026, 2, 27); // March 27, 2026
    vi.setSystemTime(date);

    const { getByText } = render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    // Initial state: no style
    expect(document.getElementById('scg-april-fools')).toBeNull();

    // Enable test flag
    getByText('Enable Test').click();

    const style = document.getElementById('scg-april-fools');
    expect(style).not.toBeNull();
    expect(style?.textContent).toContain('Comic Sans MS');

    // Disable test flag
    getByText('Disable Test').click();
    expect(document.getElementById('scg-april-fools')).toBeNull();
  });
});
