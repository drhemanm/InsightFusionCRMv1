import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Database, Clock, AlertTriangle } from 'lucide-react';
import { monitoringService } from '../../../services/monitoring/monitoringService';
import type { TimeRange } from '../../../types/monitoring';

interface Props {
  timeRange: TimeRange;
}

export const DatabaseMetrics: React.FC<Props> = ({ timeRange }) => {
  const { data: metrics } = useQuery({
    queryKey: ['database-metrics', timeRange],
    queryFn: () => monitoringService.getDatabaseMetrics(timeRange)
  });

  if (!metrics) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Database className="text-indigo-500" size={24} />
          <h2 className="text-xl font-bold">Database Performance</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-indigo-500" size={20} />
            <h3 className="font-medium">Query Response Time</h3>
          </div>
          <p className="text-2xl font-bold">{metrics.avgQueryTime}ms</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {metrics.queryTimeChange > 0 ? '+' : ''}{metrics.queryTimeChange}% vs last period
          </p>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-blue-500" size={20} />
            <h3 className="font-medium">Active Connections</h3>
          </div>
          <p className="text-2xl font-bold">{metrics.activeConnections}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {metrics.connectionPoolUsage}% pool utilization
          </p>
        </div>

        <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-red-500" size={20} />
            <h3 className="font-medium">Failed Queries</h3>
          </div>
          <p className="text-2xl font-bold">{metrics.failedQueries}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {metrics.failedQueryRate}% failure rate
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium mb-4">Slow Queries</h3>
        {metrics.slowQueries.map((query, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{query.query}</span>
              <span className="text-sm text-gray-500">{query.executionTime}ms</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Executed {query.count} times
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};