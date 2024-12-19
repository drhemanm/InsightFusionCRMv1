import { create } from 'zustand';
import type { WorkSession, BreakReminder, WellnessStats, WellnessAchievement } from '../types/wellbeing';

interface WellbeingStore {
  currentSession: WorkSession | null;
  breakReminders: BreakReminder[];
  wellnessStats: WellnessStats | null;
  achievements: WellnessAchievement[];
  isTracking: boolean;
  lastBreakTime: Date | null;

  startTracking: () => void;
  stopTracking: () => void;
  recordActivity: (type: 'keyboard' | 'mouse') => void;
  scheduleBreak: (type: BreakReminder['type']) => void;
  completeBreak: (reminderId: string) => void;
  skipBreak: (reminderId: string) => void;
  updateWellnessStats: () => void;
}

const BREAK_INTERVAL = 50 * 60 * 1000; // 50 minutes
const POINTS_PER_BREAK = 10;

export const useWellbeingStore = create<WellbeingStore>((set, get) => ({
  currentSession: null,
  breakReminders: [],
  wellnessStats: null,
  achievements: [],
  isTracking: false,
  lastBreakTime: null,

  startTracking: () => {
    const session: WorkSession = {
      id: crypto.randomUUID(),
      userId: 'current-user',
      startTime: new Date(),
      activityType: 'active',
      screenTime: 0,
      keyboardActions: 0,
      mouseActions: 0
    };

    set({
      currentSession: session,
      isTracking: true,
      lastBreakTime: new Date()
    });

    // Schedule first break
    get().scheduleBreak('eye_rest');
  },

  stopTracking: () => {
    const { currentSession } = get();
    if (currentSession) {
      currentSession.endTime = new Date();
      currentSession.duration = 
        currentSession.endTime.getTime() - currentSession.startTime.getTime();
    }

    set({
      currentSession: null,
      isTracking: false
    });
  },

  recordActivity: (type) => {
    const { currentSession, lastBreakTime } = get();
    if (!currentSession) return;

    // Update activity counts
    if (type === 'keyboard') {
      currentSession.keyboardActions++;
    } else {
      currentSession.mouseActions++;
    }

    // Check if break is needed
    const now = new Date();
    if (lastBreakTime && now.getTime() - lastBreakTime.getTime() > BREAK_INTERVAL) {
      get().scheduleBreak('eye_rest');
    }
  },

  scheduleBreak: (type) => {
    const reminder: BreakReminder = {
      id: crypto.randomUUID(),
      userId: 'current-user',
      type,
      scheduledFor: new Date(),
      status: 'pending',
      points: POINTS_PER_BREAK
    };

    set(state => ({
      breakReminders: [...state.breakReminders, reminder]
    }));
  },

  completeBreak: (reminderId) => {
    set(state => ({
      breakReminders: state.breakReminders.map(reminder =>
        reminder.id === reminderId
          ? { ...reminder, status: 'completed' }
          : reminder
      ),
      lastBreakTime: new Date()
    }));

    get().updateWellnessStats();
  },

  skipBreak: (reminderId) => {
    set(state => ({
      breakReminders: state.breakReminders.map(reminder =>
        reminder.id === reminderId
          ? { ...reminder, status: 'skipped' }
          : reminder
      )
    }));

    get().updateWellnessStats();
  },

  updateWellnessStats: () => {
    const { breakReminders } = get();
    
    const completedBreaks = breakReminders.filter(r => r.status === 'completed').length;
    const skippedBreaks = breakReminders.filter(r => r.status === 'skipped').length;
    
    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let streak = 0;

    breakReminders.forEach(reminder => {
      if (reminder.status === 'completed') {
        streak++;
        currentStreak = streak;
        longestStreak = Math.max(longestStreak, streak);
      } else if (reminder.status === 'skipped') {
        streak = 0;
      }
    });

    const wellnessScore = Math.round(
      (completedBreaks / (completedBreaks + skippedBreaks)) * 100
    );

    set({
      wellnessStats: {
        dailyScreenTime: 0, // Would be calculated from sessions
        weeklyScreenTime: 0,
        breaksCompleted: completedBreaks,
        breaksSkipped: skippedBreaks,
        longestStreak,
        currentStreak,
        wellnessScore
      }
    });
  }
}));