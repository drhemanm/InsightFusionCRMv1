import { z } from 'zod';

export const DealSchema = z.object({
  title: z.string().min(1, 'Deal title is required'),
  description: z.string().optional(),
  value: z.number().min(0, 'Deal value must be positive'),
  startDate: z.string(),
  expectedCloseDate: z.string(),
  status: z.enum(['active', 'pending', 'expired']).default('active'),
  category: z.enum(['sales', 'partnership', 'investment']),
  priority: z.enum(['low', 'medium', 'high']),
  stage: z.enum(['lead', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost']),
  companyName: z.string().min(1, 'Company name is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().optional(),
  tags: z.string().transform(str => str.split(',').map(s => s.trim())).optional(),
  notes: z.string().optional(),
  assignedTo: z.string().optional(),
  documents: z.array(z.string()).optional(),
});

export type Deal = z.infer<typeof DealSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};