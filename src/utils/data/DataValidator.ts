import { z } from 'zod';
import { logger } from '../monitoring/logger';

export class DataValidator {
  static async validateContact(data: unknown) {
    const ContactSchema = z.object({
      firstName: z.string().min(2, 'First name must be at least 2 characters'),
      lastName: z.string().min(2, 'Last name must be at least 2 characters'),
      email: z.string().email('Invalid email format'),
      phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone format').optional(),
      dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
      kyc: z.object({
        governmentId: z.string().optional(),
        idType: z.enum(['passport', 'national_id', 'drivers_license']).optional(),
        verificationStatus: z.enum(['pending', 'verified', 'failed']).optional()
      }).optional()
    });

    const result = await ContactSchema.safeParseAsync(data);
    if (!result.success) {
      logger.error('Contact validation failed', { errors: result.error.errors });
      throw new Error('Invalid contact data');
    }
    return result.data;
  }
}