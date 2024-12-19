import axios from 'axios';
import { TokenManager } from '../../utils/auth/tokenManager';

const apiClient = axios.create({
  baseURL: '/.netlify/functions/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = TokenManager.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401/403 responses
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      TokenManager.removeTokens();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { apiClient };