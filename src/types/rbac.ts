```typescript
export type Permission = 
  | 'view_contacts'
  | 'create_contacts'
  | 'edit_contacts'
  | 'delete_contacts'
  | 'view_deals'
  | 'create_deals'
  | 'edit_deals'
  | 'delete_deals'
  | 'view_tasks'
  | 'create_tasks'
  | 'edit_tasks'
  | 'delete_tasks'
  | 'manage_users'
  | 'manage_roles'
  | 'view_reports'
  | 'manage_settings'
  | '*';

export type Role = 'admin' | 'manager' | 'user';

export interface RoleConfig {
  name: Role;
  permissions: Permission[];
  description: string;
}

export interface ChangeRequest {
  id: string;
  userId: string;
  type: 'create' | 'update' | 'delete';
  resource: string;
  resourceId?: string;
  changes: {
    before?: Record<string, any>;
    after?: Record<string, any>;
  };
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  adminComment?: string;
  createdAt: Date;
  updatedAt: Date;
}
```