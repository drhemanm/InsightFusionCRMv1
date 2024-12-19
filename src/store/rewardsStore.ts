import { create } from 'zustand';
import type { Reward, RewardRedemption, RewardsConfig } from '../types/rewards';

interface RewardsStore {
  rewards: Reward[];
  userRedemptions: RewardRedemption[];
  config: RewardsConfig;
  isLoading: boolean;
  error: string | null;

  fetchRewards: () => Promise<void>;
  redeemReward: (userId: string, rewardId: string) => Promise<void>;
  fetchUserRedemptions: (userId: string) => Promise<void>;
  updateConfig: (config: Partial<RewardsConfig>) => Promise<void>;
}

export const useRewardsStore = create<RewardsStore>((set) => ({
  rewards: [],
  userRedemptions: [],
  config: {
    providers: {
      amazon: { enabled: true },
      corporate: { enabled: true, customRewards: [] },
    },
    categories: [
      { id: 'gift_cards', name: 'Gift Cards', icon: 'gift', enabled: true },
      { id: 'perks', name: 'Company Perks', icon: 'star', enabled: true },
      { id: 'swag', name: 'Company Swag', icon: 'package', enabled: true },
      { id: 'experiences', name: 'Experiences', icon: 'compass', enabled: true },
    ],
  },
  isLoading: false,
  error: null,

  fetchRewards: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/rewards');
      const rewards = await response.json();
      set({ rewards, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch rewards', isLoading: false });
    }
  },

  redeemReward: async (userId, rewardId) => {
    try {
      const response = await fetch('/api/rewards/redeem', {
        method: 'POST',
        body: JSON.stringify({ userId, rewardId }),
      });
      const redemption = await response.json();
      set((state) => ({
        userRedemptions: [...state.userRedemptions, redemption],
      }));
    } catch (error) {
      set({ error: 'Failed to redeem reward' });
    }
  },

  fetchUserRedemptions: async (userId) => {
    try {
      const response = await fetch(`/api/rewards/redemptions/${userId}`);
      const redemptions = await response.json();
      set({ userRedemptions: redemptions });
    } catch (error) {
      set({ error: 'Failed to fetch redemptions' });
    }
  },

  updateConfig: async (config) => {
    try {
      const response = await fetch('/api/rewards/config', {
        method: 'PATCH',
        body: JSON.stringify(config),
      });
      const updatedConfig = await response.json();
      set({ config: updatedConfig });
    } catch (error) {
      set({ error: 'Failed to update config' });
    }
  },
}));