import React, { useState } from 'react';
import { EmailNotifications } from './notifications/EmailNotifications';
import { PushNotifications } from './notifications/PushNotifications';
import { AlertSettings } from './notifications/AlertSettings';
import { useNotificationStore } from '../../store/notificationStore';

export const NotificationsSettings: React.FC = () => {
  const { settings, updateSettings } = useNotificationStore();

  return (
    <div className="space-y-8">
      <EmailNotifications
        settings={settings.email}
        onChange={(emailSettings) => updateSettings({ ...settings, email: emailSettings })}
      />
      <PushNotifications
        settings={settings.push}
        onChange={(pushSettings) => updateSettings({ ...settings, push: pushSettings })}
      />
      <AlertSettings
        settings={settings.alerts}
        onChange={(alertSettings) => updateSettings({ ...settings, alerts: alertSettings })}
      />
    </div>
  );
};