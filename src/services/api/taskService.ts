import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import type { Task } from '../../types';

export const taskService = {
  async getAll() {
    const response = await apiClient.get(API_ENDPOINTS.tasks.base);
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get(API_ENDPOINTS.tasks.getById(id));
    return response.data;
  },

  async create(task: Omit<Task, 'id'>) {
    const response = await apiClient.post(API_ENDPOINTS.tasks.base, task);
    return response.data;
  },

  async update(id: string, updates: Partial<Task>) {
    const response = await apiClient.put(API_ENDPOINTS.tasks.update(id), updates);
    return response.data;
  },

  async delete(id: string) {
    await apiClient.delete(API_ENDPOINTS.tasks.delete(id));
  }
};