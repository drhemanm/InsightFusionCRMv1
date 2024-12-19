```typescript
import { create } from 'zustand';
import type { ChangeRequest } from '../types/rbac';

interface ChangeRequestStore {
  requests: ChangeRequest[];
  isLoading: boolean;
  error: string | null;
  
  submitRequest: (request: Omit<ChangeRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  approveRequest: (id: string, comment?: string) => Promise<void>;
  rejectRequest: (id: string, comment: string) => Promise<void>;
  fetchRequests: () => Promise<void>;
}

export const useChangeRequestStore = create<ChangeRequestStore>((set, get) => ({
  requests: [],
  isLoading: false,
  error: null,

  submitRequest: async (requestData) => {
    set({ isLoading: true });
    try {
      const newRequest: ChangeRequest = {
        ...requestData,
        id: crypto.randomUUID(),
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      set(state => ({
        requests: [...state.requests, newRequest],
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to submit request', isLoading: false });
    }
  },

  approveRequest: async (id, comment) => {
    set({ isLoading: true });
    try {
      set(state => ({
        requests: state.requests.map(req =>
          req.id === id
            ? {
                ...req,
                status: 'approved',
                adminComment: comment,
                updatedAt: new Date()
              }
            : req
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to approve request', isLoading: false });
    }
  },

  rejectRequest: async (id, comment) => {
    set({ isLoading: true });
    try {
      set(state => ({
        requests: state.requests.map(req =>
          req.id === id
            ? {
                ...req,
                status: 'rejected',
                adminComment: comment,
                updatedAt: new Date()
              }
            : req
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to reject request', isLoading: false });
    }
  },

  fetchRequests: async () => {
    set({ isLoading: true });
    try {
      // In production, fetch from API
      set({ isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch requests', isLoading: false });
    }
  }
}));
```