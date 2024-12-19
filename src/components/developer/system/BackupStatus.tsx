import React from 'react';
import { Database, CheckCircle, XCircle } from 'lucide-react';
import { backupManager } from '../../../utils/backup/BackupManager';

export const BackupStatus: React.FC = () => {
  const [lastBackup, setLastBackup] = React.useState<Date | null>(null);
  const [backupInProgress, setBackupInProgress] = React.useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Backup Status</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Database className="text-blue-500" />
            <span className="font-medium">Last Backup</span>
          </div>
          {lastBackup ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={16} />
              <span>{lastBackup.toLocaleString()}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <XCircle className="text-red-500" size={16} />
              <span>No backups yet</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Database className="text-purple-500" />
            <span className="font-medium">Status</span>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            backupInProgress
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {backupInProgress ? 'IN PROGRESS' : 'READY'}
          </span>
        </div>
      </div>
    </div>
  );
};