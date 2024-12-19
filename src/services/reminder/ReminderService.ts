import { format, addDays, isAfter, isBefore } from 'date-fns';
import type { Contact } from '../../types';

export interface Reminder {
  id: string;
  contactId: string;
  type: 'follow_up' | 'check_in' | 'birthday' | 'custom';
  title: string;
  description?: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'snoozed';
  snoozeUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReminderTemplate {
  title: string;
  description: string;
  delayDays: number;
  type: Reminder['type'];
  priority: Reminder['priority'];
}

class ReminderService {
  private reminders: Reminder[] = [];
  private templates: ReminderTemplate[] = [
    {
      title: 'Initial Follow-up',
      description: 'Follow up on initial contact',
      delayDays: 2,
      type: 'follow_up',
      priority: 'high'
    },
    {
      title: 'Check-in',
      description: 'Regular check-in with contact',
      delayDays: 30,
      type: 'check_in',
      priority: 'medium'
    }
  ];

  async createReminder(data: Omit<Reminder, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reminder> {
    const reminder: Reminder = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.reminders.push(reminder);
    return reminder;
  }

  async createFollowUpReminder(contact: Contact, template: ReminderTemplate): Promise<Reminder> {
    const dueDate = addDays(new Date(), template.delayDays);

    return this.createReminder({
      contactId: contact.id,
      type: template.type,
      title: template.title,
      description: template.description,
      dueDate,
      priority: template.priority,
      status: 'pending'
    });
  }

  async getDueReminders(): Promise<Reminder[]> {
    const now = new Date();
    return this.reminders.filter(reminder => 
      reminder.status === 'pending' &&
      (isAfter(now, reminder.dueDate) || 
       (reminder.snoozeUntil && isAfter(now, reminder.snoozeUntil)))
    );
  }

  async snoozeReminder(reminderId: string, days: number): Promise<void> {
    const reminder = this.reminders.find(r => r.id === reminderId);
    if (!reminder) return;

    reminder.status = 'snoozed';
    reminder.snoozeUntil = addDays(new Date(), days);
    reminder.updatedAt = new Date();
  }

  async completeReminder(reminderId: string): Promise<void> {
    const reminder = this.reminders.find(r => r.id === reminderId);
    if (!reminder) return;

    reminder.status = 'completed';
    reminder.updatedAt = new Date();
  }

  async getContactReminders(contactId: string): Promise<Reminder[]> {
    return this.reminders.filter(r => r.contactId === contactId);
  }

  async addTemplate(template: ReminderTemplate): Promise<void> {
    this.templates.push(template);
  }

  getTemplates(): ReminderTemplate[] {
    return this.templates;
  }
}

export const reminderService = new ReminderService();