import { z } from 'zod';

// Update the existing ContactSchema to include KYC information
export const ContactSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  email: z.string().email(),
  kyc: z.object({
    legalName: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    governmentIdType: z.enum(['passport', 'national_id', 'drivers_license']).optional(),
    governmentIdNumber: z.string().optional(),
    preferredCommunication: z.enum(['email', 'phone', 'mail']).default('email')
  }).optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Contact = z.infer<typeof ContactSchema>;