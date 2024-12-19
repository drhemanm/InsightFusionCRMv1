import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Calendar } from 'lucide-react';
import type { TimeRange } from '../filters/TimeRangeFilter';

interface PerformanceChartProps {
  timeRange: TimeRange['value'];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ timeRange }) => {
  // Mock data - in production, fetch based on timeRange
  const data = [
    { date: '2024-01', revenue: 85000, deals: 45, conversion: 28 },
    { date: '2024-02', revenue: 92000, deals: 52, conversion: 31 },
    { date: '2024-03', revenue: 125000, deals: 68, conversion: 35 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Performance Metrics</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-400" />
            <span className="text-sm text-gray-600">
              {timeRange === '7d' ? 'Last 7 days' :
               timeRange === '30d' ? 'Last 30 days' :
               timeRange === '90d' ? 'Last 90 days' : 'Last year'}
            </span>
          </div>
          <button 
            className="p-2 text-gray-400 hover:text-gray-600"
            title="Download data"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              name="Revenue (MUR)"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="deals"
              name="Deals Closed"
              stroke="#10B981"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="conversion"
              name="Conversion Rate (%)"
              stroke="#F59E0B"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};