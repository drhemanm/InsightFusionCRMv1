import { useCallback } from 'react';
import { useTenant } from '../context/TenantContext';

export function useTenantData<T extends { tenantId: string }>(
  data: T[],
  options: {
    filterByTenant?: boolean;
    includeShared?: boolean;
  } = { filterByTenant: true, includeShared: false }
) {
  const { tenant } = useTenant();

  const filterData = useCallback(
    (items: T[]) => {
      if (!options.filterByTenant) return items;

      return items.filter((item) => {
        const belongsToTenant = item.tenantId === tenant.id;
        const isShared = options.includeShared && item.tenantId === 'shared';
        return belongsToTenant || isShared;
      });
    },
    [tenant.id, options.filterByTenant, options.includeShared]
  );

  const addTenantId = useCallback(
    <D extends object>(data: D): D & { tenantId: string } => {
      return {
        ...data,
        tenantId: tenant.id,
      };
    },
    [tenant.id]
  );

  return {
    filteredData: filterData(data),
    addTenantId,
    tenantId: tenant.id,
  };
}