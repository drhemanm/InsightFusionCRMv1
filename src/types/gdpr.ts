import { z } from 'zod';

export const ConsentSchema = z.object({
  marketing: z.boolean(),
  analytics: z.boolean(),
  thirdParty: z.boolean(),
  timestamp: z.date(),
  ipAddress: z.string(),
});

export type Consent = z.infer<typeof ConsentSchema>;

export interface DataRequest {
  id: string;
  userId: string;
  type: 'access' | 'delete' | 'modify';
  status: 'pending' | 'processing' | 'completed';
  requestedAt: Date;
  completedAt?: Date;
  data?: Record<string, any>;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'export' | 'consent_update';
  entityType: 'contact' | 'deal' | 'task' | 'user' | 'consent';
  entityId: string;
  timestamp: Date;
  ipAddress: string;
  changes?: {
    before: Record<string, any>;
    after: Record<string, any>;
  };
}

export interface RetentionPolicy {
  entityType: string;
  duration: number; // in days
  basis: 'consent' | 'contract' | 'legal_obligation';
  automaticDeletion: boolean;
  exceptions?: string[];
}