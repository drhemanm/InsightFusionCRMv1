import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { Brain, Check, X, Edit2, PlayCircle } from 'lucide-react';
import type { WorkflowAction } from '../../types/workflow';

interface Props {
  context: WorkflowAction['context'];
}

export const AutomationSuggestions: React.FC<Props> = ({ context }) => {
  const {
    currentSuggestions,
    executeSuggestion,
    modifySuggestion,
    rejectSuggestion
  } = useWorkflowStore();

  const getActionIcon = (type: WorkflowAction['type']) => {
    switch (type) {
      case 'email':
        return '📧';
      case 'task':
        return '📋';
      case 'deal_update':
        return '💰';
      case 'contact_update':
        return '👤';
      case 'notification':
        return '🔔';
      default:
        return '⚡';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="text-purple-500" size={24} />
        <h2 className="text-xl font-semibold">Workflow Suggestions</h2>
      </div>

      <div className="space-y-4">
        {currentSuggestions.map(suggestion => (
          <div
            key={suggestion.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  {Math.round(suggestion.confidence * 100)}% Confidence
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => executeSuggestion(suggestion.id)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                  title="Execute automation"
                >
                  <PlayCircle size={20} />
                </button>
                <button
                  onClick={() => {/* Open modification dialog */}}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  title="Modify automation"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => rejectSuggestion(suggestion.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  title="Reject automation"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {suggestion.suggestedActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <span className="text-xl">{getActionIcon(action.type)}</span>
                  <span>
                    {action.type.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                  {action.params && (
                    <span className="text-gray-400">
                      {JSON.stringify(action.params)}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {suggestion.context.relevantHistory.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500 mb-2">
                  Based on your recent actions:
                </p>
                <div className="space-y-2">
                  {suggestion.context.relevantHistory.map((action, index) => (
                    <div
                      key={index}
                      className="text-xs text-gray-400 flex items-center gap-2"
                    >
                      <span>{getActionIcon(action.type)}</span>
                      <span>{action.type}</span>
                      <span>•</span>
                      <span>{new Date(action.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {currentSuggestions.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No automation suggestions available yet.
            <br />
            Keep using the system, and I'll learn your workflow patterns!
          </div>
        )}
      </div>
    </div>
  );
};