import { MockAuthService } from './mockAuthService';
import type { LoginCredentials, AuthResponse } from '../../types/auth';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // In development, use mock service
      if (import.meta.env.DEV) {
        return MockAuthService.login(credentials);
      }

      // In production, make actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Login failed');
    }
  }

  static async refreshToken(): Promise<string> {
    try {
      // In development, use mock service
      if (import.meta.env.DEV) {
        return MockAuthService.refreshToken();
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: localStorage.getItem('refresh_token')
        })
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const { token } = await response.json();
      return token;
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  }
}