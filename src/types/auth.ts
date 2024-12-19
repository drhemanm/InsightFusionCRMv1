import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(['admin', 'user']),
  organizationId: z.string(),
  createdAt: z.date(),
  lastLoginAt: z.date().optional(),
  isEmailVerified: z.boolean(),
  twoFactorEnabled: z.boolean()
});

export const LoginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  remember: z.boolean().optional()
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string().optional(),
  user: UserSchema
});

export type User = z.infer<typeof UserSchema>;
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;