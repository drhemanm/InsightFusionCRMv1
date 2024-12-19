import { z } from 'zod';

export const ContactSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  middleName: z.string().optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  profilePhoto: z.any().optional(),

  // Contact Details
  primaryPhone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
  secondaryPhone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number').optional(),
  email: z.string().email('Invalid email address'),
  website: z.string().url('Invalid URL').optional(),
  socialMedia: z.object({
    linkedin: z.string().url('Invalid LinkedIn URL').optional(),
    twitter: z.string().url('Invalid Twitter URL').optional(),
    facebook: z.string().url('Invalid Facebook URL').optional()
  }).optional(),

  // Address Information
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State/Province is required'),
    postalCode: z.string().min(1, 'Postal/ZIP code is required'),
    country: z.string().min(1, 'Country is required')
  }),

  // Professional Information
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  department: z.string().optional(),
  workEmail: z.string().email('Invalid work email').optional(),
  workPhone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number').optional(),

  // Additional Details
  category: z.enum(['family', 'friend', 'colleague', 'client', 'other']),
  importantDates: z.array(z.object({
    date: z.string(),
    occasion: z.string(),
    reminder: z.boolean()
  })).optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  preferredContactMethod: z.enum(['email', 'phone', 'sms', 'any']),
  timezone: z.string(),
  language: z.string(),

  // Emergency Contact
  emergencyContact: z.object({
    name: z.string().min(1, 'Emergency contact name is required'),
    relationship: z.string().min(1, 'Relationship is required'),
    phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
    email: z.string().email('Invalid email address').optional()
  })
});

export type ContactFormData = z.infer<typeof ContactSchema>;