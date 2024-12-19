import React from 'react';
import { useThemeStore } from '../../store/themeStore';
import type { Badge } from '../../types/gamification';

interface Props {
  badges: Badge[];
  unlockedBadges: string[];
}

export const BadgeGrid: React.FC<Props> = ({ badges, unlockedBadges }) => {
  const { currentTheme, themes } = useThemeStore();
  const theme = themes[currentTheme];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {badges.map((badge) => {
        const isUnlocked = unlockedBadges.includes(badge.id);
        
        return (
          <div
            key={badge.id}
            className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
              isUnlocked ? '' : 'grayscale'
            }`}
          >
            <div className={`w-full aspect-square rounded-lg ${
              isUnlocked ? badge.tier === 'platinum' 
                ? 'bg-gradient-to-br from-purple-400 to-pink-400'
                : badge.tier === 'gold'
                ? 'bg-gradient-to-br from-yellow-300 to-amber-400'
                : badge.tier === 'silver'
                ? 'bg-gradient-to-br from-gray-300 to-gray-400'
                : 'bg-gradient-to-br from-amber-600 to-amber-700'
              : 'bg-gray-200'
            } flex items-center justify-center`}>
              <div className="w-3/4 h-3/4 flex items-center justify-center text-4xl">
                {badge.icon}
              </div>
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 text-white text-center p-4 transition-all duration-300">
                <h3 className="font-bold mb-1">{badge.name}</h3>
                <p className="text-sm">{badge.description}</p>
              </div>
            </div>

            {!isUnlocked && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <span className="text-sm">
                    {Math.round((0 / badge.criteria.threshold) * 100)}%
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};