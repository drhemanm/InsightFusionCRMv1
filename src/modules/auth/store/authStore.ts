import { create } from 'zustand';
import type { AuthState, LoginCredentials, User } from '../types';

export const useAuthStore = create<AuthState & {
  setUser: (user: User) => void;
  clearUser: () => void;
  login: (credentials: LoginCredentials) => Promise<boolean>;
}>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // In production, make actual API call
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false 
      });
      return false;
    }
  }
}));