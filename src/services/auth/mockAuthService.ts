import { ADMIN_CREDENTIALS } from '../../config/auth';
import type { LoginCredentials, AuthResponse } from '../../types/auth';

// In production, replace with actual API calls
export class MockAuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (
      credentials.email === ADMIN_CREDENTIALS.email &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      const token = 'mock_jwt_token'; // In production, use real JWT
      
      return {
        token,
        refreshToken: 'mock_refresh_token',
        user: {
          id: 'admin-1',
          email: ADMIN_CREDENTIALS.email,
          firstName: ADMIN_CREDENTIALS.firstName,
          lastName: ADMIN_CREDENTIALS.lastName,
          role: ADMIN_CREDENTIALS.role,
          organizationId: 'org-1',
          createdAt: new Date(),
          isEmailVerified: true,
          twoFactorEnabled: false
        }
      };
    }

    throw new Error('Invalid credentials');
  }

  static async refreshToken(): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return 'mock_new_jwt_token';
  }
}