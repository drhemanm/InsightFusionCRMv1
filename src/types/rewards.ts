export interface Reward {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  pointsCost: number;
  category: 'gift_cards' | 'perks' | 'swag' | 'experiences';
  provider?: string;
  availability: number;
  expiresAt?: Date;
  redemptionInstructions?: string;
}

export interface RewardRedemption {
  id: string;
  userId: string;
  rewardId: string;
  redeemedAt: Date;
  status: 'pending' | 'fulfilled' | 'expired';
  redemptionCode?: string;
}

export interface RewardsConfig {
  providers: {
    amazon?: {
      enabled: boolean;
      apiKey?: string;
    };
    corporate?: {
      enabled: boolean;
      customRewards: string[];
    };
  };
  categories: {
    id: string;
    name: string;
    icon: string;
    enabled: boolean;
  }[];
}