import React, { useState } from 'react';
import { Calendar, Trophy } from 'lucide-react';
import { MetricsOverview } from './metrics/MetricsOverview';
import { SalesChart } from './charts/SalesChart';
import { ConversionChart } from './charts/ConversionChart';
import { TrendChart } from './charts/TrendChart';
import { GamificationDashboard } from '../gamification/GamificationDashboard';

export const EnhancedDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [showGamification, setShowGamification] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-500" size={20} />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <button
            onClick={() => setShowGamification(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-lg hover:from-yellow-500 hover:to-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            <Trophy className="text-white" size={20} />
            <span className="font-medium">Achievements</span>
          </button>
        </div>
      </div>

      {showGamification ? (
        <GamificationDashboard />
      ) : (
        <>
          <MetricsOverview />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalesChart />
            <ConversionChart />
          </div>
          <TrendChart />
        </>
      )}
    </div>
  );
};