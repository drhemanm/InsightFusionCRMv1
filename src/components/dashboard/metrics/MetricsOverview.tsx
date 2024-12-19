import React from 'react';
import { DollarSign, Users, Star, Activity } from 'lucide-react';
import type { TimeRange } from '../filters/TimeRangeFilter';

interface MetricsOverviewProps {
  timeRange: TimeRange['value'];
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ timeRange }) => {
  const metrics = [
    {
      title: "Total Revenue",
      value: "MUR 0",
      change: 0,
      icon: <DollarSign className="text-green-500" size={24} />,
      description: "Total revenue this month"
    },
    {
      title: "Active Leads",
      value: "0",
      change: 0,
      icon: <Users className="text-blue-500" size={24} />,
      description: "Leads in pipeline"
    },
    {
      title: "Conversion Rate",
      value: "0%",
      change: 0,
      icon: <Star className="text-yellow-500" size={24} />,
      description: "Average conversion rate"
    },
    {
      title: "Tasks Completed",
      value: "0",
      change: 0,
      icon: <Activity className="text-purple-500" size={24} />,
      description: "Tasks completed this week"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {metric.icon}
              <div>
                <h3 className="font-medium">{metric.title}</h3>
              </div>
            </div>
          </div>
          
          <div className="text-3xl font-bold mb-2">{metric.value}</div>
          
          <div className="flex items-center gap-2">
            <span className={`text-sm ${
              metric.change > 0 ? 'text-green-600' : metric.change < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </span>
            <span className="text-sm text-gray-500">vs. previous {timeRange}</span>
          </div>
          
          <p className="text-sm text-gray-500 mt-2">{metric.description}</p>
        </div>
      ))}
    </div>
  );
};