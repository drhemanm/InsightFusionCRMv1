import React from 'react';
import { Shield, Users, Activity, CreditCard } from 'lucide-react';
import { UserManagement } from './UserManagement';
import { UsageAnalytics } from './UsageAnalytics';
import { SubscriptionManagement } from './SubscriptionManagement';
import { GDPRCompliance } from './GDPRCompliance';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="mb-8">
          <TabsTrigger value="users">
            <Users className="mr-2" size={16} />
            Users
          </TabsTrigger>
          <TabsTrigger value="usage">
            <Activity className="mr-2" size={16} />
            Usage
          </TabsTrigger>
          <TabsTrigger value="subscriptions">
            <CreditCard className="mr-2" size={16} />
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="gdpr">
            <Shield className="mr-2" size={16} />
            GDPR
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="usage">
          <UsageAnalytics />
        </TabsContent>

        <TabsContent value="subscriptions">
          <SubscriptionManagement />
        </TabsContent>

        <TabsContent value="gdpr">
          <GDPRCompliance />
        </TabsContent>
      </Tabs>
    </div>
  );
};