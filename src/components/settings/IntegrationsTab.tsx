import React from 'react';
import { Mail, Calendar } from 'lucide-react';
import { IntegrationsManager } from '../integrations/IntegrationsManager';

export const IntegrationsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Integrations</h2>
      </div>

      <IntegrationsManager />

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Integration Tips</h3>
        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
          <li>Connect Gmail to sync your emails and contacts</li>
          <li>Use Google Calendar integration for meeting scheduling</li>
        </ul>
      </div>
    </div>
  );
};