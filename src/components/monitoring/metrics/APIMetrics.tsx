import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { monitoringService } from '../../../services/monitoring/monitoringService';
import type { TimeRange } from '../../../types/monitoring';

interface Props {
  timeRange: TimeRange;
}

export const APIMetrics: React.FC<Props> = ({ timeRange }) => {
  const { data: metrics } = useQuery({
    queryKey: ['api-metrics', timeRange],
    queryFn: () => monitoringService.getAPIMetrics(timeRange)
  });

  if (!metrics) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">API Performance</h2>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metrics.timeseries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="requestCount" 
              name="Requests" 
              stroke="#3B82F6" 
            />
            <Line 
              type="monotone" 
              dataKey="responseTime" 
              name="Response Time (ms)" 
              stroke="#10B981" 
            />
            <Line 
              type="monotone" 
              dataKey="errorRate" 
              name="Error Rate (%)" 
              stroke="#EF4444" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 className="font-medium mb-1">Total Requests</h3>
          <p className="text-2xl font-bold">{metrics.totalRequests.toLocaleString()}</p>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
          <h3 className="font-medium mb-1">Avg Response Time</h3>
          <p className="text-2xl font-bold">{metrics.avgResponseTime}ms</p>
        </div>

        <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
          <h3 className="font-medium mb-1">Error Rate</h3>
          <p className="text-2xl font-bold">{metrics.errorRate}%</p>
        </div>
      </div>
    </div>
  );
};