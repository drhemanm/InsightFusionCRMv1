export interface WorkflowAction {
  id: string;
  type: 'email' | 'task' | 'deal_update' | 'contact_update' | 'notification';
  params: Record<string, any>;
  timestamp: Date;
  userId: string;
  context: {
    screen: string;
    previousActions?: string[];
    relatedEntityId?: string;
    relatedEntityType?: 'contact' | 'deal' | 'task';
  };
}

export interface WorkflowPattern {
  id: string;
  name: string;
  confidence: number;
  trigger: {
    type: 'action' | 'time' | 'data_change';
    conditions: Record<string, any>;
  };
  actions: WorkflowAction[];
  userOverrides: {
    userId: string;
    timestamp: Date;
    action: 'accept' | 'reject' | 'modify';
    modifications?: Partial<WorkflowAction>;
  }[];
  stats: {
    timesTriggered: number;
    timesAccepted: number;
    timesRejected: number;
    averageTimeToComplete: number;
  };
}

export interface AutomationSuggestion {
  id: string;
  patternId: string;
  confidence: number;
  suggestedActions: WorkflowAction[];
  context: {
    trigger: WorkflowPattern['trigger'];
    relevantHistory: WorkflowAction[];
  };
  status: 'pending' | 'accepted' | 'rejected' | 'modified';
}