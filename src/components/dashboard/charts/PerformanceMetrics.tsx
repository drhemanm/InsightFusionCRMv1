```typescript
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Calendar } from 'lucide-react';

const data = [
  { date: '2024-01', revenue: 85000, deals: 45, conversion: 28 },
  { date: '2024-02', revenue: 92000, deals: 52, conversion: 31 },
  { date: '2024-03', revenue: 125000, deals: 68, conversion: 35 },
  { date: '2024-04', revenue: 115000, deals: 62, conversion: 33 },
  { date: '2024-05', revenue: 108000, deals: 55, conversion: 30 },
  { date: '2024-06', revenue: 132000, deals: 71, conversion: 36 }
];

export const PerformanceMetrics: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Performance Metrics</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-400" />
            <select className="border rounded-lg px-3 py-2">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600">
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
```