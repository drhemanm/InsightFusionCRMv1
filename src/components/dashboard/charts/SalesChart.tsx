import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 85000, deals: 45, target: 90000 },
  { month: 'Feb', revenue: 92000, deals: 52, target: 90000 },
  { month: 'Mar', revenue: 125000, deals: 68, target: 90000 },
  { month: 'Apr', revenue: 115000, deals: 62, target: 90000 },
  { month: 'May', revenue: 108000, deals: 55, target: 90000 },
  { month: 'Jun', revenue: 132000, deals: 71, target: 90000 }
];

export const SalesChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Sales Performance</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="revenue" name="Revenue (MUR)" fill="#3B82F6" />
            <Bar yAxisId="right" dataKey="deals" name="Deals Closed" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};