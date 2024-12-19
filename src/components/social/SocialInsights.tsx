import React from 'react';
import { useSocialStore } from '../../store/socialStore';
import { Brain, TrendingUp, MessageCircle, Clock } from 'lucide-react';

interface Props {
  contactId: string;
}

export const SocialInsights: React.FC<Props> = ({ contactId }) => {
  const { insights } = useSocialStore();
  const contactInsights = insights[contactId];

  if (!contactInsights) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="text-purple-500" size={24} />
        <h2 className="text-xl font-semibold">Social Insights</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-blue-500" size={20} />
            <h3 className="font-medium">Engagement Trend</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-lg font-semibold ${
              contactInsights.insights.sentiment.trend === 'positive'
                ? 'text-green-600'
                : contactInsights.insights.sentiment.trend === 'negative'
                ? 'text-red-600'
                : 'text-gray-600'
            }`}>
              {contactInsights.insights.sentiment.trend.toUpperCase()}
            </span>
            <span className="text-sm text-gray-500">
              ({Math.round(contactInsights.insights.sentiment.overall * 100)}% positive)
            </span>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="text-purple-500" size={20} />
            <h3 className="font-medium">Key Topics</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {contactInsights.insights.topics.map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
              >
                {topic.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <Clock size={20} />
          Recommended Actions
        </h3>
        
        {contactInsights.insights.recommendedActions.map((action, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium capitalize">
                {action.type.replace('_', ' ')}
              </h4>
              {action.deadline && (
                <span className="text-sm text-gray-500">
                  Due by {format(new Date(action.deadline), 'MMM d')}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 text-sm mb-3">{action.reason}</p>
            
            {action.suggestedMessage && (
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                "{action.suggestedMessage}"
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};