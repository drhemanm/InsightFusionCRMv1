// src/store/authStore.ts - Supabase Version
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthService } from '../services/auth/authService';
import type { User } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  clearError: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  updateProfile: (updates: ProfileUpdates) => Promise<boolean>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organizationName?: string;
  jobTitle?: string;
  phone?: string;
}

interface ProfileUpdates {
  firstName?: string;
  lastName?: string;
  phone?: string;
  jobTitle?: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await AuthService.login({ email, password });
          set({ 
            user: response.user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed', 
            isLoading: false 
          });
          return false;
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          // Import supabase here to avoid circular dependency
          const { supabase } = await import('../lib/supabase');
          
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/dashboard`
            }
          });

          if (error) throw error;

          // The actual user setup will happen in the OAuth callback
          // For now, just indicate the process started successfully
          set({ isLoading: false });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Google login failed', 
            isLoading: false 
          });
          return false;
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await AuthService.register({
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            organizationName: userData.organizationName
          });
          
          set({ 
            user: response.user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed', 
            isLoading: false 
          });
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await AuthService.logout();
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Logout failed',
            isLoading: false 
          });
        }
      },

      getCurrentUser: async () => {
        set({ isLoading: true });
        try {
          const user = await AuthService.getCurrentUser();
          if (user) {
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            set({ 
              user: null, 
              isAuthenticated: false, 
              isLoading: false 
            });
          }
        } catch (error) {
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to get user'
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await AuthService.resetPassword(email);
          set({ isLoading: false });
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Password reset failed',
            isLoading: false 
          });
          return false;
        }
      },

      updateProfile: async (updates: ProfileUpdates) => {
        set({ isLoading: true, error: null });
        try {
          await AuthService.updateProfile(updates);
          
          // Update the user in state
          const currentUser = get().user;
          if (currentUser) {
            set({ 
              user: { 
                ...currentUser, 
                ...updates 
              },
              isLoading: false 
            });
          }
          return true;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Profile update failed',
            isLoading: false 
          });
          return false;
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);

// Initialize auth state on app load
export const initializeAuth = async () => {
  const store = useAuthStore.getState();
  await store.getCurrentUser();
  
  // Set up auth state change listener
  AuthService.onAuthStateChange((user) => {
    useAuthStore.setState({
      user,
      isAuthenticated: !!user,
      isLoading: false
    });
  });
};
