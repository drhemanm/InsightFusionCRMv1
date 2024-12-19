import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2024-01', leads: 150, conversions: 45, rate: 30 },
  { date: '2024-02', leads: 180, conversions: 52, rate: 29 },
  { date: '2024-03', leads: 234, conversions: 68, rate: 29 },
  { date: '2024-04', leads: 256, conversions: 72, rate: 28 },
  { date: '2024-05', leads: 220, conversions: 65, rate: 30 },
  { date: '2024-06', leads: 265, conversions: 82, rate: 31 }
];

export const TrendChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Conversion Trends</h2>
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
              dataKey="leads" 
              name="Total Leads"
              stroke="#3B82F6" 
              activeDot={{ r: 8 }}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="conversions" 
              name="Conversions"
              stroke="#10B981" 
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="rate" 
              name="Conversion Rate (%)"
              stroke="#F59E0B" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};