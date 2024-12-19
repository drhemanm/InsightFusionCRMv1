export interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  availability: number;
  currentWorkload: number;
  pastCollaborations: {
    projectId: string;
    success: number;
  }[];
}

export interface CollaborationRecommendation {
  teamMemberId: string;
  score: number;
  reasons: string[];
  skills: string[];
}

export interface SentimentAnalysis {
  score: number;
  comparative: number;
  tokens: string[];
  positive: string[];
  negative: string[];
}

export interface EmailAnalysis {
  sentiment: SentimentAnalysis;
  suggestedResponses: string[];
  tone: 'positive' | 'neutral' | 'negative';
  keyTopics: string[];
}

export interface SalesCoachingSuggestion {
  type: 'follow_up' | 'deal_strategy' | 'risk_mitigation' | 'opportunity';
  priority: 'high' | 'medium' | 'low';
  suggestion: string;
  reasoning: string;
  nextSteps: string[];
  deadline?: Date;
}

export interface DealInsights {
  winProbability: number;
  riskFactors: string[];
  suggestedActions: SalesCoachingSuggestion[];
  similarDeals: {
    id: string;
    outcome: 'won' | 'lost';
    learnings: string[];
  }[];
}