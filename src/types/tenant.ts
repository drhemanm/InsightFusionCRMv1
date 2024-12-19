import type { ThemeConfig } from './themes';

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  plan: 'starter' | 'professional' | 'enterprise';
  features: {
    maxUsers: number;
    maxContacts: number;
    maxDeals: number;
    customization: boolean;
    apiAccess: boolean;
    aiFeatures: boolean;
    whiteLabeling: boolean;
  };
  branding: {
    logo?: string;
    primaryColor: string;
    secondaryColor: string;
    favicon?: string;
  };
  settings: {
    defaultTheme: ThemeConfig;
    dateFormat: string;
    timezone: string;
    currency: string;
    language: string;
  };
  security: {
    mfa: boolean;
    ssoEnabled: boolean;
    ipWhitelist: string[];
    passwordPolicy: {
      minLength: number;
      requireSpecialChars: boolean;
      requireNumbers: boolean;
      expiryDays: number;
    };
  };
}

export interface TenantUser {
  id: string;
  tenantId: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  permissions: string[];
  lastLogin?: Date;
  status: 'active' | 'inactive' | 'suspended';
}

export interface TenantContext {
  tenant: Tenant;
  user: TenantUser;
}