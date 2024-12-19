import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { TokenManager } from '../utils/tokenManager';
import { SessionManager } from '../utils/sessionManager';
import type { LoginCredentials } from '../types';

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, clearUser } = useAuthStore();
  const sessionManager = SessionManager.getInstance();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const { token, user } = await TokenManager.authenticate(credentials);
      setUser(user);
      sessionManager.startMonitor(() => logout());
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, [navigate, setUser]);

  const logout = useCallback(() => {
    TokenManager.clearTokens();
    clearUser();
    sessionManager.stopMonitor();
    navigate('/login');
  }, [navigate, clearUser]);

  const checkAuth = useCallback(() => {
    const token = TokenManager.getToken();
    if (token && TokenManager.isTokenValid(token)) {
      const user = TokenManager.parseUser(token);
      if (user) {
        setUser(user);
        sessionManager.startMonitor(() => logout());
        return true;
      }
    }
    return false;
  }, [setUser, logout]);

  return { login, logout, checkAuth };
}