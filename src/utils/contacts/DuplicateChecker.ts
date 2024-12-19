import { Contact } from '../../types';
import { logger } from '../monitoring/logger';

export class DuplicateChecker {
  static findDuplicates(newContact: Partial<Contact>, existingContacts: Contact[]): Contact[] {
    const duplicates: Contact[] = [];

    // Check for exact email match
    if (newContact.email) {
      const emailMatch = existingContacts.find(
        contact => contact.email.toLowerCase() === newContact.email?.toLowerCase()
      );
      if (emailMatch) {
        duplicates.push(emailMatch);
      }
    }

    // Check for exact phone match
    if (newContact.phone) {
      const phoneMatch = existingContacts.find(
        contact => this.normalizePhone(contact.phone) === this.normalizePhone(newContact.phone!)
      );
      if (phoneMatch && !duplicates.includes(phoneMatch)) {
        duplicates.push(phoneMatch);
      }
    }

    // Check for name similarity
    if (newContact.firstName && newContact.lastName) {
      const nameMatches = existingContacts.filter(contact => {
        const similarity = this.calculateNameSimilarity(
          `${newContact.firstName} ${newContact.lastName}`,
          `${contact.firstName} ${contact.lastName}`
        );
        return similarity > 0.8; // 80% similarity threshold
      });
      
      nameMatches.forEach(match => {
        if (!duplicates.includes(match)) {
          duplicates.push(match);
        }
      });
    }

    if (duplicates.length > 0) {
      logger.info('Potential duplicates found', {
        newContact: {
          email: newContact.email,
          name: `${newContact.firstName} ${newContact.lastName}`
        },
        duplicateCount: duplicates.length
      });
    }

    return duplicates;
  }

  private static normalizePhone(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  private static calculateNameSimilarity(name1: string, name2: string): number {
    const n1 = name1.toLowerCase();
    const n2 = name2.toLowerCase();
    
    if (n1 === n2) return 1;
    if (n1.length === 0 || n2.length === 0) return 0;

    const matrix = Array(n2.length + 1).fill(null).map(() => 
      Array(n1.length + 1).fill(null)
    );

    for (let i = 0; i <= n1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= n2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= n2.length; j++) {
      for (let i = 1; i <= n1.length; i++) {
        const indicator = n1[i - 1] === n2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    const distance = matrix[n2.length][n1.length];
    const maxLength = Math.max(n1.length, n2.length);
    return 1 - distance / maxLength;
  }
}