```typescript
export interface WhatsAppConfig {
  apiKey: string;
  phoneNumber: string;
  webhookUrl: string;
}

export interface WhatsAppMessage {
  id: string;
  to: string;
  type: 'text' | 'template' | 'file';
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

class WhatsAppIntegrationService {
  private isConnected: boolean = false;
  private config: WhatsAppConfig | null = null;

  async connect(config: WhatsAppConfig): Promise<boolean> {
    try {
      // In production, implement actual WhatsApp Business API connection
      this.config = config;
      this.isConnected = true;
      return true;
    } catch (error) {
      console.error('WhatsApp connection failed:', error);
      return false;
    }
  }

  async sendMessage(to: string, content: string, type: WhatsAppMessage['type'] = 'text'): Promise<string> {
    if (!this.isConnected) {
      throw new Error('WhatsApp not connected');
    }

    // In production, implement actual message sending
    const message: WhatsAppMessage = {
      id: crypto.randomUUID(),
      to,
      type,
      content,
      timestamp: new Date(),
      status: 'sent'
    };

    return message.id;
  }

  async sendMeetingReminder(to: string, meeting: any): Promise<void> {
    const template = `Reminder: Meeting "${meeting.title}" in 15 minutes.\n\nDate: ${meeting.date}\nTime: ${meeting.time}\nLocation: ${meeting.location}`;
    await this.sendMessage(to, template, 'template');
  }

  async sendScheduleConfirmation(to: string, meeting: any): Promise<void> {
    const template = `Your meeting "${meeting.title}" has been confirmed.\n\nDate: ${meeting.date}\nTime: ${meeting.time}\nLocation: ${meeting.location}`;
    await this.sendMessage(to, template, 'template');
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export const whatsAppService = new WhatsAppIntegrationService();
```