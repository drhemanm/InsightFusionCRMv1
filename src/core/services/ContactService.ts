```typescript
import { BaseService } from './BaseService';
import { Contact } from '../types/Contact';
import { ServiceResponse, ServiceError } from '../types/ServiceResponse';
import { dataQualityManager } from '../utils/data/DataQualityManager';
import { logger } from '../utils/logger';

export class ContactService extends BaseService {
  private static instance: ContactService;
  private contacts: Contact[] = [];

  private constructor() {
    super();
  }

  static getInstance(): ContactService {
    if (!ContactService.instance) {
      ContactService.instance = new ContactService();
    }
    return ContactService.instance;
  }

  async createContact(data: Omit<Contact, 'id'>): Promise<ServiceResponse<Contact>> {
    return this.executeWithMetrics('create_contact', async () => {
      try {
        // Process data through quality manager
        const processedData = await dataQualityManager.processData(data, 'contact');

        // Create contact
        const contact: Contact = {
          id: crypto.randomUUID(),
          ...processedData,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        this.contacts.push(contact);

        logger.info('Contact created', { contactId: contact.id });

        return {
          success: true,
          data: contact,
          metadata: {
            timestamp: new Date(),
            duration: 0
          }
        };
      } catch (error) {
        throw new ServiceError(
          'CONTACT_CREATION_FAILED',
          'Failed to create contact',
          error
        );
      }
    });
  }

  async updateContact(id: string, updates: Partial<Contact>): Promise<ServiceResponse<Contact>> {
    return this.executeWithMetrics('update_contact', async () => {
      try {
        const contact = this.contacts.find(c => c.id === id);
        if (!contact) {
          throw new ServiceError('CONTACT_NOT_FOUND', 'Contact not found');
        }

        // Process updates through quality manager
        const processedUpdates = await dataQualityManager.processData(updates, 'contact');

        // Update contact
        Object.assign(contact, processedUpdates, { updatedAt: new Date() });

        logger.info('Contact updated', { contactId: id });

        return {
          success: true,
          data: contact,
          metadata: {
            timestamp: new Date(),
            duration: 0
          }
        };
      } catch (error) {
        throw new ServiceError(
          'CONTACT_UPDATE_FAILED',
          'Failed to update contact',
          error
        );
      }
    });
  }

  async deleteContact(id: string): Promise<ServiceResponse<void>> {
    return this.executeWithMetrics('delete_contact', async () => {
      try {
        const index = this.contacts.findIndex(c => c.id === id);
        if (index === -1) {
          throw new ServiceError('CONTACT_NOT_FOUND', 'Contact not found');
        }

        this.contacts.splice(index, 1);
        logger.info('Contact deleted', { contactId: id });

        return {
          success: true,
          metadata: {
            timestamp: new Date(),
            duration: 0
          }
        };
      } catch (error) {
        throw new ServiceError(
          'CONTACT_DELETION_FAILED',
          'Failed to delete contact',
          error
        );
      }
    });
  }
}

export const contactService = ContactService.getInstance();
```