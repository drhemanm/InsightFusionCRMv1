import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Download } from 'lucide-react';

interface PerformanceChartProps {
  data: Array<{
    date: string;
    [key: string]: any;
  }>;
  metrics: Array<{
    key: string;
    name: string;
    color: string;
  }>;
  title: string;
  timeRange?: string;
  onTimeRangeChange?: (range: string) => void;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  metrics,
  title,
  timeRange = '7d',
  onTimeRangeChange
}) => {
  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: 'Year' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="text-blue-500" size={24} />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex rounded-lg overflow-hidden border">
            {timeRanges.map(range => (
              <button
                key={range.value}
                onClick={() => onTimeRangeChange?.(range.value)}
                className={`px-3 py-1.5 text-sm ${
                  timeRange === range.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          <button
            title="Download data"
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Legend />
            {metrics.map(metric => (
              <Line
                key={metric.key}
                type="monotone"
                dataKey={metric.key}
                name={metric.name}
                stroke={metric.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};