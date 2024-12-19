import React from 'react';
import { useOrganizationStore } from '../../store/organizationStore';
import { format } from 'date-fns';
import { Clock, User, FileText, Check, X } from 'lucide-react';

export const AuditTrail: React.FC = () => {
  const { auditLogs } = useOrganizationStore();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Audit Trail</h2>

      <div className="space-y-4">
        {auditLogs.map((log) => (
          <div
            key={log.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <User className="text-gray-400" size={20} />
                <span className="font-medium">{log.userId}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={16} />
                {format(log.metadata.timestamp, 'MMM d, yyyy HH:mm:ss')}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <FileText className="text-blue-500" size={16} />
              <span className="text-sm">
                {log.action} - {log.resource}
                {log.resourceId && ` (${log.resourceId})`}
              </span>
            </div>

            {log.changes && (
              <div className="mt-2 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Before:</h4>
                    <pre className="bg-gray-50 p-2 rounded text-xs">
                      {JSON.stringify(log.changes.before, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">After:</h4>
                    <pre className="bg-gray-50 p-2 rounded text-xs">
                      {JSON.stringify(log.changes.after, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-2 text-xs text-gray-500">
              IP: {log.metadata.ipAddress} • User Agent: {log.metadata.userAgent}
            </div>
          </div>
        ))}

        {auditLogs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No audit logs available
          </div>
        )}
      </div>
    </div>
  );
};