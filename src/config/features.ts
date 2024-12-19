import type { FeatureFlag, FeatureConfig } from '../types/features';

export const featureConfigs: Record<FeatureFlag, FeatureConfig> = {
  analytics_dashboard: {
    name: 'Analytics Dashboard',
    description: 'Advanced analytics and reporting tools',
    minPlanId: 'pro'
  },
  ai_insights: {
    name: 'AI Insights',
    description: 'AI-powered sales and customer insights',
    minPlanId: 'pro'
  },
  collaboration_tools: {
    name: 'Collaboration Tools',
    description: 'Team collaboration features',
    minPlanId: 'pro'
  },
  priority_support: {
    name: 'Priority Support',
    description: '24/7 priority customer support',
    minPlanId: 'enterprise'
  },
  api_access: {
    name: 'API Access',
    description: 'Access to REST API endpoints',
    minPlanId: 'pro'
  },
  custom_reports: {
    name: 'Custom Reports',
    description: 'Create and customize reports',
    minPlanId: 'pro'
  },
  bulk_operations: {
    name: 'Bulk Operations',
    description: 'Perform operations on multiple items',
    minPlanId: 'pro'
  },
  advanced_automation: {
    name: 'Advanced Automation',
    description: 'Advanced workflow automation',
    minPlanId: 'enterprise'
  },
  white_labeling: {
    name: 'White Labeling',
    description: 'Custom branding options',
    minPlanId: 'enterprise'
  }
};

export const isFeatureEnabled = (feature: FeatureFlag, planId: string): boolean => {
  const config = featureConfigs[feature];
  if (!config) return false;

  const planTiers = ['basic', 'pro', 'enterprise'];
  const requiredTier = planTiers.indexOf(config.minPlanId);
  const currentTier = planTiers.indexOf(planId);

  return currentTier >= requiredTier;
};