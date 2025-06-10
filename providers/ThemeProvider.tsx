'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Set dark theme as default
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark"
      value={{ light: 'light', dark: 'dark' }}
    >
      {children}
    </NextThemesProvider>
  );
}