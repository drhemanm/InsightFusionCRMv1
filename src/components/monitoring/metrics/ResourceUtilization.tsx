import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Cpu, HardDrive, Activity } from 'lucide-react';
import { UtilizationGauge } from '../ui/UtilizationGauge';
import { monitoringService } from '../../../services/monitoring/monitoringService';
import type { TimeRange } from '../../../types/monitoring';

interface Props {
  timeRange: TimeRange;
}

export const ResourceUtilization: React.FC<Props> = ({ timeRange }) => {
  const { data: metrics } = useQuery({
    queryKey: ['resource-metrics', timeRange],
    queryFn: () => monitoringService.getResourceMetrics(timeRange)
  });

  if (!metrics) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Resource Utilization</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="text-blue-500" size={20} />
            <h3 className="font-medium">CPU Usage</h3>
          </div>
          <UtilizationGauge 
            value={metrics.cpuUsage} 
            thresholds={{ warning: 70, critical: 90 }} 
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <HardDrive className="text-purple-500" size={20} />
            <h3 className="font-medium">Memory Usage</h3>
          </div>
          <UtilizationGauge 
            value={metrics.memoryUsage} 
            thresholds={{ warning: 80, critical: 95 }} 
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-green-500" size={20} />
            <h3 className="font-medium">Network Bandwidth</h3>
          </div>
          <UtilizationGauge 
            value={metrics.bandwidthUsage} 
            thresholds={{ warning: 75, critical: 90 }} 
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-4">Resource History</h3>
        <div className="space-y-4">
          {metrics.alerts.map((alert, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg ${
                alert.severity === 'critical' 
                  ? 'bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200' 
                  : 'bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200'
              }`}
            >
              <div className="font-medium">{alert.message}</div>
              <div className="text-sm mt-1">
                {new Date(alert.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};