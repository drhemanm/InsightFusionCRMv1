import { z } from 'zod';

export const PlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  billingPeriod: z.enum(['monthly', 'yearly']),
  features: z.array(z.string()),
  limits: z.object({
    users: z.number(),
    contacts: z.number(),
    storage: z.number(),
    apiCalls: z.number().optional(),
  }),
});

export type Plan = z.infer<typeof PlanSchema>;

export interface Subscription {
  id: string;
  organizationId: string;
  planId: string;
  status: 'active' | 'past_due' | 'canceled' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  trialEnd?: Date;
  paymentMethodId?: string;
}

export interface Invoice {
  id: string;
  organizationId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  dueDate: Date;
  paidAt?: Date;
  lineItems: {
    description: string;
    amount: number;
    quantity: number;
  }[];
}

export interface Usage {
  organizationId: string;
  metric: 'storage' | 'api_calls' | 'active_users';
  value: number;
  timestamp: Date;
}