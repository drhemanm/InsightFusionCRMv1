import { create } from 'zustand';
import { socialService } from '../services/socialService';
import type { SocialProfile, SocialUpdate, SocialInsight } from '../types/social';

interface SocialStore {
  connectedProfiles: SocialProfile[];
  updates: SocialUpdate[];
  insights: Record<string, SocialInsight>;
  isLoading: boolean;
  error: string | null;

  connectProfile: (platform: SocialProfile['platform'], profileId: string) => Promise<void>;
  fetchUpdates: (contactId: string) => Promise<void>;
  getInsights: (contactId: string) => Promise<void>;
  markUpdateAsRead: (updateId: string) => void;
  markUpdateActionTaken: (updateId: string) => void;
}

export const useSocialStore = create<SocialStore>((set, get) => ({
  connectedProfiles: [],
  updates: [],
  insights: {},
  isLoading: false,
  error: null,

  connectProfile: async (platform, profileId) => {
    set({ isLoading: true });
    try {
      const profile = await socialService.connectProfile(platform, profileId);
      set(state => ({
        connectedProfiles: [...state.connectedProfiles, profile],
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to connect profile', isLoading: false });
    }
  },

  fetchUpdates: async (contactId) => {
    set({ isLoading: true });
    try {
      const updates = await socialService.fetchUpdates(contactId);
      set(state => ({
        updates: [...state.updates, ...updates],
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to fetch updates', isLoading: false });
    }
  },

  getInsights: async (contactId) => {
    set({ isLoading: true });
    try {
      const insights = await socialService.getInsights(contactId);
      set(state => ({
        insights: { ...state.insights, [contactId]: insights },
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to get insights', isLoading: false });
    }
  },

  markUpdateAsRead: (updateId) => {
    set(state => ({
      updates: state.updates.map(update =>
        update.id === updateId ? { ...update, isRead: true } : update
      )
    }));
  },

  markUpdateActionTaken: (updateId) => {
    set(state => ({
      updates: state.updates.map(update =>
        update.id === updateId ? { ...update, actionTaken: true } : update
      )
    }));
  }
}));