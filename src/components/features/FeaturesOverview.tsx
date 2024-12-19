import React from 'react';
import { CommunicationTools } from './CommunicationTools';
import { SalesManagement } from './SalesManagement';
import { DataAnalytics } from './DataAnalytics';
import { AutomationIntegration } from './AutomationIntegration';
import { MobileCapabilities } from './MobileCapabilities';

export const FeaturesOverview: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Platform Features</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our comprehensive suite of sales tools designed to streamline your workflow,
          boost productivity, and drive results.
        </p>
      </div>

      <CommunicationTools />
      <SalesManagement />
      <DataAnalytics />
      <AutomationIntegration />
      <MobileCapabilities />
    </div>
  );
};