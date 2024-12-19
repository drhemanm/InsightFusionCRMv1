import { create } from 'zustand';

interface NotificationSettings {
  email: {
    dailyDigest: boolean;
    taskReminders: boolean;
    dealUpdates: boolean;
    teamActivity: boolean;
  };
  push: {
    newLeads: boolean;
    taskDue: boolean;
    meetingReminders: boolean;
    mentions: boolean;
  };
  alerts: {
    sound: boolean;
    desktop: boolean;
    mobile: boolean;
  };
}

interface NotificationStore {
  settings: NotificationSettings;
  updateSettings: (settings: NotificationSettings) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  settings: {
    email: {
      dailyDigest: true,
      taskReminders: true,
      dealUpdates: true,
      teamActivity: false
    },
    push: {
      newLeads: true,
      taskDue: true,
      meetingReminders: true,
      mentions: true
    },
    alerts: {
      sound: true,
      desktop: true,
      mobile: true
    }
  },
  updateSettings: (newSettings) => set({ settings: newSettings })
}));