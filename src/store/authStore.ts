// src/store/authStore.ts - Fixed Version
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationName?: string;
  jobTitle?: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean; // This was the issue - make sure it's properly set
}

interface AuthActions {
  // Authentication methods
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<boolean>;
  
  // Profile methods
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>;
  loadProfile: () => Promise<void>;
  
  // Utility methods
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
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

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state - EXPLICITLY set isInitialized to false
      user: null,
      profile: null,
      session: null,
      isLoading: false,
      error: null,
      isInitialized: false, // This must be explicitly false initially

      // Authentication methods
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user && data.session) {
            set({ 
              user: data.user, 
              session: data.session,
              isLoading: false 
            });
            
            // Load user profile
            await get().loadProfile();
            return true;
          }
          
          throw new Error('Login failed');
        } catch (error: any) {
          set({ 
            error: error.message || 'Login failed',
            isLoading: false 
          });
          return false;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        
        try {
          // Register user with Supabase Auth
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
              data: {
                first_name: data.firstName,
                last_name: data.lastName,
                organization_name: data.organizationName,
                job_title: data.jobTitle,
                phone: data.phone,
              }
            }
          });

          if (authError) throw authError;

          if (authData.user) {
            // Create user profile in profiles table
            const profileData = {
              id: authData.user.id,
              email: data.email,
              first_name: data.firstName,
              last_name: data.lastName,
              organization_name: data.organizationName,
              job_title: data.jobTitle,
              phone: data.phone,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };

            const { error: profileError } = await supabase
              .from('profiles')
              .insert([profileData]);

            if (profileError) {
              console.error('Profile creation error:', profileError);
              // Don't throw here - user is still created in auth
            }

            set({ 
              user: authData.user,
              session: authData.session,
              isLoading: false 
            });

            // Load the newly created profile
            await get().loadProfile();
            return true;
          }
          
          throw new Error('Registration failed');
        } catch (error: any) {
          set({ 
            error: error.message || 'Registration failed',
            isLoading: false 
          });
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          
          set({ 
            user: null,
            profile: null,
            session: null,
            isLoading: false,
            error: null 
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Logout failed',
            isLoading: false 
          });
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/dashboard`
            }
          });

          if (error) throw error;
          
          // Note: The actual user data will be set via the auth state change listener
          set({ isLoading: false });
          return true;
        } catch (error: any) {
          set({ 
            error: error.message || 'Google login failed',
            isLoading: false 
          });
          return false;
        }
      },

      // Profile methods
      updateProfile: async (updates: Partial<UserProfile>) => {
        const { user } = get();
        if (!user) return false;

        set({ isLoading: true, error: null });
        
        try {
          const updateData = {
            ...updates,
            updated_at: new Date().toISOString(),
          };

          const { data, error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', user.id)
            .select()
            .single();

          if (error) throw error;

          // Convert snake_case to camelCase for frontend
          const profile: UserProfile = {
            id: data.id,
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name,
            organizationName: data.organization_name,
            jobTitle: data.job_title,
            phone: data.phone,
            avatar: data.avatar,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };

          set({ 
            profile,
            isLoading: false 
          });
          
          return true;
        } catch (error: any) {
          set({ 
            error: error.message || 'Profile update failed',
            isLoading: false 
          });
          return false;
        }
      },

      loadProfile: async () => {
        const { user } = get();
        if (!user) return;

        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            // If profile doesn't exist, create a minimal one
            if (error.code === 'PGRST116') {
              const { data: userData } = await supabase.auth.getUser();
              if (userData.user?.user_metadata) {
                const metadata = userData.user.user_metadata;
                const newProfile = {
                  id: user.id,
                  email: user.email!,
                  first_name: metadata.first_name || metadata.full_name?.split(' ')[0] || '',
                  last_name: metadata.last_name || metadata.full_name?.split(' ').slice(1).join(' ') || '',
                  organization_name: metadata.organization_name || null,
                  job_title: metadata.job_title || null,
                  phone: metadata.phone || null,
                  avatar: metadata.avatar_url || null,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                };

                const { data: createdProfile } = await supabase
                  .from('profiles')
                  .insert([newProfile])
                  .select()
                  .single();

                if (createdProfile) {
                  const profile: UserProfile = {
                    id: createdProfile.id,
                    email: createdProfile.email,
                    firstName: createdProfile.first_name,
                    lastName: createdProfile.last_name,
                    organizationName: createdProfile.organization_name,
                    jobTitle: createdProfile.job_title,
                    phone: createdProfile.phone,
                    avatar: createdProfile.avatar,
                    createdAt: createdProfile.created_at,
                    updatedAt: createdProfile.updated_at,
                  };
                  set({ profile });
                }
              }
            }
            return;
          }

          // Convert snake_case to camelCase
          const profile: UserProfile = {
            id: data.id,
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name,
            organizationName: data.organization_name,
            jobTitle: data.job_title,
            phone: data.phone,
            avatar: data.avatar,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };

          set({ profile });
        } catch (error: any) {
          console.error('Load profile error:', error);
          set({ error: error.message || 'Failed to load profile' });
        }
      },

      // Utility methods
      clearError: () => set({ error: null }),
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),

      initialize: async () => {
        console.log('🔄 Initializing auth store...');
        
        try {
          set({ isLoading: true });
          
          // Get initial session
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Session error:', error);
            set({ isInitialized: true, isLoading: false });
            return;
          }

          if (session?.user) {
            console.log('✅ Found existing session');
            set({ 
              user: session.user, 
              session: session 
            });
            await get().loadProfile();
          }

          set({ isInitialized: true, isLoading: false });
          console.log('✅ Auth store initialized');
        } catch (error) {
          console.error('Initialize error:', error);
          set({ isInitialized: true, isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        session: state.session,
        profile: state.profile 
      }),
    }
  )
);

// Initialize auth state and set up listener
export const initializeAuth = () => {
  console.log('🚀 Starting auth initialization...');
  
  // Initialize the store
  useAuthStore.getState().initialize();

  // Listen for auth changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('🔔 Auth state changed:', event);
    const { loadProfile } = useAuthStore.getState();
    
    if (event === 'SIGNED_IN' && session?.user) {
      useAuthStore.setState({ 
        user: session.user, 
        session: session 
      });
      await loadProfile();
    } else if (event === 'SIGNED_OUT') {
      useAuthStore.setState({ 
        user: null, 
        session: null, 
        profile: null 
      });
    } else if (event === 'TOKEN_REFRESHED' && session?.user) {
      useAuthStore.setState({ 
        user: session.user, 
        session: session 
      });
    }
  });
};
