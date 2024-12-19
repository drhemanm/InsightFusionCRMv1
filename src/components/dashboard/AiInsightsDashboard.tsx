import React from 'react';
import { Brain, TrendingUp, Users, MessageSquare, AlertTriangle, BarChart2, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { aiService } from '../../services/aiService';
import { SentimentAnalyzer } from '../ai/SentimentAnalyzer';
import { VirtualSalesCoach } from '../ai/VirtualSalesCoach';
import { CollaborationSuggestions } from '../ai/CollaborationSuggestions';

export const AiInsightsDashboard: React.FC = () => {
  const { data: insights, isLoading } = useQuery({
    queryKey: ['aiInsights'],
    queryFn: () => aiService.analyzeDealInsights('current-deal')
  });

  if (isLoading) return <div>Loading AI insights...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Win Probability</h3>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <div className="text-3xl font-bold">
            {Math.round(insights?.winProbability! * 100)}%
          </div>
          <div className="text-sm text-green-600 mt-2">
            Based on historical data
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Conversation Score</h3>
            <MessageSquare className="text-blue-500" size={24} />
          </div>
          <div className="text-3xl font-bold">92</div>
          <div className="text-sm text-blue-600 mt-2">
            Based on successful patterns
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Deal Health</h3>
            <Zap className="text-purple-500" size={24} />
          </div>
          <div className="text-3xl font-bold">Strong</div>
          <div className="text-sm text-purple-600 mt-2">
            High engagement detected
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Risk Factors</h3>
            <AlertTriangle className="text-yellow-500" size={24} />
          </div>
          <div className="text-3xl font-bold">{insights?.riskFactors.length}</div>
          <div className="text-sm text-yellow-600 mt-2">
            Identified concerns
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Conversation Analytics</h2>
            <BarChart2 className="text-blue-500" size={24} />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-4">Key Patterns in Winning Deals</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span>Open-ended Questions</span>
                  <span className="font-medium text-green-600">85% match</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span>Value Proposition Focus</span>
                  <span className="font-medium text-green-600">92% match</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span>Objection Handling</span>
                  <span className="font-medium text-yellow-600">68% match</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Communication Style Analysis</h3>
              <div className="space-y-3">
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Engagement Level</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div className="w-[90%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Response Quality</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div className="w-[85%] shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-medium mb-4">Real-Time Coaching Suggestions</h3>
            <div className="space-y-3">
              <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="text-blue-500" size={20} />
                  <span className="font-medium">Next Best Action</span>
                </div>
                <p className="text-sm text-gray-600">
                  Schedule a technical deep dive to address security concerns
                </p>
              </div>

              <div className="p-3 border border-purple-200 rounded-lg bg-purple-50">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="text-purple-500" size={20} />
                  <span className="font-medium">Communication Tip</span>
                </div>
                <p className="text-sm text-gray-600">
                  Focus on ROI metrics in the next conversation
                </p>
              </div>
            </div>
          </div>

          <CollaborationSuggestions projectRequirements={[
            'sales',
            'technical',
            'legal'
          ]} />
        </div>
      </div>

      <SentimentAnalyzer
        content="Thank you for the detailed proposal. We're excited about the potential partnership."
        onSuggestedResponseClick={(response) => {
          console.log('Selected response:', response);
        }}
      />
    </div>
  );
};