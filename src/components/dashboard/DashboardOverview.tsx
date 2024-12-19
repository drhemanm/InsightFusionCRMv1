import React from 'react';
import { DollarSign, Users, Star, Activity } from 'lucide-react';
import { MetricsCard } from '../analytics/MetricsCard';
import { PerformanceChart } from '../analytics/PerformanceChart';
import { ConversionFunnel } from '../analytics/ConversionFunnel';
import { ActivityStream } from '../analytics/ActivityStream';
import { useFeatureFlag } from '../../hooks/useFeatureFlag';

export const DashboardOverview: React.FC = () => {
  const { enabled: hasAnalytics } = useFeatureFlag('analytics_dashboard');

  const metrics = [
    {
      title: 'Total Revenue',
      value: 'MUR 125,000',
      change: 12.5,
      icon: <DollarSign className="text-green-500" size={24} />,
      description: 'Total revenue this month'
    },
    {
      title: 'Active Leads',
      value: '234',
      change: 8.2,
      icon: <Users className="text-blue-500" size={24} />,
      description: 'Leads in pipeline'
    },
    {
      title: 'Conversion Rate',
      value: '28.5%',
      change: -2.1,
      icon: <Star className="text-yellow-500" size={24} />,
      description: 'Average conversion rate'
    },
    {
      title: 'Tasks Completed',
      value: '156',
      change: 15.3,
      icon: <Activity className="text-purple-500" size={24} />,
      description: 'Tasks completed this week'
    }
  ];

  const performanceData = [
    { date: '2024-01', revenue: 85000, leads: 150, deals: 45 },
    { date: '2024-02', revenue: 92000, leads: 180, deals: 52 },
    { date: '2024-03', revenue: 125000, leads: 234, deals: 68 }
  ];

  const funnelSteps = [
    { label: 'Leads', value: 1000, percentage: 100, color: '#3B82F6' },
    { label: 'Qualified', value: 750, percentage: 75, color: '#10B981' },
    { label: 'Proposals', value: 500, percentage: 50, color: '#F59E0B' },
    { label: 'Negotiations', value: 300, percentage: 30, color: '#6366F1' },
    { label: 'Closed Won', value: 200, percentage: 20, color: '#22C55E' }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'deal',
      title: 'New deal created',
      description: 'Enterprise package - MUR 50,000',
      timestamp: new Date(),
      user: { name: 'John Doe' }
    },
    {
      id: '2',
      type: 'contact',
      title: 'Contact updated',
      description: 'Updated contact information for ABC Corp',
      timestamp: new Date(),
      user: { name: 'Jane Smith' }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricsCard key={index} {...metric} />
        ))}
      </div>

      {hasAnalytics && (
        <>
          {/* Performance Chart */}
          <PerformanceChart
            data={performanceData}
            metrics={[
              { key: 'revenue', name: 'Revenue', color: '#3B82F6' },
              { key: 'leads', name: 'Leads', color: '#10B981' },
              { key: 'deals', name: 'Deals', color: '#F59E0B' }
            ]}
            title="Performance Overview"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conversion Funnel */}
            <ConversionFunnel
              steps={funnelSteps}
              title="Sales Pipeline"
            />

            {/* Activity Stream */}
            <ActivityStream
              events={recentActivity}
              title="Recent Activity"
            />
          </div>
        </>
      )}
    </div>
  );
};