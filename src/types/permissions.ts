import { z } from 'zod';

export type Permission = 
  | 'view_own_dashboard'
  | 'view_all_dashboards'
  | 'manage_own_deals'
  | 'manage_all_deals'
  | 'manage_own_contacts'
  | 'manage_all_contacts'
  | 'view_analytics'
  | 'manage_settings'
  | 'manage_users'
  | 'access_developer_tools'
  | 'view_system_metrics'
  | 'view_error_logs'
  | 'manage_backups'
  | 'view_audit_logs';

export type Role = 'developer' | 'admin' | 'user';

export const UserPermissionsSchema = z.object({
  role: z.enum(['developer', 'admin', 'user']),
  permissions: z.array(z.string()),
  dataAccess: z.enum(['all', 'own']),
  dashboardAccess: z.enum(['all', 'own']),
});

export const defaultPermissions: Record<Role, Permission[]> = {
  developer: [
    'access_developer_tools',
    'view_system_metrics',
    'view_error_logs',
    'manage_backups',
    'view_audit_logs',
    'view_all_dashboards',
    'manage_all_deals',
    'manage_all_contacts',
    'view_analytics',
    'manage_settings',
    'manage_users'
  ],
  admin: [
    'view_all_dashboards',
    'manage_all_deals',
    'manage_all_contacts',
    'view_analytics',
    'manage_settings',
    'manage_users'
  ],
  user: [
    'view_own_dashboard',
    'manage_own_deals',
    'manage_own_contacts'
  ]
};