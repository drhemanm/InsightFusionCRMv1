// src/types/subscription.ts
export interface Plan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  limits: {
    users: number;
    contacts: number;
    storage: number;
    apiCalls?: number;
  };
}

export interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'inactive' | 'canceled' | 'past_due';
  startDate: string;
  endDate?: string;
  cancelAtPeriodEnd?: boolean;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  customerId: string;
  paymentMethodId?: string;
}

export interface Invoice {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  dueDate: string;
  paidDate?: string;
  invoiceUrl?: string;
  description: string;
}

export interface Usage {
  id: string;
  subscriptionId: string;
  metric: string;
  value: number;
  limit: number;
  period: string;
  timestamp: string;
}
