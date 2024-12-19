import React, { useState, useEffect } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { ReminderList } from './ReminderList';
import { reminderService, type Reminder } from '../../services/reminder/ReminderService';

export const ReminderManager: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const dueReminders = await reminderService.getDueReminders();
      setReminders(dueReminders);
    } catch (error) {
      console.error('Failed to load reminders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async (reminderId: string) => {
    try {
      await reminderService.completeReminder(reminderId);
      setReminders(reminders.filter(r => r.id !== reminderId));
    } catch (error) {
      console.error('Failed to complete reminder:', error);
    }
  };

  const handleSnooze = async (reminderId: string, days: number) => {
    try {
      await reminderService.snoozeReminder(reminderId, days);
      setReminders(reminders.filter(r => r.id !== reminderId));
    } catch (error) {
      console.error('Failed to snooze reminder:', error);
    }
  };

  const handleDismiss = async (reminderId: string) => {
    setReminders(reminders.filter(r => r.id !== reminderId));
  };

  if (isLoading) {
    return <div>Loading reminders...</div>;
  }

  return (
    <div className="space-y-6">
      <ReminderList
        reminders={reminders}
        onComplete={handleComplete}
        onSnooze={handleSnooze}
        onDismiss={handleDismiss}
      />
    </div>
  );
};