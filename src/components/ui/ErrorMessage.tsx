import React from 'react';
import { AlertCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

interface ErrorMessageProps {
  type?: 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  details?: string;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  type = 'error',
  title,
  message,
  details,
  onClose
}) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <XCircle className="text-red-500" size={24} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={24} />;
      case 'info':
        return <Info className="text-blue-500" size={24} />;
      default:
        return <AlertCircle className="text-red-500" size={24} />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'error':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return 'bg-red-50 text-red-800 border-red-200';
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getColors()}`}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          {title && (
            <h3 className="font-medium mb-1">{title}</h3>
          )}
          <p>{message}</p>
          {details && (
            <p className="mt-2 text-sm opacity-80">{details}</p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle size={20} />
          </button>
        )}
      </div>
    </div>
  );
};