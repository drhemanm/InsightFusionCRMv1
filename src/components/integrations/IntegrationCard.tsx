import React from 'react';
import { Check, X } from 'lucide-react';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  title,
  description,
  icon,
  isConnected,
  onConnect,
  onDisconnect
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <span className="flex items-center gap-1 text-sm text-green-600">
              <Check size={16} />
              Connected
            </span>
          ) : (
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <X size={16} />
              Not Connected
            </span>
          )}
        </div>
      </div>

      <button
        onClick={isConnected ? onDisconnect : onConnect}
        className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
          isConnected
            ? 'bg-red-50 text-red-600 hover:bg-red-100'
            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
        }`}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
};