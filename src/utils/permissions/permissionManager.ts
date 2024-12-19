import type { Permission, Role } from '../../types/permissions';
import { defaultPermissions } from '../../types/permissions';

export class PermissionManager {
  static hasPermission(userRole: Role, permission: Permission): boolean {
    const rolePermissions = defaultPermissions[userRole];
    return rolePermissions.includes(permission);
  }

  static isDeveloper(userRole: Role): boolean {
    return userRole === 'developer';
  }

  static canAccessResource(userId: string, resourceOwnerId: string, userRole: Role): boolean {
    if (this.isDeveloper(userRole) || userRole === 'admin') return true;
    return userId === resourceOwnerId;
  }

  static filterUserData(data: any[], userId: string, userRole: Role): any[] {
    if (this.isDeveloper(userRole) || userRole === 'admin') return data;
    return data.filter(item => item.userId === userId || item.assignedTo === userId);
  }

  static getRequiredPermissions(route: string): Permission[] {
    const routePermissions: Record<string, Permission[]> = {
      '/developer': ['access_developer_tools'],
      '/developer/metrics': ['view_system_metrics'],
      '/developer/errors': ['view_error_logs'],
      '/developer/audit': ['view_audit_logs'],
      '/developer/backups': ['manage_backups']
    };

    return routePermissions[route] || [];
  }
}