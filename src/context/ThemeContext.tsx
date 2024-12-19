import React, { createContext, useContext, useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';

interface ThemeContextType {
  currentTheme: string;
  updateTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTheme, themes, setTheme } = useThemeStore();

  useEffect(() => {
    // Apply theme to document root
    const theme = themes[currentTheme];
    if (theme) {
      document.documentElement.style.setProperty('--primary-color', theme.colors.primary);
      document.documentElement.style.setProperty('--secondary-color', theme.colors.secondary);
      document.documentElement.style.setProperty('--accent-color', theme.colors.accent);
      document.documentElement.style.setProperty('--background-color', theme.colors.background);
      
      // Add theme class to body
      document.body.className = `theme-${currentTheme}`;
    }
  }, [currentTheme, themes]);

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      updateTheme: setTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};