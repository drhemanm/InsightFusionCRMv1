import React from 'react';
import { Bell, Users, Calendar } from 'lucide-react';
import { ToggleSwitch } from '../ui/ToggleSwitch';

interface PushSettings {
  newLeads: boolean;
  taskDue: boolean;
  meetingReminders: boolean;
  mentions: boolean;
}

interface Props {
  settings: PushSettings;
  onChange: (settings: PushSettings) => void;
}

export const PushNotifications: React.FC<Props> = ({ settings, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="text-purple-500" size={24} />
        <h2 className="text-xl font-semibold">Push Notifications</h2>
      </div>

      <div className="space-y-4">
        <ToggleSwitch
          icon={<Users className="text-gray-400" size={20} />}
          title="New Leads"
          description="Get notified when new leads are added"
          checked={settings.newLeads}
          onChange={(checked) => onChange({ ...settings, newLeads: checked })}
        />

        <ToggleSwitch
          icon={<Calendar className="text-gray-400" size={20} />}
          title="Meeting Reminders"
          description="Notifications for upcoming meetings"
          checked={settings.meetingReminders}
          onChange={(checked) => onChange({ ...settings, meetingReminders: checked })}
        />
      </div>
    </div>
  );
};