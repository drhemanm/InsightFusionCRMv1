import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { logger } from '../../../utils/monitoring/logger';

export const ErrorMonitor: React.FC = () => {
  const [errors, setErrors] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchErrors = () => {
      const logs = logger.getLogs('error');
      setErrors(logs);
    };
    fetchErrors();
    const interval = setInterval(fetchErrors, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Error Monitor</h2>
      
      <div className="space-y-4">
        {errors.map((error, index) => (
          <div key={index} className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-red-500" />
              <span className="font-medium">{error.message}</span>
            </div>
            <div className="text-sm text-gray-600">
              {new Date(error.timestamp).toLocaleString()}
            </div>
            {error.context && (
              <pre className="mt-2 text-xs bg-white p-2 rounded">
                {JSON.stringify(error.context, null, 2)}
              </pre>
            )}
          </div>
        ))}

        {errors.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No errors logged
          </div>
        )}
      </div>
    </div>
  );
};