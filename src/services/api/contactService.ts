import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import type { Contact } from '../../types/crm';

export const contactService = {
  async getAll() {
    const response = await apiClient.get(API_ENDPOINTS.contacts.base);
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.contacts.getById(id));
    return response.data;
  },

  async create(contact: Omit<Contact, 'id'>) {
    const response = await apiClient.post(API_ENDPOINTS.contacts.base, contact);
    return response.data;
  },

  async update(id: string, updates: Partial<Contact>) {
    const response = await apiClient.put(API_ENDPOINTS.contacts.update(id), updates);
    return response.data;
  },

  async delete(id: string) {
    await apiClient.delete(API_ENDPOINTS.contacts.delete(id));
  }
};