import { logger } from '../monitoring/logger';

export class DataCleaner {
  static cleanContactData(data: Record<string, any>): Record<string, any> {
    const cleaned: Record<string, any> = {};

    // Clean and standardize each field
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'string') {
        // Remove HTML tags and special characters
        cleaned[key] = value.replace(/<[^>]*>/g, '')
          .replace(/[^\w\s@.-]/g, '')
          .trim();
        
        // Standardize email to lowercase
        if (key === 'email') {
          cleaned[key] = value.toLowerCase();
        }
        
        // Format phone numbers
        if (key === 'phone') {
          cleaned[key] = this.standardizePhoneNumber(value);
        }
      } else {
        cleaned[key] = value;
      }
    });

    logger.info('Data cleaned successfully', { 
      originalKeys: Object.keys(data),
      cleanedKeys: Object.keys(cleaned)
    });

    return cleaned;
  }

  private static standardizePhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    const numbers = phone.replace(/\D/g, '');
    
    // Add country code if missing
    if (numbers.length === 10) {
      return `+1${numbers}`;
    }
    return `+${numbers}`;
  }
}