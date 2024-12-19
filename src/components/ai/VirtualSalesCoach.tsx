import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { aiService } from '../../services/aiService';
import { Brain, TrendingUp, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import type { Deal } from '../../types';

interface Props {
  deal: Deal;
}

export const VirtualSalesCoach: React.FC<Props> = ({ deal }) => {
  const { data: insights, isLoading } = useQuery({
    queryKey: ['dealInsights', deal.id],
    queryFn: () => aiService.analyzeDealInsights(deal.id)
  });

  const { data: suggestions, isLoading: loadingSuggestions } = useQuery({
    queryKey: ['coachingSuggestions', deal.id],
    queryFn: () => aiService.getSalesCoachingSuggestions(deal.id, deal)
  });

  if (isLoading || loadingSuggestions) {
    return <div>Analyzing deal data...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="text-indigo-500" size={24} />
        <h2 className="text-xl font-semibold">AI Sales Coach</h2>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-green-500" size={20} />
            <h3 className="font-medium">Win Probability</h3>
          </div>
          <div className="text-2xl font-bold text-green-700">
            {Math.round(insights?.winProbability! * 100)}%
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-yellow-500" size={20} />
            <h3 className="font-medium">Risk Factors</h3>
          </div>
          <div className="space-y-1">
            {insights?.riskFactors.map((risk, index) => (
              <div key={index} className="text-sm text-yellow-700">
                • {risk}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Recommended Actions</h3>
        {suggestions?.map((suggestion, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {suggestion.type === 'follow_up' ? (
                  <Clock className="text-blue-500" size={20} />
                ) : (
                  <CheckCircle2 className="text-green-500" size={20} />
                )}
                <h4 className="font-medium">{suggestion.suggestion}</h4>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                suggestion.priority === 'high'
                  ? 'bg-red-100 text-red-700'
                  : suggestion.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {suggestion.priority.toUpperCase()} Priority
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-3">{suggestion.reasoning}</p>

            <div className="space-y-2">
              {suggestion.nextSteps.map((step, stepIndex) => (
                <div key={stepIndex} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                    {stepIndex + 1}
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {insights?.similarDeals && insights.similarDeals.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-3">Insights from Similar Deals</h3>
          <div className="space-y-3">
            {insights.similarDeals.map((deal, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    deal.outcome === 'won'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {deal.outcome.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-600">Deal #{deal.id}</span>
                </div>
                <div className="space-y-1">
                  {deal.learnings.map((learning, lIndex) => (
                    <p key={lIndex} className="text-sm text-gray-700">
                      • {learning}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};