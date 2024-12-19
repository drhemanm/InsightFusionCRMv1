import { create } from 'zustand';
import type { Achievement, Badge, Challenge, UserProgress } from '../types/gamification';

interface GamificationStore {
  userProgress: UserProgress | null;
  achievements: Achievement[];
  badges: Badge[];
  challenges: Challenge[];
  leaderboard: UserProgress[];
  isLoading: boolean;
  error: string | null;
  
  fetchUserProgress: (userId: string) => Promise<void>;
  awardPoints: (userId: string, points: number) => Promise<void>;
  unlockAchievement: (userId: string, achievementId: string) => Promise<void>;
  joinChallenge: (userId: string, challengeId: string) => Promise<void>;
  updateChallengeProgress: (userId: string, challengeId: string, progress: number) => Promise<void>;
}

export const useGamificationStore = create<GamificationStore>((set) => ({
  userProgress: null,
  achievements: [],
  badges: [],
  challenges: [],
  leaderboard: [],
  isLoading: false,
  error: null,

  fetchUserProgress: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/gamification/progress/${userId}`);
      const progress = await response.json();
      set({ userProgress: progress, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch user progress', isLoading: false });
    }
  },

  awardPoints: async (userId, points) => {
    try {
      const response = await fetch(`/api/gamification/points/${userId}`, {
        method: 'POST',
        body: JSON.stringify({ points }),
      });
      const updatedProgress = await response.json();
      set((state) => ({
        userProgress: updatedProgress,
      }));
    } catch (error) {
      set({ error: 'Failed to award points' });
    }
  },

  unlockAchievement: async (userId, achievementId) => {
    try {
      const response = await fetch(`/api/gamification/achievements/${userId}`, {
        method: 'POST',
        body: JSON.stringify({ achievementId }),
      });
      const updatedProgress = await response.json();
      set((state) => ({
        userProgress: updatedProgress,
      }));
    } catch (error) {
      set({ error: 'Failed to unlock achievement' });
    }
  },

  joinChallenge: async (userId, challengeId) => {
    try {
      const response = await fetch(`/api/gamification/challenges/${challengeId}/join`, {
        method: 'POST',
        body: JSON.stringify({ userId }),
      });
      const updatedChallenge = await response.json();
      set((state) => ({
        challenges: state.challenges.map((c) =>
          c.id === challengeId ? updatedChallenge : c
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to join challenge' });
    }
  },

  updateChallengeProgress: async (userId, challengeId, progress) => {
    try {
      const response = await fetch(`/api/gamification/challenges/${challengeId}/progress`, {
        method: 'POST',
        body: JSON.stringify({ userId, progress }),
      });
      const updatedChallenge = await response.json();
      set((state) => ({
        challenges: state.challenges.map((c) =>
          c.id === challengeId ? updatedChallenge : c
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to update challenge progress' });
    }
  },
}));