// src/types/auth.ts - Enhanced for Supabase
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(['owner', 'admin', 'manager', 'user', 'agent']),
  organizationId: z.string(),
  createdAt: z.date(),
  lastLoginAt: z.date().optional(),
  isEmailVerified: z.boolean(),
  twoFactorEnabled: z.boolean(),
  
  // Enhanced fields for Supabase integration
  organizationName: z.string().optional(),
  subscriptionPlan: z.enum(['free', 'pro', 'enterprise']).optional(),
  onboardingCompleted: z.boolean().optional(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
  avatarUrl: z.string().optional()
});

export const LoginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  remember: z.boolean().optional()
});

export const RegisterCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  organizationName: z.string().optional(),
  jobTitle: z.string().optional(),
  phone: z.string().optional()
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string().optional(),
  user: UserSchema
});

export const PasswordResetSchema = z.object({
  email: z.string().email()
});

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8)
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const UpdateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional()
});

// Exported Types
export type User = z.infer<typeof UserSchema>;
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type RegisterCredentials = z.infer<typeof RegisterCredentialsSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type PasswordReset = z.infer<typeof PasswordResetSchema>;
export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>;
export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;

// Auth State for React Context
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Auth Actions for State Management
export type AuthAction = 
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_CLEAR_ERROR' }
  | { type: 'AUTH_UPDATE_USER'; payload: Partial<User> };

// Permission Types
export type Permission = 'read' | 'write' | 'delete' | 'admin';
export type Resource = 'contacts' | 'deals' | 'tasks' | 'analytics' | 'settings' | 'users';

export interface UserPermissions {
  [key: string]: {
    [P in Permission]?: boolean;
  };
}

// Session Types
export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
}
