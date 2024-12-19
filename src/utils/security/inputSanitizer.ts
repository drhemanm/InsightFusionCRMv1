import { logger } from '../monitoring/logger';

class InputSanitizer {
  static sanitizeString(input: string): string {
    return input
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[^\w\s@.-]/g, '') // Remove special characters except @ . -
      .trim();
  }

  static sanitizeEmail(email: string): string {
    return email.toLowerCase().trim();
  }

  static sanitizePhone(phone: string): string {
    return phone.replace(/[^\d+]/g, '');
  }

  static sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const sanitized: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        if (key === 'email') {
          sanitized[key] = this.sanitizeEmail(value);
        } else if (key.includes('phone')) {
          sanitized[key] = this.sanitizePhone(value);
        } else {
          sanitized[key] = this.sanitizeString(value);
        }
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        sanitized[key] = this.sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized as T;
  }
}

export const sanitizeInput = InputSanitizer.sanitizeString;
export const sanitizeObject = InputSanitizer.sanitizeObject;