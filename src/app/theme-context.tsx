"use client";

import { createContext, useContext, useLayoutEffect, useState, useCallback, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Matches the default the server renders; the blocking script in layout.tsx
  // has already set the real value on <html> before this ever runs on the client.
  const [theme, setTheme] = useState<Theme>('light');
  const [hasSynced, setHasSynced] = useState(false);

  // Pick up the value the blocking script in layout.tsx already applied to
  // <html>, without touching the DOM/localStorage again on this first pass.
  useLayoutEffect(() => {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') {
      setTheme(attr);
    }
    setHasSynced(true);
  }, []);

  useLayoutEffect(() => {
    if (!hasSynced) return;
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, hasSynced]);

  const toggleTheme = useCallback(() => {
    setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
