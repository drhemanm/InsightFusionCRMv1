import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import { Palette } from 'lucide-react';
import type { ThemeType } from '../../types/themes';

export const ThemeSelector: React.FC = () => {
  const { currentTheme, themes, setTheme } = useThemeStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Palette className="text-purple-500" size={24} />
        <h2 className="text-xl font-semibold">Theme Selection</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(themes).map(([key, theme]) => {
          const Icon = theme.icon;
          const isSelected = currentTheme === key;

          return (
            <button
              key={key}
              onClick={() => setTheme(key as ThemeType)}
              className={`p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon
                  size={24}
                  className={isSelected ? 'text-blue-500' : 'text-gray-500'}
                />
                <h3 className="font-medium">{theme.name}</h3>
              </div>
              <p className="text-sm text-gray-600 text-left">
                {theme.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};