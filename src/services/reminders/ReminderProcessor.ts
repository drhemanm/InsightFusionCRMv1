```typescript
import { birthdayReminderService, type BirthdayReminder } from './BirthdayReminderService';
import { BirthdayTemplates } from './templates/BirthdayTemplates';
import { emailService } from '../communication/EmailService';
import { smsService } from '../communication/SMSService';
import { logger } from '../monitoring/logger';

class ReminderProcessor {
  private static instance: ReminderProcessor;
  private isProcessing: boolean = false;

  private constructor() {
    this.startProcessing();
  }

  static getInstance(): ReminderProcessor {
    if (!ReminderProcessor.instance) {
      ReminderProcessor.instance = new ReminderProcessor();
    }
    return ReminderProcessor.instance;
  }

  private startProcessing() {
    // Process reminders every hour
    setInterval(() => {
      this.processReminders();
    }, 60 * 60 * 1000);
  }

  private async processReminders() {
    if (this.isProcessing) return;

    try {
      this.isProcessing = true;
      const dueReminders = await birthdayReminderService.getDueReminders();
      
      for (const reminder of dueReminders) {
        await this.sendReminder(reminder);
      }

      logger.info('Reminder processing completed', {
        processedCount: dueReminders.length
      });
    } catch (error) {
      logger.error('Failed to process reminders', { error });
    } finally {
      this.isProcessing = false;
    }
  }

  private async sendReminder(reminder: BirthdayReminder) {
    try {
      const template = this.getTemplate(reminder);
      
      if (reminder.notificationType === 'email') {
        await emailService.sendEmail({
          to: reminder.contactId,
          subject: template.subject,
          body: template.body,
          templateId: 'birthday',
          data: {
            contactName: reminder.contactName,
            specialOffer: this.generateSpecialOffer(reminder)
          }
        });
      } else {
        await smsService.sendSMS({
          to: reminder.contactId,
          message: template.body,
          templateId: 'birthday',
          data: {
            contactName: reminder.contactName,
            specialOffer: this.generateSpecialOffer(reminder)
          }
        });
      }

      await birthdayReminderService.markReminderSent(reminder.id);
      logger.info('Birthday reminder sent successfully', { reminderId: reminder.id });
    } catch (error) {
      await birthdayReminderService.markReminderFailed(reminder.id, error);
      throw error;
    }
  }

  private getTemplate(reminder: BirthdayReminder) {
    const templates = BirthdayTemplates[reminder.notificationType];
    const tone = reminder.tone || 'casual';
    const language = reminder.language || 'en';

    return templates[tone][language]({
      contactName: reminder.contactName,
      specialOffer: this.generateSpecialOffer(reminder)
    });
  }

  private generateSpecialOffer(reminder: BirthdayReminder) {
    return {
      code: `BDAY-${reminder.contactId.slice(0, 6)}`,
      discount: '20%',
      expiryDays: 30
    };
  }
}

export const reminderProcessor = ReminderProcessor.getInstance();
```