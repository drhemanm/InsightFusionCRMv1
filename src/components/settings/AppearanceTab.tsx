import React from 'react';
import { Palette, Monitor, Sun, Moon, Layout } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const AppearanceTab: React.FC = () => {
  const { settings, updateSettings } = useTheme();

  const colors = [
    { id: 'blue', value: '#3B82F6', label: 'Blue' },
    { id: 'purple', value: '#8B5CF6', label: 'Purple' },
    { id: 'green', value: '#10B981', label: 'Green' },
    { id: 'red', value: '#EF4444', label: 'Red' }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'normal', label: 'Normal' },
    { value: 'large', label: 'Large' }
  ];

  const layouts = [
    { value: 'default', label: 'Default' },
    { value: 'compact', label: 'Compact' },
    { value: 'comfortable', label: 'Comfortable' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Appearance Settings</h2>

      <div className="space-y-6">
        {/* Theme Selection */}
        <div className="p-4 bg-primary border-color rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="accent-color" size={24} />
            <div>
              <h3 className="font-medium text-primary">Theme</h3>
              <p className="text-sm text-secondary">Choose your preferred theme</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => updateSettings({ theme: 'light' })}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 ${
                settings.theme === 'light'
                  ? 'border-accent bg-accent bg-opacity-10'
                  : 'border-color hover:border-accent'
              }`}
            >
              <Sun size={20} className="text-yellow-500" />
              <span className="font-medium">Light</span>
            </button>

            <button
              onClick={() => updateSettings({ theme: 'dark' })}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 ${
                settings.theme === 'dark'
                  ? 'border-accent bg-accent bg-opacity-10'
                  : 'border-color hover:border-accent'
              }`}
            >
              <Moon size={20} className="text-gray-500" />
              <span className="font-medium">Dark</span>
            </button>
          </div>
        </div>

        {/* Accent Color */}
        <div className="p-4 bg-primary border-color rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="accent-color" size={24} />
            <div>
              <h3 className="font-medium text-primary">Accent Color</h3>
              <p className="text-sm text-secondary">Choose your preferred accent color</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {colors.map(color => (
              <button
                key={color.id}
                onClick={() => updateSettings({ accentColor: color.value })}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 ${
                  settings.accentColor === color.value
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-color hover:border-accent'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-sm font-medium">{color.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="p-4 bg-primary border-color rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Layout className="accent-color" size={24} />
            <div>
              <h3 className="font-medium text-primary">Text Size</h3>
              <p className="text-sm text-secondary">Adjust the text size</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {fontSizes.map(size => (
              <button
                key={size.value}
                onClick={() => updateSettings({ fontSize: size.value as any })}
                className={`p-3 rounded-lg border-2 ${
                  settings.fontSize === size.value
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-color hover:border-accent'
                }`}
              >
                <span className="font-medium">{size.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Layout Density */}
        <div className="p-4 bg-primary border-color rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Layout className="accent-color" size={24} />
            <div>
              <h3 className="font-medium text-primary">Layout Density</h3>
              <p className="text-sm text-secondary">Choose your preferred layout spacing</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {layouts.map(layoutOption => (
              <button
                key={layoutOption.value}
                onClick={() => updateSettings({ layout: layoutOption.value as any })}
                className={`p-3 rounded-lg border-2 ${
                  settings.layout === layoutOption.value
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-color hover:border-accent'
                }`}
              >
                <span className="font-medium">{layoutOption.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};