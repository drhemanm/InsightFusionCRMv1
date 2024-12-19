import React from 'react';
import { Bell, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { format } from 'date-fns';

interface Alert {
  type: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  metrics?: Record<string, any>;
}

interface Props {
  alerts: Alert[];
}

export const AlertsPanel: React.FC<Props> = ({ alerts }) => {
  const getAlertIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="text-red-500" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'info':
        return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="text-blue-500" size={24} />
          <h2 className="text-xl font-bold">System Alerts</h2>
        </div>
        <span className="text-sm text-gray-500">
          Last {alerts.length} alerts
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              alert.severity === 'critical'
                ? 'bg-red-50'
                : alert.severity === 'warning'
                ? 'bg-yellow-50'
                : 'bg-blue-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getAlertIcon(alert.severity)}
                <span className="font-medium">{alert.type}</span>
              </div>
              <span className="text-sm text-gray-500">
                {format(new Date(alert.timestamp), 'MMM d, HH:mm:ss')}
              </span>
            </div>
            <p className="text-sm text-gray-600">{alert.message}</p>
            {alert.metrics && (
              <div className="mt-2 text-sm text-gray-500">
                {Object.entries(alert.metrics).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>No alerts to display</p>
          </div>
        )}
      </div>
    </div>
  );
};