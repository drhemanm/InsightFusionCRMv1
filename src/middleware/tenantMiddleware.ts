import type { Tenant, TenantUser } from '../types/tenant';
import { useSubscriptionStore } from '../store/subscriptionStore';

export async function validateTenantAccess(
  tenant: Tenant,
  user: TenantUser,
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete'
): Promise<boolean> {
  // Check if user belongs to tenant
  if (user.tenantId !== tenant.id) {
    return false;
  }

  // Check if user is active
  if (user.status !== 'active') {
    return false;
  }

  // Check plan limits
  if (!checkPlanLimits(tenant, resource)) {
    return false;
  }

  // Check user permissions
  return checkPermissions(user, resource, action);
}

function checkPlanLimits(tenant: Tenant, resource: string): boolean {
  const { plans, currentSubscription } = useSubscriptionStore.getState();
  const currentPlan = plans.find(p => p.id === currentSubscription?.planId);

  if (!currentPlan) return false;

  switch (resource) {
    case 'users':
      return tenant.features.maxUsers < currentPlan.limits.users;
    case 'contacts':
      return tenant.features.maxContacts < currentPlan.limits.contacts;
    case 'storage':
      return tenant.features.storage < currentPlan.limits.storage;
    case 'api':
      return tenant.features.apiAccess && currentPlan.limits.apiCalls !== undefined;
    default:
      return true;
  }
}

function checkPermissions(
  user: TenantUser,
  resource: string,
  action: string
): boolean {
  // Admin has full access
  if (user.role === 'admin') {
    return true;
  }

  // Check specific permissions
  const requiredPermission = `${resource}:${action}`;
  return user.permissions.some(
    (permission) =>
      permission === '*' || permission === requiredPermission
  );
}

export function applyTenantScope(query: any, tenantId: string): any {
  return {
    ...query,
    where: {
      ...query.where,
      tenantId,
    },
  };
}