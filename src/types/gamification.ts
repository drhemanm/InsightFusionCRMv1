export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt?: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  criteria: {
    type: 'deals_closed' | 'leads_added' | 'tasks_completed' | 'revenue_generated';
    threshold: number;
  };
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  reward: {
    points: number;
    badges?: string[];
  };
  criteria: {
    type: 'deals_closed' | 'leads_added' | 'tasks_completed' | 'revenue_generated';
    target: number;
  };
  participants: string[];
  progress: Record<string, number>;
}

export interface UserProgress {
  userId: string;
  points: number;
  level: number;
  badges: string[];
  achievements: string[];
  currentChallenges: string[];
  stats: {
    dealsClosedCount: number;
    leadsAddedCount: number;
    tasksCompletedCount: number;
    revenueGenerated: number;
  };
}