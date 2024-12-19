import { logger } from '../monitoring/logger';

interface AuditEvent {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes?: {
    before: Record<string, any>;
    after: Record<string, any>;
  };
  metadata: {
    timestamp: Date;
    ipAddress: string;
    userAgent: string;
  };
}

class AuditLogger {
  private static instance: AuditLogger;
  private events: AuditEvent[] = [];
  private readonly RETENTION_DAYS = 90;

  private constructor() {
    this.startCleanup();
  }

  static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  async logEvent(
    userId: string,
    action: string,
    entityType: string,
    entityId: string,
    changes?: AuditEvent['changes']
  ): Promise<void> {
    const event: AuditEvent = {
      id: crypto.randomUUID(),
      userId,
      action,
      entityType,
      entityId,
      changes,
      metadata: {
        timestamp: new Date(),
        ipAddress: await this.getClientIP(),
        userAgent: navigator.userAgent
      }
    };

    this.events.push(event);
    logger.info('Audit event logged', { 
      action,
      entityType,
      entityId,
      userId 
    });

    // In production, send to audit service
    if (import.meta.env.PROD) {
      await this.sendToAuditService(event);
    }
  }

  getEvents(
    filters?: {
      userId?: string;
      entityType?: string;
      entityId?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): AuditEvent[] {
    let filteredEvents = this.events;

    if (filters) {
      if (filters.userId) {
        filteredEvents = filteredEvents.filter(e => e.userId === filters.userId);
      }
      if (filters.entityType) {
        filteredEvents = filteredEvents.filter(e => e.entityType === filters.entityType);
      }
      if (filters.entityId) {
        filteredEvents = filteredEvents.filter(e => e.entityId === filters.entityId);
      }
      if (filters.startDate) {
        filteredEvents = filteredEvents.filter(e => e.metadata.timestamp >= filters.startDate!);
      }
      if (filters.endDate) {
        filteredEvents = filteredEvents.filter(e => e.metadata.timestamp <= filters.endDate!);
      }
    }

    return filteredEvents;
  }

  private async getClientIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  }

  private async sendToAuditService(event: AuditEvent): Promise<void> {
    try {
      await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
    } catch (error) {
      logger.error('Failed to send audit event', { error, event });
    }
  }

  private startCleanup(): void {
    setInterval(() => {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - this.RETENTION_DAYS);

      this.events = this.events.filter(event => 
        event.metadata.timestamp > cutoff
      );
    }, 24 * 60 * 60 * 1000); // Daily cleanup
  }
}

export const auditLogger = AuditLogger.getInstance();