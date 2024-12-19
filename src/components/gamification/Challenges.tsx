import React from 'react';
import { Target, Clock, Trophy, ArrowRight } from 'lucide-react';
import { useGamificationStore } from '../../store/gamificationStore';
import { format } from 'date-fns';

export const Challenges: React.FC = () => {
  const { challenges, userProgress, joinChallenge } = useGamificationStore();

  const handleJoinChallenge = async (challengeId: string) => {
    if (userProgress) {
      await joinChallenge(userProgress.userId, challengeId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-green-500" />
          <div>
            <h2 className="text-xl font-bold">Active Challenges</h2>
            <p className="text-sm text-gray-600">
              Complete challenges to earn rewards
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((challenge) => {
          const isParticipating = userProgress?.currentChallenges.includes(challenge.id);
          const progress = isParticipating
            ? challenge.progress[userProgress!.userId] || 0
            : 0;
          const progressPercentage = (progress / challenge.criteria.target) * 100;

          return (
            <div
              key={challenge.id}
              className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="text-yellow-500" size={24} />
                  <h3 className="font-semibold">{challenge.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>
                    {format(new Date(challenge.endDate), 'MMM d')}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{challenge.description}</p>

              <div className="flex items-center gap-4 mb-4">
                <Trophy className="text-yellow-400" size={20} />
                <div>
                  <span className="font-medium text-lg">
                    {challenge.reward.points}
                  </span>
                  <span className="text-gray-600 text-sm ml-1">points</span>
                </div>
              </div>

              {isParticipating ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleJoinChallenge(challenge.id)}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 transition-colors"
                >
                  <span>Accept Challenge</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};