import React from 'react';
import { Trophy, Star, Award, Crown } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import type { Achievement } from '../../types/gamification';

interface Props {
  achievement: Achievement;
  unlocked?: boolean;
  showProgress?: boolean;
  progress?: number;
}

export const AchievementDisplay: React.FC<Props> = ({
  achievement,
  unlocked = false,
  showProgress = false,
  progress = 0
}) => {
  const { currentTheme, themes } = useThemeStore();
  const theme = themes[currentTheme];

  const getTrophyIcon = (points: number) => {
    if (points >= 1000) return Crown;
    if (points >= 500) return Trophy;
    if (points >= 250) return Award;
    return Star;
  };

  const Icon = getTrophyIcon(achievement.points);

  return (
    <div className={`relative p-4 rounded-lg ${
      unlocked ? 'bg-gradient-to-br from-yellow-100 to-amber-50' : 'bg-gray-100'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${
          unlocked ? 'bg-yellow-400' : 'bg-gray-300'
        }`}>
          <Icon className={unlocked ? 'text-white' : 'text-gray-400'} size={24} />
        </div>
        
        <div>
          <h3 className="font-semibold">{achievement.title}</h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>
          
          {showProgress && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {progress}% Complete
              </div>
            </div>
          )}
        </div>

        <div className="ml-auto text-right">
          <div className="text-sm font-medium text-yellow-600">
            {achievement.points} {theme.terminology.points}
          </div>
          {unlocked && achievement.unlockedAt && (
            <div className="text-xs text-gray-500">
              {new Date(achievement.unlockedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      {unlocked && (
        <div className="absolute -top-1 -right-1">
          <div className="animate-bounce">
            <Star className="text-yellow-400 fill-yellow-400" size={20} />
          </div>
        </div>
      )}
    </div>
  );
};