import { z } from 'zod';
import { logger } from '../monitoring/logger';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class FormValidator {
  static async validate(data: unknown, schema: z.ZodSchema): Promise<ValidationResult> {
    try {
      await schema.parseAsync(data);
      return { isValid: true, errors: {} };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, err) => ({
          ...acc,
          [err.path.join('.')]: err.message
        }), {});
        
        logger.debug('Form validation failed', { errors });
        return { isValid: false, errors };
      }
      throw error;
    }
  }

  static getFieldError(errors: Record<string, string>, field: string): string | undefined {
    return errors[field];
  }
}