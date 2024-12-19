import React, { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { MetricsOverview } from './metrics/MetricsOverview';
import { PerformanceChart } from './charts/PerformanceChart';
import { ActivityStream } from '../analytics/ActivityStream';
import { GamificationDashboard } from '../gamification/GamificationDashboard';
import type { TimeRange } from './filters/TimeRangeFilter';

export const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange['value']>('30d');
  const [showGamification, setShowGamification] = useState(false);

  const handleTimeRangeChange = (value: TimeRange['value']) => {
    setTimeRange(value);
    // In production, fetch new data based on time range
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <DashboardHeader 
        timeRange={timeRange}
        onTimeRangeChange={handleTimeRangeChange}
        onGamificationToggle={() => setShowGamification(!showGamification)}
      />
      
      {showGamification ? (
        <GamificationDashboard />
      ) : (
        <div className="space-y-6">
          <MetricsOverview timeRange={timeRange} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceChart timeRange={timeRange} />
            <ActivityStream timeRange={timeRange} />
          </div>
        </div>
      )}
    </div>
  );
};