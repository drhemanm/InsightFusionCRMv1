import React from 'react';
import { Trophy, Star, Target, Award } from 'lucide-react';
import { useGamificationStore } from '../../store/gamificationStore';
import { GAMIFICATION_CONFIG } from '../../config/gamification';

export const UserProgress: React.FC = () => {
  const { userProgress, achievements } = useGamificationStore();

  if (!userProgress) return null;

  const currentLevel = GAMIFICATION_CONFIG.levels.find(
    level => userProgress.points >= level.threshold
  );

  const nextLevel = GAMIFICATION_CONFIG.levels.find(
    level => level.threshold > userProgress.points
  );

  const progressToNextLevel = nextLevel
    ? ((userProgress.points - (currentLevel?.threshold || 0)) /
       (nextLevel.threshold - (currentLevel?.threshold || 0))) * 100
    : 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <div>
            <h2 className="text-xl font-bold">Your Progress</h2>
            <p className="text-sm text-gray-600">
              Keep going to unlock more achievements!
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">
            {userProgress.points}
          </div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{currentLevel?.name}</span>
            {nextLevel && (
              <span className="text-sm text-gray-600">
                Next: {nextLevel.name}
              </span>
            )}
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-100">
              <div
                style={{ width: `${progressToNextLevel}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 transition-all duration-500"
              />
            </div>
          </div>
          {nextLevel && (
            <div className="text-xs text-gray-500 mt-1">
              {nextLevel.threshold - userProgress.points} points to next level
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-blue-500" size={20} />
              <h3 className="font-medium">Recent Achievements</h3>
            </div>
            <div className="text-2xl font-bold text-blue-700">
              {achievements.length}
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-green-500" size={20} />
              <h3 className="font-medium">Active Challenges</h3>
            </div>
            <div className="text-2xl font-bold text-green-700">
              {userProgress.currentChallenges.length}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-purple-500" size={20} />
            <h3 className="font-medium">Latest Achievements</h3>
          </div>
          <div className="space-y-3">
            {achievements.slice(0, 3).map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <div className="font-medium">{achievement.title}</div>
                    <div className="text-sm text-gray-600">
                      {achievement.description}
                    </div>
                  </div>
                </div>
                <div className="text-purple-600 font-medium">
                  +{achievement.points}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};