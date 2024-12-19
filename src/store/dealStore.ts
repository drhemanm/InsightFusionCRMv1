import { create } from 'zustand';
import type { Deal } from '../types/deals';

interface DealStore {
  deals: Deal[];
  isLoading: boolean;
  error: string | null;
  fetchDeals: () => Promise<void>;
  addDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Deal>;
  updateDeal: (id: string, updates: Partial<Deal>) => Promise<void>;
  deleteDeal: (id: string) => Promise<void>;
}

export const useDealStore = create<DealStore>((set, get) => ({
  deals: [],
  isLoading: false,
  error: null,

  fetchDeals: async () => {
    set({ isLoading: true });
    try {
      // In production, fetch from API
      const deals: Deal[] = [];
      set({ deals, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch deals', isLoading: false });
    }
  },

  addDeal: async (dealData) => {
    set({ isLoading: true });
    try {
      const newDeal: Deal = {
        id: crypto.randomUUID(),
        ...dealData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      set(state => ({
        deals: [...state.deals, newDeal],
        isLoading: false
      }));
      return newDeal;
    } catch (error) {
      set({ error: 'Failed to add deal', isLoading: false });
      throw error;
    }
  },

  updateDeal: async (id, updates) => {
    set({ isLoading: true });
    try {
      set(state => ({
        deals: state.deals.map(deal =>
          deal.id === id ? { ...deal, ...updates, updatedAt: new Date() } : deal
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update deal', isLoading: false });
      throw error;
    }
  },

  deleteDeal: async (id) => {
    set({ isLoading: true });
    try {
      set(state => ({
        deals: state.deals.filter(deal => deal.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete deal', isLoading: false });
      throw error;
    }
  }
}));