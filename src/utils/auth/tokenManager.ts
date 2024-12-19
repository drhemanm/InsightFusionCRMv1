import { jwtDecode } from 'jwt-decode';
import type { User } from '../../types/auth';

export const TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export class TokenManager {
  static getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  static removeTokens(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  static isTokenValid(token: string): boolean {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp! * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  static parseUser(token: string): User | null {
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }
}