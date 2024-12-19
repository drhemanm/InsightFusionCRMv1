import React, { useState } from 'react';
import { Brain, MessageSquare, Sparkles, AlertCircle } from 'lucide-react';
import { useFeatureFlag } from '../../hooks/useFeatureFlag';
import { sentimentAnalyzer } from '../../services/ai/SentimentAnalyzer';
import { leadScoringService } from '../../services/ai/LeadScoring';

export const AIAssistant: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { enabled: aiEnabled } = useFeatureFlag('ai_insights');

  if (!aiEnabled) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          AI Assistant Not Available
        </h3>
        <p className="text-gray-600">
          Upgrade your plan to access AI-powered insights and suggestions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="h-8 w-8 text-purple-500" />
        <div>
          <h2 className="text-xl font-bold">AI Assistant</h2>
          <p className="text-sm text-gray-600">
            Get intelligent insights and suggestions
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-purple-500" size={20} />
            <h3 className="font-medium">Smart Suggestions</h3>
          </div>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-gray-800">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="text-blue-500" size={20} />
            <h3 className="font-medium">Ask AI Assistant</h3>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Ask me anything about your CRM data..."
              className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              disabled={isAnalyzing}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-purple-500 hover:bg-purple-50 rounded-full"
            >
              <Brain size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};