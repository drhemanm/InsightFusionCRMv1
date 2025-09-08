import { z } from 'zod';

// Enhanced Contact Schema for InsightFusion CRM
export const ContactSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  website: z.string().optional(),
  linkedinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    country: z.string().optional()
  }).optional(),
  tags: z.array(z.string()).default([]),
  leadScore: z.number().min(0).max(100).default(0),
  status: z.enum(['active', 'inactive', 'qualified', 'unqualified', 'converted']).default('active'),
  leadSource: z.enum(['website', 'referral', 'social_media', 'email_campaign', 'cold_call', 'event', 'advertisement', 'other']).optional(),
  lifecycleStage: z.enum(['subscriber', 'lead', 'marketing_qualified_lead', 'sales_qualified_lead', 'opportunity', 'customer', 'evangelist']).default('lead'),
  notes: z.string().optional(),
  customFields: z.record(z.any()).default({}),
  lastContactedAt: z.string().optional(),
  nextFollowUpAt: z.string().optional(),
  assignedTo: z.string().optional(),
  createdBy: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  
  // Keep your original KYC data as optional for backwards compatibility
  dateOfBirth: z.string().optional(),
  kyc: z.object({
    legalName: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    governmentIdType: z.enum(['passport', 'national_id', 'drivers_license']).optional(),
    governmentIdNumber: z.string().optional(),
    preferredCommunication: z.enum(['email', 'phone', 'mail']).default('email')
  }).optional()
});

export type Contact = z.infer<typeof ContactSchema>;

// Deal Schema (you'll need this too)
export const DealSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  value: z.number().default(0),
  currency: z.string().default('USD'),
  stage: z.enum(['prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost']).default('prospecting'),
  probability: z.number().min(0).max(100).default(10),
  expectedCloseDate: z.string().optional(),
  actualCloseDate: z.string().optional(),
  leadSource: z.enum(['website', 'referral', 'social_media', 'email_campaign', 'cold_call', 'event', 'advertisement', 'other']).optional(),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
  customFields: z.record(z.any()).default({}),
  contactId: z.string().optional(),
  assignedTo: z.string().optional(),
  createdBy: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Deal = z.infer<typeof DealSchema>;

// Task Schema (you'll need this too)
export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  type: z.enum(['task', 'call', 'email', 'meeting', 'follow_up', 'demo', 'other']).default('task'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']).default('pending'),
  dueDate: z.string().optional(),
  completedAt: z.string().optional(),
  reminderAt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
  customFields: z.record(z.any()).default({}),
  contactId: z.string().optional(),
  dealId: z.string().optional(),
  assignedTo: z.string().optional(),
  createdBy: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Task = z.infer<typeof TaskSchema>;
