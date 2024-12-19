import { create } from 'zustand';
import type { Plan, Subscription, Invoice, Usage } from '../types/subscription';

interface SubscriptionStore {
  plans: Plan[];
  currentSubscription: Subscription | null;
  invoices: Invoice[];
  usage: Usage[];
  isLoading: boolean;
  error: string | null;

  fetchPlans: () => Promise<void>;
  subscribeToPlan: (planId: string, paymentMethodId: string) => Promise<void>;
  cancelSubscription: (immediate?: boolean) => Promise<void>;
  updatePaymentMethod: (paymentMethodId: string) => Promise<void>;
  fetchInvoices: () => Promise<void>;
  fetchUsage: () => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  plans: [
    {
      id: 'basic',
      name: 'Basic',
      price: 200,
      billingPeriod: 'monthly',
      features: [
        'Core CRM features',
        'Up to 5 team members',
        'Basic reporting',
        '10GB storage',
      ],
      limits: {
        users: 5,
        contacts: 1000,
        storage: 10,
      },
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 400,
      billingPeriod: 'monthly',
      features: [
        'All Basic features',
        'Up to 20 team members',
        'Advanced analytics',
        '50GB storage',
        'API access',
        'Priority support',
      ],
      limits: {
        users: 20,
        contacts: 10000,
        storage: 50,
        apiCalls: 10000,
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 600,
      billingPeriod: 'monthly',
      features: [
        'All Pro features',
        'Unlimited team members',
        'Custom integrations',
        '500GB storage',
        'Dedicated support',
        'SLA guarantees',
      ],
      limits: {
        users: 999999,
        contacts: 999999,
        storage: 500,
        apiCalls: 100000,
      },
    },
  ],
  currentSubscription: null,
  invoices: [],
  usage: [],
  isLoading: false,
  error: null,

  fetchPlans: async () => {
    set({ isLoading: true });
    try {
      // In production, fetch from API
      set({ isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch plans', isLoading: false });
    }
  },

  subscribeToPlan: async (planId, paymentMethodId) => {
    set({ isLoading: true });
    try {
      // In production, make API call to subscribe
      set({ isLoading: false });
    } catch (error) {
      set({ error: 'Failed to subscribe', isLoading: false });
    }
  },

  cancelSubscription: async (immediate = false) => {
    set({ isLoading: true });
    try {
      // In production, make API call to cancel
      set({ isLoading: false });
    } catch (error) {
      set({ error: 'Failed to cancel subscription', isLoading: false });
    }
  },

  updatePaymentMethod: async (paymentMethodId) => {
    set({ isLoading: true });
    try {
      // In production, make API call to update payment method
      set({ isLoading: false });
    } catch (error) {
      set({ error: 'Failed to update payment method', isLoading: false });
    }
  },

  fetchInvoices: async () => {
    set({ isLoading: true });
    try {
      // In production, fetch from API
      set({ isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch invoices', isLoading: false });
    }
  },

  fetchUsage: async () => {
    set({ isLoading: true });
    try {
      // In production, fetch from API
      set({ isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch usage', isLoading: false });
    }
  },
}));