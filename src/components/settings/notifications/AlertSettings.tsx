import React from 'react';
import { AlertCircle, Bell, MessageSquare } from 'lucide-react';
import { ToggleSwitch } from '../ui/ToggleSwitch';

interface AlertSettings {
  sound: boolean;
  desktop: boolean;
  mobile: boolean;
}

interface Props {
  settings: AlertSettings;
  onChange: (settings: AlertSettings) => void;
}

export const AlertSettings: React.FC<Props> = ({ settings, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <AlertCircle className="text-yellow-500" size={24} />
        <h2 className="text-xl font-semibold">Alert Settings</h2>
      </div>

      <div className="space-y-4">
        <ToggleSwitch
          icon={<Bell className="text-gray-400" size={20} />}
          title="Sound Alerts"
          description="Play sound for important notifications"
          checked={settings.sound}
          onChange={(checked) => onChange({ ...settings, sound: checked })}
        />

        <ToggleSwitch
          icon={<MessageSquare className="text-gray-400" size={20} />}
          title="Desktop Notifications"
          description="Show notifications on your desktop"
          checked={settings.desktop}
          onChange={(checked) => onChange({ ...settings, desktop: checked })}
        />
      </div>
    </div>
  );
};