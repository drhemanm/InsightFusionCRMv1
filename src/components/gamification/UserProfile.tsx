import React from 'react';
import { Trophy, Award, Star, Target } from 'lucide-react';
import { useGamificationStore } from '../../store/gamificationStore';

export const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const { userProgress, isLoading, error } = useGamificationStore();

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!userProgress) return null;

  const { points, level, badges, achievements } = userProgress;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Progress</h2>
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" size={24} />
          <span className="text-xl font-semibold">{points} Points</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="text-blue-500" size={20} />
            <h3 className="font-semibold">Level {level}</h3>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2">
            <div
              className="bg-blue-500 rounded-full h-2"
              style={{ width: '75%' }}
            />
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-purple-500" size={20} />
            <h3 className="font-semibold">{badges.length} Badges</h3>
          </div>
          <p className="text-sm text-gray-600">
            {achievements.length} Achievements Unlocked
          </p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Target size={20} />
          Active Challenges
        </h3>
        <div className="space-y-3">
          {userProgress.currentChallenges.map((challenge) => (
            <div
              key={challenge}
              className="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
            >
              <span className="font-medium">Challenge Name</span>
              <div className="text-sm text-gray-600">
                Progress: 75%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};