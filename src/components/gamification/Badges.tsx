import React from 'react';
import { useGamificationStore } from '../../store/gamificationStore';
import { useThemeStore } from '../../store/themeStore';
import { Star, Award, Trophy, Crown } from 'lucide-react';

const BADGE_TIERS = {
  bronze: { color: 'bg-amber-600', icon: Star },
  silver: { color: 'bg-gray-400', icon: Award },
  gold: { color: 'bg-yellow-400', icon: Trophy },
  platinum: { color: 'bg-gradient-to-r from-purple-400 to-pink-400', icon: Crown },
};

export const Badges: React.FC = () => {
  const { badges } = useGamificationStore();
  const theme = useThemeStore(state => state.themes[state.currentTheme]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Achievement Badges</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {badges.map((badge) => {
          const tierConfig = BADGE_TIERS[badge.tier];
          const Icon = tierConfig.icon;
          
          return (
            <div
              key={badge.id}
              className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className={`
                w-full aspect-square rounded-lg ${tierConfig.color}
                flex items-center justify-center
                shadow-lg group-hover:shadow-xl
              `}>
                <Icon size={48} className="text-white" />
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 text-white text-center p-4 transition-all duration-300">
                  <h3 className="font-bold mb-1">{badge.name}</h3>
                  <p className="text-sm">{badge.description}</p>
                </div>
              </div>

              {!badge.unlockedAt && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-lg flex items-center justify-center">
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
    </div>
  );
};