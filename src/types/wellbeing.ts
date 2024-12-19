export interface WorkSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  activityType: 'active' | 'idle' | 'break';
  screenTime: number;
  keyboardActions: number;
  mouseActions: number;
}

export interface BreakReminder {
  id: string;
  userId: string;
  type: 'eye_rest' | 'stretch' | 'water' | 'walk';
  scheduledFor: Date;
  status: 'pending' | 'completed' | 'skipped';
  points: number;
}

export interface WellnessStats {
  dailyScreenTime: number;
  weeklyScreenTime: number;
  breaksCompleted: number;
  breaksSkipped: number;
  longestStreak: number;
  currentStreak: number;
  wellnessScore: number;
}

export interface WellnessAchievement {
  id: string;
  title: string;
  description: string;
  type: 'break_streak' | 'balanced_day' | 'healthy_routine';
  threshold: number;
  points: number;
  unlockedAt?: Date;
}