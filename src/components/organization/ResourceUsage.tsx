```typescript
import React from 'react';
import { HardDrive, Users, Activity } from 'lucide-react';
import { useSubscriptionStore } from '../../store/subscriptionStore';

export const ResourceUsage: React.FC = () => {
  const { usage, currentSubscription, plans } = useSubscriptionStore();
  const currentPlan = plans.find(p => p.id === currentSubscription?.planId);

  const getUsagePercentage = (metric: string, value: number) => {
    if (!currentPlan?.limits[metric]) return 0;
    return (value / currentPlan.limits[metric]) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-blue-500" size={24} />
            <div>
              <h3 className="font-medium">Active Users</h3>
              <p className="text-sm text-gray-500">Total team members</p>
            </div>
          </div>
          <div className="text-3xl font-bold mb-2">
            {usage.find(u => u.metric === 'active_users')?.value || 0}
          </div>
          <div className="text-sm text-gray-500">
            of {currentPlan?.limits.users || 0} available
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <HardDrive className="text-purple-500" size={24} />
            <div>
              <h3 className="font-medium">Storage Used</h3>
              <p className="text-sm text-gray-500">Total storage space</p>
            </div>
          </div>
          <div className="text-3xl font-bold mb-2">
            {usage.find(u => u.metric === 'storage')?.value || 0}GB
          </div>
          <div className="text-sm text-gray-500">
            of {currentPlan?.limits.storage || 0}GB available
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-green-500" size={24} />
            <div>
              <h3 className="font-medium">API Calls</h3>
              <p className="text-sm text-gray-500">Monthly API usage</p>
            </div>
          </div>
          <div className="text-3xl font-bold mb-2">
            {usage.find(u => u.metric === 'api_calls')?.value || 0}
          </div>
          <div className="text-sm text-gray-500">
            of {currentPlan?.limits.apiCalls || 0} available
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-medium mb-4">Resource Usage Details</h3>
        <div className="space-y-4">
          {usage.map((item) => {
            const percentage = getUsagePercentage(item.metric, item.value);
            return (
              <div key={item.metric}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium capitalize">
                    {item.metric.replace('_', ' ')}
                  </span>
                  <span className="text-sm text-gray-500">
                    {percentage.toFixed(1)}% used
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      percentage > 90
                        ? 'bg-red-500'
                        : percentage > 75
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
```