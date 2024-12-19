import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themes } from '../config/themes';
import type { ThemeType, ThemeConfig } from '../types/themes';

interface ThemeStore {
  currentTheme: ThemeType;
  themes: Record<string, ThemeConfig>;
  setTheme: (theme: ThemeType) => void;
  getTerminology: (key: keyof ThemeConfig['terminology']) => string;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      currentTheme: 'space',
      themes,
      setTheme: (theme) => {
        set({ currentTheme: theme });
        // Apply theme immediately
        document.documentElement.style.setProperty(
          '--primary-color',
          themes[theme].colors.primary
        );
        document.documentElement.style.setProperty(
          '--secondary-color',
          themes[theme].colors.secondary
        );
        document.documentElement.style.setProperty(
          '--accent-color',
          themes[theme].colors.accent
        );
        document.documentElement.style.setProperty(
          '--background-color',
          themes[theme].colors.background
        );
        document.body.className = `theme-${theme}`;
      },
      getTerminology: (key) => {
        const { currentTheme, themes } = get();
        return themes[currentTheme].terminology[key];
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);