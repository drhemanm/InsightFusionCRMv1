import React from 'react';
import { useGamificationStore } from '../../store/gamificationStore';
import { Medal, Trophy, Award, Crown } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const { leaderboard } = useGamificationStore();

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 0:
        return {
          icon: <Trophy className="text-yellow-400 animate-bounce" size={32} />,
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          scale: 'scale-105'
        };
      case 1:
        return {
          icon: <Medal className="text-gray-400" size={28} />,
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          scale: 'scale-100'
        };
      case 2:
        return {
          icon: <Award className="text-amber-600" size={28} />,
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          scale: 'scale-100'
        };
      default:
        return {
          icon: null,
          bg: 'bg-white',
          border: 'border-gray-100',
          scale: 'scale-100'
        };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Top Performers</h2>
        <Crown className="text-yellow-400" size={24} />
      </div>

      <div className="space-y-4">
        {leaderboard.map((user, index) => {
          const style = getPositionStyle(index);
          
          return (
            <div
              key={user.userId}
              className={`
                flex items-center justify-between p-4 rounded-lg border
                transition-all duration-300 transform ${style.bg} ${style.border} ${style.scale}
                hover:shadow-md
              `}
            >
              <div className="flex items-center gap-4">
                {style.icon}
                <div>
                  <div className="font-semibold">User {user.userId}</div>
                  <div className="text-sm text-gray-600">Level {user.level}</div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="text-lg font-bold">{user.points}</div>
                <div className="text-sm text-gray-500">points</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};