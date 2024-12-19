export const ADMIN_CREDENTIALS = {
  email: 'admin@insightfusion.com',
  password: 'Admin@123', // In production, use hashed passwords
  firstName: 'System',
  lastName: 'Administrator',
  role: 'admin' as const
};

export const AUTH_CONFIG = {
  tokenExpiry: '1d',
  refreshTokenExpiry: '7d',
  passwordRequirements: {
    minLength: 8,
    requireNumbers: true,
    requireSpecialChars: true,
    requireUppercase: true
  }
};