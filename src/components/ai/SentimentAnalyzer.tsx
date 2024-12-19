import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { aiService } from '../../services/aiService';
import { MessageSquare, ThumbsUp, ThumbsDown, Copy } from 'lucide-react';

interface Props {
  content: string;
  onSuggestedResponseClick: (response: string) => void;
}

export const SentimentAnalyzer: React.FC<Props> = ({
  content,
  onSuggestedResponseClick,
}) => {
  const { data: analysis, isLoading } = useQuery({
    queryKey: ['emailAnalysis', content],
    queryFn: () => aiService.analyzeEmail(content),
    enabled: content.length > 0
  });

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyResponse = (response: string, index: number) => {
    navigator.clipboard.writeText(response);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!content) return null;
  if (isLoading) return <div>Analyzing message sentiment...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">Message Analysis</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            {analysis?.sentiment.score >= 0 ? (
              <ThumbsUp className="text-green-500" size={24} />
            ) : (
              <ThumbsDown className="text-red-500" size={24} />
            )}
            <div>
              <h3 className="font-medium">Sentiment Score</h3>
              <p className="text-sm text-gray-600">
                {analysis?.sentiment.score.toFixed(2)}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            analysis?.tone === 'positive'
              ? 'bg-green-100 text-green-800'
              : analysis?.tone === 'negative'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {analysis?.tone.charAt(0).toUpperCase() + analysis?.tone.slice(1)} Tone
          </span>
        </div>

        <div>
          <h3 className="font-medium mb-2">Key Topics</h3>
          <div className="flex flex-wrap gap-2">
            {analysis?.keyTopics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Suggested Responses</h3>
          <div className="space-y-3">
            {analysis?.suggestedResponses.map((response, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <p className="text-sm text-gray-700">{response}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSuggestedResponseClick(response)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Use
                  </button>
                  <button
                    onClick={() => handleCopyResponse(response, index)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Copy size={16} />
                  </button>
                  {copiedIndex === index && (
                    <span className="text-xs text-green-600">Copied!</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};