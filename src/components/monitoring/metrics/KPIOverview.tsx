import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { monitoringService } from '../../../services/monitoring/monitoringService';
import type { TimeRange } from '../../../types/monitoring';

interface Props {
  timeRange: TimeRange;
}

export const KPIOverview: React.FC<Props> = ({ timeRange }) => {
  const { data: metrics } = useQuery({
    queryKey: ['kpi-metrics', timeRange],
    queryFn: () => monitoringService.getKPIMetrics(timeRange)
  });

  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MetricCard
        title="Active Subscribers"
        value={metrics.activeSubscribers}
        change={metrics.subscriberGrowth}
        icon={<Users className="text-blue-500" size={24} />}
      />
      
      <MetricCard
        title="Growth Rate"
        value={`${metrics.growthRate}%`}
        change={metrics.growthRateChange}
        icon={<TrendingUp className="text-green-500" size={24} />}
      />
      
      <MetricCard
        title="Churn Rate"
        value={`${metrics.churnRate}%`}
        change={metrics.churnRateChange}
        icon={<TrendingDown className="text-red-500" size={24} />}
      />
      
      <MetricCard
        title="API Requests"
        value={metrics.apiRequests.toLocaleString()}
        change={metrics.apiRequestsChange}
        icon={<Activity className="text-purple-500" size={24} />}
      />
    </div>
  );
};