import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { performanceMonitor } from '../../../utils/performance/PerformanceMonitor';

export const PerformanceMetrics: React.FC = () => {
  const [metrics, setMetrics] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchMetrics = () => {
      const data = performanceMonitor.getMetrics();
      setMetrics(data);
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000); // Update every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleString()}
              formatter={(value: number) => [`${value}ms`, 'Response Time']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="responseTime" 
              stroke="#3B82F6" 
              name="Response Time"
            />
            <Line 
              type="monotone" 
              dataKey="memoryUsage" 
              stroke="#8B5CF6" 
              name="Memory Usage"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};