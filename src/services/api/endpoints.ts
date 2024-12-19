// Base API URL from environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    refreshToken: `${BASE_URL}/auth/refresh-token`,
  },

  // Contact endpoints
  contacts: {
    base: `${BASE_URL}/api/contacts`,
    getById: (id: string) => `${BASE_URL}/api/contacts/${id}`,
    update: (id: string) => `${BASE_URL}/api/contacts/${id}`,
    delete: (id: string) => `${BASE_URL}/api/contacts/${id}`,
  },

  // Deal endpoints
  deals: {
    base: `${BASE_URL}/api/deals`,
    getById: (id: string) => `${BASE_URL}/api/deals/${id}`,
    update: (id: string) => `${BASE_URL}/api/deals/${id}`,
    delete: (id: string) => `${BASE_URL}/api/deals/${id}`,
  },

  // Task endpoints
  tasks: {
    base: `${BASE_URL}/api/tasks`,
    getById: (id: string) => `${BASE_URL}/api/tasks/${id}`,
    update: (id: string) => `${BASE_URL}/api/tasks/${id}`,
    delete: (id: string) => `${BASE_URL}/api/tasks/${id}`,
  },

  // Organization endpoints
  organizations: {
    base: `${BASE_URL}/api/organizations`,
    getById: (id: string) => `${BASE_URL}/api/organizations/${id}`,
    update: (id: string) => `${BASE_URL}/api/organizations/${id}`,
  },
};