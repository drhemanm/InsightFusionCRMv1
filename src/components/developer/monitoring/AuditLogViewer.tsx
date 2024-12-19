import React from 'react';
import { Clock, Search, Filter } from 'lucide-react';
import { auditLogger } from '../../../utils/audit/AuditLogger';

export const AuditLogViewer: React.FC = () => {
  const [logs, setLogs] = React.useState<any[]>([]);
  const [filter, setFilter] = React.useState('');
  const [entityType, setEntityType] = React.useState('all');

  React.useEffect(() => {
    const fetchLogs = () => {
      const allLogs = auditLogger.getEvents();
      setLogs(allLogs);
    };
    fetchLogs();
    const interval = setInterval(fetchLogs, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => {
    if (entityType !== 'all' && log.entityType !== entityType) return false;
    if (filter) {
      return (
        log.action.toLowerCase().includes(filter.toLowerCase()) ||
        log.entityId.toLowerCase().includes(filter.toLowerCase()) ||
        log.userId.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Audit Logs</h2>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search logs..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="contact">Contacts</option>
            <option value="deal">Deals</option>
            <option value="task">Tasks</option>
            <option value="user">Users</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <div key={log.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Clock className="text-gray-400" size={16} />
                <span className="text-sm text-gray-500">
                  {new Date(log.metadata.timestamp).toLocaleString()}
                </span>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {log.action}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">User:</span> {log.userId}
              </div>
              <div>
                <span className="text-gray-500">Entity:</span> {log.entityType}
              </div>
              <div>
                <span className="text-gray-500">ID:</span> {log.entityId}
              </div>
            </div>

            {log.changes && (
              <div className="mt-2 grid grid-cols-2 gap-4 text-xs">
                <div className="p-2 bg-white rounded">
                  <div className="font-medium mb-1">Before:</div>
                  <pre>{JSON.stringify(log.changes.before, null, 2)}</pre>
                </div>
                <div className="p-2 bg-white rounded">
                  <div className="font-medium mb-1">After:</div>
                  <pre>{JSON.stringify(log.changes.after, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};