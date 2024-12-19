import React from 'react';
import { useWellbeingStore } from '../../store/wellbeingStore';
import { Activity, Award, Zap, Timer } from 'lucide-react';

export const WellnessStats: React.FC = () => {
  const { wellnessStats } = useWellbeingStore();

  if (!wellnessStats) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">Wellness Overview</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Timer className="text-blue-500" size={20} />
            <h3 className="font-medium">Daily Screen Time</h3>
          </div>
          <p className="text-2xl font-bold text-blue-700">
            {Math.round(wellnessStats.dailyScreenTime / 3600)}h {Math.round((wellnessStats.dailyScreenTime % 3600) / 60)}m
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-green-500" size={20} />
            <h3 className="font-medium">Break Streak</h3>
          </div>
          <p className="text-2xl font-bold text-green-700">
            {wellnessStats.currentStreak} breaks
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Wellness Score</h3>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 rounded-full h-2"
              style={{ width: `${wellnessStats.wellnessScore}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-sm text-gray-600">
            <span>0%</span>
            <span>{wellnessStats.wellnessScore}%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Breaks Completed</div>
            <div className="text-lg font-semibold">{wellnessStats.breaksCompleted}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Longest Streak</div>
            <div className="text-lg font-semibold">{wellnessStats.longestStreak} breaks</div>
          </div>
        </div>
      </div>
    </div>
  );
};