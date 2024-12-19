```typescript
export interface Organization {
  id: string;
  name: string;
  industry: string;
  size: string;
  timezone: string;
  settings: {
    dateFormat: string;
    currency: string;
    language: string;
  };
  subscription: {
    planId: string;
    status: 'active' | 'past_due' | 'canceled';
    currentPeriodEnd: Date;
  };
  security: {
    mfa: boolean;
    ipRestrictions: string[];
    passwordPolicy: {
      minLength: number;
      requireSpecialChars: boolean;
      requireNumbers: boolean;
      expiryDays: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  department?: string;
  position?: string;
  status: 'active' | 'inactive' | 'suspended';
  permissions: string[];
  lastLoginAt?: Date;
  createdAt: Date;
}

export interface TeamInvitation {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  department?: string;
  position?: string;
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
  status: 'pending' | 'accepted' | 'expired';
}

export interface ResourceUsage {
  metric: 'storage' | 'api_calls' | 'active_users';
  value: number;
  limit: number;
  period: 'daily' | 'monthly';
  lastUpdated: Date;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  changes?: {
    before: Record<string, any>;
    after: Record<string, any>;
  };
  metadata: {
    ipAddress: string;
    userAgent: string;
    timestamp: Date;
  };
}
```