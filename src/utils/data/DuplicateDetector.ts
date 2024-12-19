import { logger } from '../monitoring/logger';
import type { Contact } from '../../types/crm';

export class DuplicateDetector {
  static async findDuplicateContacts(contact: Contact, existingContacts: Contact[]): Promise<Contact[]> {
    const duplicates: Contact[] = [];
    const normalizedEmail = contact.email.toLowerCase();
    const normalizedPhone = contact.phone?.replace(/\D/g, '');

    // Check for exact matches
    const exactMatches = existingContacts.filter(existing => 
      existing.email.toLowerCase() === normalizedEmail ||
      (normalizedPhone && existing.phone?.replace(/\D/g, '') === normalizedPhone)
    );
    duplicates.push(...exactMatches);

    // Check for similar names (using Levenshtein distance)
    const similarNames = existingContacts.filter(existing => {
      const nameDistance = this.calculateLevenshteinDistance(
        `${contact.firstName} ${contact.lastName}`.toLowerCase(),
        `${existing.firstName} ${existing.lastName}`.toLowerCase()
      );
      return nameDistance <= 2; // Allow for small typos
    });
    duplicates.push(...similarNames);

    if (duplicates.length > 0) {
      logger.warn('Potential duplicates found', {
        newContact: { email: contact.email, name: `${contact.firstName} ${contact.lastName}` },
        duplicateCount: duplicates.length
      });
    }

    return [...new Set(duplicates)];
  }

  private static calculateLevenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = Array(b.length + 1).fill(null).map(() => 
      Array(a.length + 1).fill(null)
    );

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + substitutionCost
        );
      }
    }

    return matrix[b.length][a.length];
  }
}