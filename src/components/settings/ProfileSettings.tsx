import React from 'react';
import { PersonalInfoForm } from './profile/PersonalInfoForm';
import { NotificationSettings } from './profile/NotificationSettings';
import { CommunicationPreferences } from './profile/CommunicationPreferences';
import { useAuthStore } from '../../store/authStore';

export const ProfileSettings: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PersonalInfoForm user={user} />
      <NotificationSettings />
      <CommunicationPreferences />
    </div>
  );
};