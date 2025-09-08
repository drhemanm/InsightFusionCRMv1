// src/services/auth/authService.ts - Supabase Version
import { supabase } from '../../lib/supabase';
import type { LoginCredentials, AuthResponse } from '../../types/auth';

export class AuthService {
  /**
   * Login user with email and password
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) throw error;
      if (!data.user) throw new Error('Login failed');

      // Get user profile with organization info
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          first_name,
          last_name,
          role,
          organization_id,
          created_at,
          onboarding_completed,
          organizations (
            id,
            name,
            subscription_plan
          )
        `)
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error('Profile not found');

      return {
        token: data.session?.access_token || '',
        refreshToken: data.session?.refresh_token || '',
        user: {
          id: profile.id,
          email: profile.email,
          firstName: profile.first_name || '',
          lastName: profile.last_name || '',
          role: profile.role as any,
          organizationId: profile.organization_id,
          createdAt: new Date(profile.created_at),
          isEmailVerified: data.user.email_confirmed_at !== null,
          twoFactorEnabled: false, // Extend later if needed
          organizationName: profile.organizations?.name || '',
          subscriptionPlan: profile.organizations?.subscription_plan || 'free'
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Login failed');
    }
  }

  /**
   * Register new user with automatic organization creation
   */
  static async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organizationName?: string;
  }): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            company: userData.organizationName
          }
        }
      });

      if (error) throw error;
      if (!data.user) throw new Error('Registration failed');

      // The trigger function will automatically create organization and profile
      // Wait a moment for the trigger to complete
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the created profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          first_name,
          last_name,
          role,
          organization_id,
          created_at,
          onboarding_completed,
          organizations (
            id,
            name,
            subscription_plan
          )
        `)
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error('Profile creation failed');

      return {
        token: data.session?.access_token || '',
        refreshToken: data.session?.refresh_token || '',
        user: {
          id: profile.id,
          email: profile.email,
          firstName: profile.first_name || '',
          lastName: profile.last_name || '',
          role: profile.role as any,
          organizationId: profile.organization_id,
          createdAt: new Date(profile.created_at),
          isEmailVerified: data.user.email_confirmed_at !== null,
          twoFactorEnabled: false,
          organizationName: profile.organizations?.name || '',
          subscriptionPlan: profile.organizations?.subscription_plan || 'free'
        }
      };
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Registration failed');
    }
  }

  /**
   * Logout current user
   */
  static async logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout failed');
    }
  }

  /**
   * Get current user session
   */
  static async getCurrentUser(): Promise<AuthResponse['user'] | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          first_name,
          last_name,
          role,
          organization_id,
          created_at,
          onboarding_completed,
          organizations (
            id,
            name,
            subscription_plan
          )
        `)
        .eq('id', user.id)
        .single();

      if (profileError || !profile) return null;

      return {
        id: profile.id,
        email: profile.email,
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        role: profile.role as any,
        organizationId: profile.organization_id,
        createdAt: new Date(profile.created_at),
        isEmailVerified: user.email_confirmed_at !== null,
        twoFactorEnabled: false,
        organizationName: profile.organizations?.name || '',
        subscriptionPlan: profile.organizations?.subscription_plan || 'free'
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(): Promise<string> {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      if (!data.session) throw new Error('No session found');
      
      return data.session.access_token;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw new Error('Token refresh failed');
    }
  }

  /**
   * Reset password
   */
  static async resetPassword(email: string): Promise<void> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error) throw error;
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error('Password reset failed');
    }
  }

  /**
   * Update password (when user is logged in)
   */
  static async updatePassword(newPassword: string): Promise<void> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
    } catch (error) {
      console.error('Password update error:', error);
      throw new Error('Password update failed');
    }
  }

  /**
   * Listen for auth state changes
   */
  static onAuthStateChange(callback: (user: AuthResponse['user'] | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await AuthService.getCurrentUser();
        callback(user);
      } else {
        callback(null);
      }
    });
  }

  /**
   * Update user profile
   */
  static async updateProfile(updates: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    jobTitle?: string;
  }): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const profileUpdates: Record<string, any> = {};
      if (updates.firstName !== undefined) profileUpdates.first_name = updates.firstName;
      if (updates.lastName !== undefined) profileUpdates.last_name = updates.lastName;
      if (updates.phone !== undefined) profileUpdates.phone = updates.phone;
      if (updates.jobTitle !== undefined) profileUpdates.job_title = updates.jobTitle;

      const { error } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Profile update error:', error);
      throw new Error('Profile update failed');
    }
  }

  /**
   * Check if user is authenticated
   */
  static async isAuthenticated(): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session;
    } catch (error) {
      return false;
    }
  }

  /**
   * Complete onboarding
   */
  static async completeOnboarding(): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Onboarding completion error:', error);
      throw new Error('Onboarding completion failed');
    }
  }
}
