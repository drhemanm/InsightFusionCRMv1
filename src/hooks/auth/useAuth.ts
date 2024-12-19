import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { AuthService } from '../../services/auth/authService';
import { TokenManager } from '../../utils/auth/tokenManager';
import { SessionManager } from '../../utils/auth/sessionManager';
import type { LoginCredentials } from '../../types/auth';

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, clearUser } = useAuthStore();
  const sessionManager = SessionManager.getInstance();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const { token, user } = await AuthService.login(credentials);
      
      if (credentials.remember) {
        TokenManager.setToken(token);
      }

      setUser(user);
      sessionManager.startMonitor(() => {
        logout();
      });
      
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, [navigate, setUser]);

  const logout = useCallback(() => {
    TokenManager.removeTokens();
    clearUser();
    sessionManager.stopMonitor();
    navigate('/login');
  }, [navigate, clearUser]);

  const checkAuth = useCallback(() => {
    const token = TokenManager.getToken();
    if (token) {
      const user = TokenManager.parseUser(token);
      if (user) {
        setUser(user);
        sessionManager.startMonitor(() => {
          logout();
        });
        return true;
      }
    }
    return false;
  }, [setUser, logout]);

  return { login, logout, checkAuth };
}