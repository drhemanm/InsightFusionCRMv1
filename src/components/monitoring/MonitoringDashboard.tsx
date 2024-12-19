import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Server, Database } from 'lucide-react';
import { monitoringService } from '../../services/monitoring/MonitoringService';
import { SystemStatus } from './SystemStatus';
import { PerformanceMetrics } from './PerformanceMetrics';
import { ErrorReport } from './ErrorReport';
import { AlertsPanel } from './AlertsPanel';

export const MonitoringDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 60000); // Refresh every minute
    
    // Subscribe to alerts
    monitoringService.subscribeToAlerts((alert) => {
      setAlerts(prev => [alert, ...prev].slice(0, 100));
    });

    return () => clearInterval(interval);
  }, [timeRange]);

  const loadMetrics = async () => {
    const data = await monitoringService.getMetrics(timeRange);
    setMetrics(data);
  };

  if (!metrics) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">System Monitoring</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="1h">Last Hour</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SystemStatus
          icon={Server}
          title="System Status"
          status={metrics.health.status}
          uptime={metrics.health.uptime}
        />
        <SystemStatus
          icon={Activity}
          title="Response Time"
          value={`${Math.round(metrics.performance[0]?.responseTime || 0)}ms`}
          status={metrics.performance[0]?.responseTime > 1000 ? 'warning' : 'healthy'}
        />
        <SystemStatus
          icon={AlertTriangle}
          title="Error Rate"
          value={`${metrics.summary.avgErrorRate.toFixed(2)}%`}
          status={metrics.summary.avgErrorRate > 5 ? 'critical' : 'healthy'}
        />
        <SystemStatus
          icon={Database}
          title="Memory Usage"
          value={`${Math.round(metrics.summary.avgMemoryUsage * 100)}%`}
          status={metrics.summary.avgMemoryUsage > 0.9 ? 'warning' : 'healthy'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceMetrics metrics={metrics.performance} />
        <ErrorReport timeRange={timeRange} />
      </div>

      <AlertsPanel alerts={alerts} />
    </div>
  );
};