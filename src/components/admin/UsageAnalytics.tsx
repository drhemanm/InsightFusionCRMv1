import React from 'react';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { BarChart, LineChart, PieChart, TrendingUp } from 'lucide-react';

export const UsageAnalytics: React.FC = () => {
  const { usage } = useSubscriptionStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Active Users</h3>
            <Users className="text-blue-500" size={24} />
          </div>
          <div className="text-3xl font-bold">1,234</div>
          <div className="text-sm text-green-600 flex items-center mt-2">
            <TrendingUp size={16} className="mr-1" />
            +12% from last month
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">API Calls</h3>
            <Activity className="text-purple-500" size={24} />
          </div>
          <div className="text-3xl font-bold">52.5K</div>
          <div className="text-sm text-green-600 flex items-center mt-2">
            <TrendingUp size={16} className="mr-1" />
            +8% from last month
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Storage Used</h3>
            <HardDrive className="text-yellow-500" size={24} />
          </div>
          <div className="text-3xl font-bold">128GB</div>
          <div className="text-sm text-yellow-600 flex items-center mt-2">
            <AlertTriangle size={16} className="mr-1" />
            75% of limit
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Active Sessions</h3>
            <Activity className="text-green-500" size={24} />
          </div>
          <div className="text-3xl font-bold">456</div>
          <div className="text-sm text-gray-600 mt-2">
            Last 24 hours
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Usage Trends</h3>
          {/* In production, implement actual chart */}
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <LineChart size={32} className="text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Resource Distribution</h3>
          {/* In production, implement actual chart */}
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <PieChart size={32} className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Detailed Usage Metrics</h3>
        <div className="space-y-4">
          {usage.map((item) => (
            <div key={item.metric} className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium capitalize">
                  {item.metric.replace('_', ' ')}
                </span>
                <span className="text-gray-600">
                  {item.value.toLocaleString()} units
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: `${Math.min((item.value / 1000) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};