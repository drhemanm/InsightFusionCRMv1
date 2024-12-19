import type { IconProps } from 'lucide-react';

export type ThemeType = 'space' | 'medieval' | 'sports' | 'nature';

export interface ThemeConfig {
  name: string;
  description: string;
  icon: React.ComponentType<IconProps>;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  achievements: {
    icons: Record<string, string>;
    titles: Record<string, string>;
    descriptions: Record<string, string>;
  };
  terminology: {
    points: string;
    level: string;
    achievement: string;
    challenge: string;
    reward: string;
  };
}