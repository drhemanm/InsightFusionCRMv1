import { logger } from '../../utils/monitoring/logger';

interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  metadata?: Record<string, any>;
}

class NotificationService {
  private static instance: NotificationService;
  private notifications: Notification[] = [];

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async sendNotification(
    userId: string,
    type: string,
    title: string,
    message: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    const notification: Notification = {
      id: crypto.randomUUID(),
      userId,
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
      metadata
    };

    this.notifications.push(notification);
    logger.info('Notification sent', { notification });

    // In production, implement push notification or email delivery
  }

  getUnreadNotifications(userId: string): Notification[] {
    return this.notifications.filter(n => n.userId === userId && !n.read);
  }

  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }
}

export const notificationService = NotificationService.getInstance();