import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  status?: 'healthy' | 'degraded' | 'critical';
  value?: string;
  uptime?: number;
}

export const SystemStatus: React.FC<Props> = ({
  icon: Icon,
  title,
  status,
  value,
  uptime
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'text-green-500';
      case 'degraded':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatUptime = (ms: number) => {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `${days}d ${hours}h`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className={getStatusColor()} size={24} />
        <h3 className="font-medium">{title}</h3>
      </div>

      <div className="space-y-2">
        {status && (
          <div className={`text-2xl font-bold ${getStatusColor()}`}>
            {status.toUpperCase()}
          </div>
        )}
        {value && (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {uptime && (
          <div className="text-sm text-gray-500">
            Uptime: {formatUptime(uptime)}
          </div>
        )}
      </div>
    </div>
  );
};