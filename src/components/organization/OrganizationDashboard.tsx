import React, { useState } from 'react';
import { Building2, Users, Shield, Clock } from 'lucide-react';
import { OrganizationDetails } from './OrganizationDetails';
import { UserManagementTable } from './UserManagementTable';
import { AuditTrail } from './AuditTrail';

export const OrganizationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Organization Details', icon: Building2 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'audit', label: 'Audit Trail', icon: Clock }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Organization Settings</h1>
      </div>

      <div className="flex gap-1 border-b mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 -mb-px ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon size={20} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === 'details' && <OrganizationDetails />}
        {activeTab === 'users' && <UserManagementTable />}
        {activeTab === 'audit' && <AuditTrail />}
      </div>
    </div>
  );
};