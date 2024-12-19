import React from 'react';
import { Activity, Server, Database, Globe } from 'lucide-react';
import { systemHealth } from '../../../utils/monitoring/systemHealth';

export const SystemHealth: React.FC = () => {
  const [metrics, setMetrics] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchMetrics = async () => {
      const data = await systemHealth.getHealthMetrics();
      setMetrics(data);
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">System Health</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Server className={metrics.status === 'healthy' ? 'text-green-500' : 'text-red-500'} />
            <span className="font-medium">System Status</span>
          </div>
          <span className="text-2xl font-bold capitalize">{metrics.status}</span>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-blue-500" />
            <span className="font-medium">Response Time</span>
          </div>
          <span className="text-2xl font-bold">{Math.round(metrics.responseTime)}ms</span>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Database className="text-purple-500" />
            <span className="font-medium">Memory Usage</span>
          </div>
          <span className="text-2xl font-bold">{Math.round(metrics.memoryUsage * 100)}%</span>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="text-yellow-500" />
            <span className="font-medium">Error Rate</span>
          </div>
          <span className="text-2xl font-bold">{metrics.errorRate.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};