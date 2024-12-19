import { create } from 'zustand';
import type { WorkflowAction, AutomationSuggestion } from '../types/workflow';
import { workflowAnalyzer } from '../services/workflowAnalyzer';

interface WorkflowStore {
  analyzer: typeof workflowAnalyzer;
  currentSuggestions: AutomationSuggestion[];
  isLearning: boolean;
  error: string | null;

  recordAction: (action: Omit<WorkflowAction, 'id' | 'timestamp'>) => void;
  getSuggestions: (context: WorkflowAction['context']) => void;
  executeSuggestion: (suggestionId: string) => Promise<void>;
  modifySuggestion: (
    suggestionId: string,
    modifications: Partial<WorkflowAction>
  ) => void;
  rejectSuggestion: (suggestionId: string) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  analyzer: workflowAnalyzer,
  currentSuggestions: [],
  isLearning: true,
  error: null,

  // ... rest of the implementation stays the same ...
}));