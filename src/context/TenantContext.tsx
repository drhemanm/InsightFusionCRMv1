import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Tenant, TenantUser, TenantContext as ITenantContext } from '../types/tenant';
import { useAuthStore } from '../store/authStore';
import { useSubscriptionStore } from '../store/subscriptionStore';

const TenantContext = createContext<ITenantContext | null>(null);

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

interface TenantProviderProps {
  children: React.ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const { user: authUser, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [user, setUser] = useState<TenantUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentSubscription } = useSubscriptionStore();

  useEffect(() => {
    const initializeTenant = async () => {
      if (!isAuthenticated || !authUser) {
        setIsLoading(false);
        return;
      }

      try {
        // Mock tenant data for demo
        const mockTenant: Tenant = {
          id: 'tenant-1',
          name: 'InsightFusion Demo',
          domain: window.location.hostname,
          plan: currentSubscription?.planId as 'starter' | 'professional' | 'enterprise' || 'starter',
          features: {
            maxUsers: 50,
            maxContacts: 10000,
            maxDeals: 1000,
            customization: true,
            apiAccess: true,
            aiFeatures: true,
            whiteLabeling: false,
          },
          branding: {
            primaryColor: '#2563eb',
            secondaryColor: '#1e40af',
          },
          settings: {
            defaultTheme: {} as any,
            dateFormat: 'MM/dd/yyyy',
            timezone: 'UTC',
            currency: 'MUR',
            language: 'en',
          },
          security: {
            mfa: true,
            ssoEnabled: false,
            ipWhitelist: [],
            passwordPolicy: {
              minLength: 12,
              requireSpecialChars: true,
              requireNumbers: true,
              expiryDays: 90,
            },
          },
        };

        const mockUser: TenantUser = {
          id: authUser.id,
          tenantId: mockTenant.id,
          email: authUser.email,
          role: authUser.role,
          permissions: ['*'],
          status: 'active',
        };

        setTenant(mockTenant);
        setUser(mockUser);
      } catch (error) {
        console.error('Failed to fetch tenant info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTenant();
  }, [isAuthenticated, authUser, currentSubscription]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <TenantContext.Provider value={{ tenant, user }}>
      {children}
    </TenantContext.Provider>
  );
};