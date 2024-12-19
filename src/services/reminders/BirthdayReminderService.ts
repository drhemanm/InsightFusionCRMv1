import { format, addDays, isBefore, isAfter } from 'date-fns';
import { logger } from '../monitoring/logger';
import type { Contact } from '../../types/crm';

export interface BirthdayReminder {
  id: string;
  contactId: string;
  contactName: string;
  dateOfBirth: string;
  reminderDate: Date;
  status: 'pending' | 'sent' | 'failed';
  notificationType: 'email' | 'sms';
  language?: string;
  tone?: 'formal' | 'casual' | 'humorous';
}

class BirthdayReminderService {
  private static instance: BirthdayReminderService;
  private reminders: BirthdayReminder[] = [];

  private constructor() {
    this.initializeReminders();
  }

  static getInstance(): BirthdayReminderService {
    if (!BirthdayReminderService.instance) {
      BirthdayReminderService.instance = new BirthdayReminderService();
    }
    return BirthdayReminderService.instance;
  }

  private initializeReminders() {
    // Check for upcoming birthdays daily
    setInterval(() => {
      this.checkUpcomingBirthdays();
    }, 24 * 60 * 60 * 1000); // Every 24 hours
  }

  async checkUpcomingBirthdays() {
    try {
      const contacts = await this.getContactsWithBirthdays();
      const today = new Date();
      const nextWeek = addDays(today, 7);

      contacts.forEach(contact => {
        const birthDate = new Date(contact.dateOfBirth);
        const nextBirthday = new Date(
          today.getFullYear(),
          birthDate.getMonth(),
          birthDate.getDate()
        );

        // If birthday has passed this year, look at next year
        if (isBefore(nextBirthday, today)) {
          nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }

        if (isAfter(nextBirthday, today) && isBefore(nextBirthday, nextWeek)) {
          this.createReminder(contact, nextBirthday);
        }
      });

      logger.info('Birthday check completed', {
        checkedContacts: contacts.length,
        remindersCreated: this.reminders.length
      });
    } catch (error) {
      logger.error('Failed to check upcoming birthdays', { error });
    }
  }

  private async getContactsWithBirthdays(): Promise<Contact[]> {
    // In production, fetch from API/database
    return [];
  }

  private createReminder(contact: Contact, birthDate: Date): void {
    const reminder: BirthdayReminder = {
      id: crypto.randomUUID(),
      contactId: contact.id,
      contactName: `${contact.firstName} ${contact.lastName}`,
      dateOfBirth: contact.dateOfBirth,
      reminderDate: addDays(birthDate, -7), // 7 days before
      status: 'pending',
      notificationType: contact.kyc?.preferredCommunication === 'email' ? 'email' : 'sms',
      language: 'en', // Default to English
      tone: 'casual' // Default to casual tone
    };

    this.reminders.push(reminder);
    logger.info('Birthday reminder created', { reminder });
  }

  async getDueReminders(): Promise<BirthdayReminder[]> {
    const now = new Date();
    return this.reminders.filter(reminder => 
      reminder.status === 'pending' && 
      isAfter(now, reminder.reminderDate)
    );
  }

  async markReminderSent(reminderId: string): Promise<void> {
    const reminder = this.reminders.find(r => r.id === reminderId);
    if (reminder) {
      reminder.status = 'sent';
      logger.info('Birthday reminder marked as sent', { reminderId });
    }
  }

  async markReminderFailed(reminderId: string, error: any): Promise<void> {
    const reminder = this.reminders.find(r => r.id === reminderId);
    if (reminder) {
      reminder.status = 'failed';
      logger.error('Birthday reminder failed', { reminderId, error });
    }
  }
}

export const birthdayReminderService = BirthdayReminderService.getInstance();