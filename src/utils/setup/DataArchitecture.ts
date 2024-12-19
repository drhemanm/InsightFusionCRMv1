import { z } from 'zod';

export const ContactSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  title: z.string().optional(),
  company: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postal: z.string(),
    country: z.string(),
  }),
  customFields: z.record(z.unknown()),
});

export const LeadScoreSchema = z.object({
  demographic: z.number().min(0).max(100),
  behavioral: z.number().min(0).max(100),
  engagement: z.number().min(0).max(100),
  qualification: z.number().min(0).max(100),
});

export class DataArchitecture {
  static getDefaultSegments() {
    return {
      industry: [
        'technology',
        'healthcare',
        'finance',
        'retail',
        'manufacturing',
      ],
      size: [
        'enterprise',
        'mid-market',
        'small_business',
        'startup',
      ],
      status: [
        'active',
        'inactive',
        'prospect',
        'customer',
        'partner',
      ],
    };
  }

  static getRelationshipTypes() {
    return {
      contact_to_company: ['employee', 'decision_maker', 'influencer'],
      company_to_company: ['parent', 'subsidiary', 'partner', 'competitor'],
      contact_to_contact: ['reports_to', 'colleague', 'reference'],
    };
  }

  static calculateLeadScore(data: any) {
    // Implement lead scoring logic
    return {
      demographic: 0,
      behavioral: 0,
      engagement: 0,
      qualification: 0,
    };
  }
}