import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getStoredToken, setStoredToken, removeStoredToken, parseUserFromToken } from '../utils/auth';
import { SessionManager } from '../utils/sessionManager';

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, clearUser } = useAuthStore();
  const sessionManager = SessionManager.getInstance();

  const login = useCallback(async (email: string, password: string, remember?: boolean) => {
    try {
      // In production, make API call to get tokens
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const { token } = await response.json();
      
      if (remember) {
        setStoredToken(token);
      }

      const user = parseUserFromToken(token);
      if (user) {
        setUser(user);
        sessionManager.startSessionMonitor(() => {
          logout();
        });
        navigate('/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, [navigate, setUser]);

  const logout = useCallback(() => {
    removeStoredToken();
    clearUser();
    sessionManager.stopSessionMonitor();
    navigate('/login');
  }, [navigate, clearUser]);

  const checkAuth = useCallback(() => {
    const token = getStoredToken();
    if (token) {
      const user = parseUserFromToken(token);
      if (user) {
        setUser(user);
        sessionManager.startSessionMonitor(() => {
          logout();
        });
        return true;
      }
    }
    return false;
  }, [setUser, logout]);

  return { login, logout, checkAuth };
}