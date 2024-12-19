import React from 'react';
import { useGamificationStore } from '../../store/gamificationStore';
import { Lock, Unlock } from 'lucide-react';

export const Achievements: React.FC = () => {
  const { achievements, userProgress } = useGamificationStore();
  const unlockedAchievements = userProgress?.achievements || [];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Achievements</h2>
      <div className="grid grid-cols-2 gap-4">
        {achievements.map((achievement) => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          
          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border ${
                isUnlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{achievement.title}</h3>
                {isUnlocked ? (
                  <Unlock className="text-green-500" size={20} />
                ) : (
                  <Lock className="text-gray-400" size={20} />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {achievement.description}
              </p>
              <div className="text-sm font-medium text-blue-600">
                +{achievement.points} points
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};