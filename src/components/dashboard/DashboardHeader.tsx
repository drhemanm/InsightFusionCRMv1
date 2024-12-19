import React from 'react';
import { TimeRangeFilter } from './filters/TimeRangeFilter';
import { SettingsButton } from '../layout/navigation/SettingsButton';
import { Trophy } from 'lucide-react';
import type { TimeRange } from './filters/TimeRangeFilter';

interface DashboardHeaderProps {
  timeRange: TimeRange['value'];
  onTimeRangeChange: (value: TimeRange['value']) => void;
  onGamificationToggle: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  timeRange,
  onTimeRangeChange,
  onGamificationToggle
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <TimeRangeFilter 
          value={timeRange} 
          onChange={onTimeRangeChange} 
        />
        <button
          onClick={onGamificationToggle}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-lg hover:from-yellow-500 hover:to-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <Trophy className="text-white" size={20} />
          <span className="font-medium">Achievements</span>
        </button>
        <SettingsButton />
      </div>
    </div>
  );
};