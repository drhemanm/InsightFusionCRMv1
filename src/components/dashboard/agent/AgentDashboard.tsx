import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { AgentDeals } from './AgentDeals';
import { AgentContacts } from './AgentContacts';
import { DealMetrics } from './DealMetrics';
import { NotificationCenter } from './NotificationCenter';

export const AgentDashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome, {user?.firstName}!</h1>
        <p className="text-gray-600">Here's an overview of your deals and activities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DealMetrics agentId={user?.id} />
          <AgentDeals agentId={user?.id} />
        </div>
        <div className="space-y-6">
          <NotificationCenter agentId={user?.id} />
          <AgentContacts agentId={user?.id} />
        </div>
      </div>
    </div>
  );
};