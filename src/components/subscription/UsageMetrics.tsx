import React from 'react';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { HardDrive, Activity, Users } from 'lucide-react';

export const UsageMetrics: React.FC = () => {
  const { usage, plans, currentSubscription } = useSubscriptionStore();

  const currentPlan = plans.find(
    (plan) => plan.id === currentSubscription?.planId
  );

  const getUsagePercentage = (metric: string, value: number) => {
    if (!currentPlan) return 0;
    const limit = currentPlan.limits[metric as keyof typeof currentPlan.limits];
    return (value / (limit || 1)) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Resource Usage</h2>

      <div className="space-y-6">
        {usage.map((item) => {
          const percentage = getUsagePercentage(item.metric, item.value);
          
          return (
            <div key={item.metric}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {item.metric === 'storage' && <HardDrive size={20} />}
                  {item.metric === 'api_calls' && <Activity size={20} />}
                  {item.metric === 'active_users' && <Users size={20} />}
                  <span className="font-medium capitalize">
                    {item.metric.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {item.value.toLocaleString()} /{' '}
                  {currentPlan?.limits[item.metric as keyof typeof currentPlan.limits]?.toLocaleString()}
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

              {percentage > 90 && (
                <p className="text-sm text-red-600 mt-1">
                  Approaching limit. Consider upgrading your plan.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};