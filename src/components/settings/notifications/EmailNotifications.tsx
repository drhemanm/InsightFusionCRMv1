import React from 'react';
import { Mail, Clock, AlertCircle, DollarSign } from 'lucide-react';
import { ToggleSwitch } from '../ui/ToggleSwitch';

interface EmailSettings {
  dailyDigest: boolean;
  taskReminders: boolean;
  dealUpdates: boolean;
  teamActivity: boolean;
}

interface Props {
  settings: EmailSettings;
  onChange: (settings: EmailSettings) => void;
}

export const EmailNotifications: React.FC<Props> = ({ settings, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">Email Notifications</h2>
      </div>

      <div className="space-y-4">
        <ToggleSwitch
          icon={<Clock className="text-gray-400" size={20} />}
          title="Daily Digest"
          description="Receive a daily summary of activities"
          checked={settings.dailyDigest}
          onChange={(checked) => onChange({ ...settings, dailyDigest: checked })}
        />

        <ToggleSwitch
          icon={<AlertCircle className="text-gray-400" size={20} />}
          title="Task Reminders"
          description="Get notified about upcoming and overdue tasks"
          checked={settings.taskReminders}
          onChange={(checked) => onChange({ ...settings, taskReminders: checked })}
        />

        <ToggleSwitch
          icon={<DollarSign className="text-gray-400" size={20} />}
          title="Deal Updates"
          description="Notifications about deal status changes"
          checked={settings.dealUpdates}
          onChange={(checked) => onChange({ ...settings, dealUpdates: checked })}
        />
      </div>
    </div>
  );
};