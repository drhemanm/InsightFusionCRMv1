import type { Consent, DataRequest, AuditLog, RetentionPolicy } from '../types/gdpr';
import { ConsentSchema } from '../types/gdpr';

class GDPRService {
  private auditLogs: AuditLog[] = [];
  private retentionPolicies: RetentionPolicy[] = [
    {
      entityType: 'contact',
      duration: 730, // 2 years
      basis: 'consent',
      automaticDeletion: true,
    },
    {
      entityType: 'deal',
      duration: 1825, // 5 years
      basis: 'legal_obligation',
      automaticDeletion: false,
    }
  ];

  async recordConsent(userId: string, consent: Consent): Promise<void> {
    try {
      // Validate consent data
      ConsentSchema.parse(consent);

      // Store consent record
      await this.logAudit({
        id: crypto.randomUUID(),
        userId,
        action: 'consent_update',
        entityType: 'consent',
        entityId: userId,
        timestamp: new Date(),
        ipAddress: consent.ipAddress,
        changes: {
          before: {},
          after: consent
        }
      });
    } catch (error) {
      throw new Error('Invalid consent data');
    }
  }

  async requestDataAccess(userId: string): Promise<DataRequest> {
    const request: DataRequest = {
      id: crypto.randomUUID(),
      userId,
      type: 'access',
      status: 'pending',
      requestedAt: new Date()
    };

    // Log the request
    await this.logAudit({
      id: crypto.randomUUID(),
      userId,
      action: 'read',
      entityType: 'user',
      entityId: userId,
      timestamp: new Date(),
      ipAddress: 'system'
    });

    return request;
  }

  async requestDataDeletion(userId: string): Promise<DataRequest> {
    const request: DataRequest = {
      id: crypto.randomUUID(),
      userId,
      type: 'delete',
      status: 'pending',
      requestedAt: new Date()
    };

    await this.logAudit({
      id: crypto.randomUUID(),
      userId,
      action: 'delete',
      entityType: 'user',
      entityId: userId,
      timestamp: new Date(),
      ipAddress: 'system'
    });

    return request;
  }

  async logAudit(log: AuditLog): Promise<void> {
    this.auditLogs.push(log);
  }

  async getAuditLogs(userId: string): Promise<AuditLog[]> {
    return this.auditLogs.filter(log => log.userId === userId);
  }

  async checkRetention(entityType: string, createdAt: Date): boolean {
    const policy = this.retentionPolicies.find(p => p.entityType === entityType);
    if (!policy) return true;

    const age = Date.now() - createdAt.getTime();
    const ageInDays = age / (1000 * 60 * 60 * 24);

    return ageInDays <= policy.duration;
  }

  async encryptSensitiveData(data: any): Promise<string> {
    // In production, implement proper encryption
    return btoa(JSON.stringify(data));
  }

  async decryptSensitiveData(encryptedData: string): Promise<any> {
    // In production, implement proper decryption
    return JSON.parse(atob(encryptedData));
  }
}

export const gdprService = new GDPRService();