```typescript
import type { Permission, Role, RoleConfig } from '../../types/rbac';

const roleConfigs: Record<Role, RoleConfig> = {
  admin: {
    name: 'admin',
    permissions: ['*'],
    description: 'Full system access with all permissions'
  },
  manager: {
    name: 'manager',
    permissions: [
      'view_contacts',
      'create_contacts',
      'edit_contacts',
      'view_deals',
      'create_deals',
      'edit_deals',
      'view_tasks',
      'create_tasks',
      'edit_tasks',
      'view_reports'
    ],
    description: 'Team management with limited administrative access'
  },
  user: {
    name: 'user',
    permissions: [
      'view_contacts',
      'view_deals',
      'view_tasks',
      'create_tasks',
      'edit_tasks'
    ],
    description: 'Basic user access with limited permissions'
  }
};

export class RoleManager {
  static hasPermission(role: Role, permission: Permission): boolean {
    const config = roleConfigs[role];
    if (!config) return false;
    return config.permissions.includes('*') || config.permissions.includes(permission);
  }

  static getRolePermissions(role: Role): Permission[] {
    return roleConfigs[role]?.permissions || [];
  }

  static getRoleConfig(role: Role): RoleConfig | null {
    return roleConfigs[role] || null;
  }

  static getAllRoles(): RoleConfig[] {
    return Object.values(roleConfigs);
  }
}
```