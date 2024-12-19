import React, { useState } from 'react';
import { Bell, Calendar, Clock, Check, X, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import type { Reminder } from '../../services/reminder/ReminderService';

interface ReminderListProps {
  reminders: Reminder[];
  onComplete: (reminderId: string) => void;
  onSnooze: (reminderId: string, days: number) => void;
  onDismiss: (reminderId: string) => void;
}

export const ReminderList: React.FC<ReminderListProps> = ({
  reminders,
  onComplete,
  onSnooze,
  onDismiss
}) => {
  const [expandedReminder, setExpandedReminder] = useState<string | null>(null);

  const getPriorityColor = (priority: Reminder['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell className="text-blue-500" size={24} />
          <h2 className="text-xl font-bold">Reminders</h2>
        </div>
      </div>

      <div className="space-y-4">
        {reminders.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No reminders to display
          </div>
        ) : (
          reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className={getPriorityColor(reminder.priority)} size={20} />
                    <div>
                      <h3 className="font-medium">{reminder.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} />
                        <span>Due: {format(reminder.dueDate, 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onComplete(reminder.id)}
                      className="p-2 text-green-500 hover:bg-green-50 rounded-lg"
                      title="Complete"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => setExpandedReminder(
                        expandedReminder === reminder.id ? null : reminder.id
                      )}
                      className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg"
                    >
                      <ChevronDown size={20} />
                    </button>
                  </div>
                </div>

                {expandedReminder === reminder.id && (
                  <div className="mt-4 pt-4 border-t">
                    {reminder.description && (
                      <p className="text-gray-600 mb-4">{reminder.description}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSnooze(reminder.id, 1)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                      >
                        <Clock size={16} />
                        Snooze 1 day
                      </button>
                      <button
                        onClick={() => onSnooze(reminder.id, 7)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                      >
                        <Clock size={16} />
                        Snooze 1 week
                      </button>
                      <button
                        onClick={() => onDismiss(reminder.id)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg ml-auto"
                      >
                        <X size={16} />
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};