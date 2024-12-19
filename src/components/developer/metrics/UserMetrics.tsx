import React from 'react';
import { Users, UserCheck, UserX } from 'lucide-react';
import { useOrganizationStore } from '../../../store/organizationStore';

export const UserMetrics: React.FC = () => {
  const { teamMembers } = useOrganizationStore();

  const metrics = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === 'active').length,
    inactive: teamMembers.filter(m => m.status !== 'active').length
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">User Metrics</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Users className="text-blue-500" />
            <span className="font-medium">Total Users</span>
          </div>
          <span className="text-2xl font-bold">{metrics.total}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <UserCheck className="text-green-500" />
            <span className="font-medium">Active Users</span>
          </div>
          <span className="text-2xl font-bold">{metrics.active}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <UserX className="text-red-500" />
            <span className="font-medium">Inactive Users</span>
          </div>
          <span className="text-2xl font-bold">{metrics.inactive}</span>
        </div>
      </div>
    </div>
  );
};