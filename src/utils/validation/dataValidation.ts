import { z } from 'zod';
import { logger } from '../monitoring/logger';

export const validateData = async (data: unknown, schema: z.ZodSchema) => {
  const result = await schema.safeParseAsync(data);
  
  if (!result.success) {
    logger.error('Data validation failed', {
      errors: result.error.errors,
      data
    });
    throw new Error('Invalid data format');
  }
  
  return result.data;
};

export const sanitizeData = (data: Record<string, any>): Record<string, any> => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    // Remove HTML tags and special characters
    if (typeof value === 'string') {
      acc[key] = value.replace(/<[^>]*>/g, '').trim();
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
};