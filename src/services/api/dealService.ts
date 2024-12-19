import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import type { Deal } from '../../types/deals';

export const dealService = {
  async getAll() {
    const response = await apiClient.get(API_ENDPOINTS.deals.base);
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.deals.getById(id));
    return response.data;
  },

  async create(deal: Omit<Deal, 'id'>) {
    const response = await apiClient.post(API_ENDPOINTS.deals.base, deal);
    return response.data;
  },

  async update(id: string, updates: Partial<Deal>) {
    const response = await apiClient.put(API_ENDPOINTS.deals.update(id), updates);
    return response.data;
  },

  async delete(id: string) {
    await apiClient.delete(API_ENDPOINTS.deals.delete(id));
  }
};