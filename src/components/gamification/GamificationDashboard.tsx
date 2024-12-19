import React from 'react';
import { UserProfile } from './UserProfile';
import { Leaderboard } from './Leaderboard';
import { Achievements } from './Achievements';
import { Challenges } from './Challenges';
import { ThemeSelector } from './ThemeSelector';
import { RewardsMarketplace } from '../rewards/RewardsMarketplace';
import { RedemptionHistory } from '../rewards/RedemptionHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { useThemeStore } from '../../store/themeStore';

export const GamificationDashboard: React.FC = () => {
  const theme = useThemeStore(state => state.themes[state.currentTheme]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold" style={{ color: theme.colors.primary }}>
          {theme.name} Dashboard
        </h1>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <div className="space-y-6">
                <UserProfile userId="current-user" />
                <Challenges />
              </div>
            </div>
            <div className="col-span-4">
              <div className="space-y-6">
                <Leaderboard />
                <Achievements />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rewards">
          <div className="space-y-8">
            <RewardsMarketplace />
            <RedemptionHistory userId="current-user" />
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <ThemeSelector />
        </TabsContent>
      </Tabs>
    </div>
  );
};