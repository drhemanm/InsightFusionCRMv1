import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

export const SettingsButton: React.FC = () => {
  return (
    <Link
      to="/settings"
      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
      title="Settings"
    >
      <Settings size={20} />
      <span className="font-medium">Settings</span>
    </Link>
  );
};