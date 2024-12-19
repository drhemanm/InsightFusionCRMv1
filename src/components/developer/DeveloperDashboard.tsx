import React from 'react';
import { Shield } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { PerformanceMetrics } from './metrics/PerformanceMetrics';
import { SystemHealth } from './metrics/SystemHealth';
import { UserMetrics } from './metrics/UserMetrics';
import { ErrorMonitor } from './monitoring/ErrorMonitor';
import { AuditLogViewer } from './monitoring/AuditLogViewer';
import { BackupStatus } from './system/BackupStatus';
import { PermissionManager } from '../../utils/permissions/permissionManager';

export const DeveloperDashboard: React.FC = () => {
  const { user } = useAuthStore();

  // Only allow access to users with developer role
  if (!user || !PermissionManager.hasPermission(user.role, 'access_developer_tools')) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Developer Access Required</h2>
          <p className="text-gray-600">You need developer credentials to access this dashboard.</p>
          <p className="text-sm text-gray-500 mt-4">
            Contact your system administrator for access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Developer Dashboard</h1>
          <p className="text-gray-600">System monitoring and diagnostics</p>
        </div>
        <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
          <Shield size={16} />
          Developer Mode
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SystemHealth />
        <PerformanceMetrics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <UserMetrics />
        <BackupStatus />
        <ErrorMonitor />
      </div>

      <AuditLogViewer />
    </div>
  );
};