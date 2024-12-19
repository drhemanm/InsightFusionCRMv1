import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { aiService } from '../../services/aiService';
import { Users, Brain, CheckCircle } from 'lucide-react';
import type { CollaborationRecommendation } from '../../types/ai';

interface Props {
  projectRequirements: string[];
}

export const CollaborationSuggestions: React.FC<Props> = ({ projectRequirements }) => {
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['collaborationRecommendations', projectRequirements],
    queryFn: () => aiService.getCollaborationRecommendations(
      projectRequirements,
      [] // In production, this would be fetched from your team members API
    )
  });

  if (isLoading) return <div>Analyzing team compatibility...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="text-purple-500" size={24} />
        <h2 className="text-xl font-semibold">Recommended Collaborators</h2>
      </div>

      <div className="space-y-4">
        {recommendations?.map((rec: CollaborationRecommendation) => (
          <div
            key={rec.teamMemberId}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="text-blue-500" size={20} />
                <h3 className="font-medium">Team Member {rec.teamMemberId}</h3>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">
                  {Math.round(rec.score * 100)}% Match
                </span>
                <CheckCircle
                  className={`${
                    rec.score > 0.7 ? 'text-green-500' : 'text-gray-400'
                  }`}
                  size={16}
                />
              </div>
            </div>

            <div className="space-y-2">
              {rec.reasons.map((reason, index) => (
                <p key={index} className="text-sm text-gray-600">
                  • {reason}
                </p>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {rec.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};