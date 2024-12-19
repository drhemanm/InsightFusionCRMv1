import type { Contact } from './index';

export interface SocialProfile {
  platform: 'linkedin' | 'twitter';
  profileId: string;
  username: string;
  lastSynced: Date;
  isConnected: boolean;
}

export interface SocialUpdate {
  id: string;
  platform: 'linkedin' | 'twitter';
  contactId: string;
  type: 'job_change' | 'company_update' | 'post' | 'article' | 'achievement';
  content: string;
  url?: string;
  timestamp: Date;
  importance: 'high' | 'medium' | 'low';
  isRead: boolean;
  actionTaken?: boolean;
}

export interface SocialInsight {
  contactId: string;
  insights: {
    recentActivity: SocialUpdate[];
    recommendedActions: {
      type: 'congratulate' | 'connect' | 'engage' | 'follow_up';
      reason: string;
      suggestedMessage?: string;
      deadline?: Date;
    }[];
    topics: {
      name: string;
      frequency: number;
    }[];
    sentiment: {
      overall: number;
      trend: 'positive' | 'neutral' | 'negative';
    };
  };
}

export interface ContactEnrichment {
  contact: Contact;
  socialProfiles: SocialProfile[];
  insights: SocialInsight;
}