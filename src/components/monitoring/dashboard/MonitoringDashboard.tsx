import React, { useState } from 'react';
import { useMonitoringStore } from '../../../store/monitoringStore';
import { MonitoringHeader } from './MonitoringHeader';
import { KPIOverview } from '../metrics/KPIOverview';
import { APIMetrics } from '../metrics/APIMetrics';
import { ResourceUtilization } from '../metrics/ResourceUtilization';
import { DatabaseMetrics } from '../metrics/DatabaseMetrics';
import { AlertsPanel } from '../alerts/AlertsPanel';
import { TimeRangeFilter } from '../filters/TimeRangeFilter';
import type { TimeRange } from '../../../types/monitoring';

export const MonitoringDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const { isDarkMode } = useMonitoringStore();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <MonitoringHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">System Monitoring</h1>
          <TimeRangeFilter value={timeRange} onChange={setTimeRange} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <KPIOverview timeRange={timeRange} />
          <AlertsPanel />
        </div>

        <div className="space-y-6">
          <APIMetrics timeRange={timeRange} />
          <ResourceUtilization timeRange={timeRange} />
          <DatabaseMetrics timeRange={timeRange} />
        </div>
      </div>
    </div>
  );
};