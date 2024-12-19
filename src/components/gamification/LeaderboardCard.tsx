```typescript
import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import type { UserProgress } from '../../types/gamification';

interface Props {
  user: UserProgress;
  rank: number;
  showDetails?: boolean;
}

export const LeaderboardCard: React.FC<Props> = ({ user, rank, showDetails = false }) => {
  const { currentTheme, themes } = useThemeStore();
  const theme = themes[currentTheme];

  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-400" size={24} />;
      case 2:
        return <Medal className="text-gray-400" size={24} />;
      case 3:
        return <Award className="text-amber-600" size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className={`p-4 rounded-lg transition-all duration-300 ${
      rank === 1 
        ? 'bg-yellow-50 border-2 border-yellow-200'
        : rank === 2
        ? 'bg-gray-50 border border-gray-200'
        : rank === 3
        ? 'bg-amber-50 border border-amber-200'
        : 'bg-white border border-gray-100'
    }`}>
      <div className="flex items-center gap-4">
        {getRankIcon()}
        
        <div className="flex-1">
          <div className="font-medium">User {user.userId}</div>
          <div className="text-sm text-gray-500">
            Level {user.level}
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-bold">
            {user.points}
          </div>
          <div className="text-xs text-gray-500">
            {theme.terminology.points}
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="font-medium">{user.stats.dealsClosedCount}</div>
            <div className="text-gray-500">Deals</div>
          </div>
          <div>
            <div className="font-medium">{user.stats.tasksCompletedCount}</div>
            <div className="text-gray-500">Tasks</div>
          </div>
          <div>
            <div className="font-medium">${user.stats.revenueGenerated.toLocaleString()}</div>
            <div className="text-gray-500">Revenue</div>
          </div>
        </div>
      )}
    </div>
  );
};
```