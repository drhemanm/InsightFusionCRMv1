import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Settings, Download } from 'lucide-react';
import { birthdayReminderService, type BirthdayReminder } from '../../services/reminders/BirthdayReminderService';
import { format } from 'date-fns';

export const BirthdayReminderDashboard: React.FC = () => {
  const [reminders, setReminders] = useState<BirthdayReminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming'); // 'upcoming' | 'sent' | 'failed'

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const dueReminders = await birthdayReminderService.getDueReminders();
      setReminders(dueReminders);
    } catch (error) {
      console.error('Failed to load reminders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportReminders = () => {
    const csv = [
      ['Contact Name', 'Birthday', 'Reminder Date', 'Status', 'Type'].join(','),
      ...reminders.map(reminder => [
        reminder.contactName,
        reminder.dateOfBirth,
        format(reminder.reminderDate, 'yyyy-MM-dd'),
        reminder.status,
        reminder.notificationType
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `birthday-reminders-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="text-blue-500" size={24} />
          <h2 className="text-xl font-bold">Birthday Reminders</h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={exportReminders}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {['upcoming', 'sent', 'failed'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              filter === type
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {reminders
          .filter(reminder => {
            if (filter === 'upcoming') return reminder.status === 'pending';
            return reminder.status === filter;
          })
          .map((reminder) => (
            <div
              key={reminder.id}
              className={`p-4 rounded-lg border ${
                reminder.status === 'sent'
                  ? 'border-green-200 bg-green-50'
                  : reminder.status === 'failed'
                  ? 'border-red-200 bg-red-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Bell className={`${
                    reminder.status === 'sent'
                      ? 'text-green-500'
                      : reminder.status === 'failed'
                      ? 'text-red-500'
                      : 'text-blue-500'
                  }`} size={20} />
                  <div>
                    <h3 className="font-medium">{reminder.contactName}</h3>
                    <p className="text-sm text-gray-500">
                      Birthday: {format(new Date(reminder.dateOfBirth), 'MMMM d')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    reminder.status === 'sent'
                      ? 'text-green-600'
                      : reminder.status === 'failed'
                      ? 'text-red-600'
                      : 'text-blue-600'
                  }`}>
                    {reminder.status.toUpperCase()}
                  </span>
                  <p className="text-sm text-gray-500">
                    Reminder: {format(reminder.reminderDate, 'MMM d, yyyy')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded-full">
                  {reminder.notificationType.toUpperCase()}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full capitalize">
                  {reminder.tone || 'casual'} tone
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full uppercase">
                  {reminder.language || 'en'}
                </span>
              </div>
            </div>
          ))}

        {reminders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium">No reminders found</p>
            <p className="text-sm">Birthday reminders will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};