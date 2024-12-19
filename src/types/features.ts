export type FeatureFlag = 
  | 'analytics_dashboard'
  | 'ai_insights'
  | 'collaboration_tools'
  | 'priority_support'
  | 'api_access'
  | 'custom_reports'
  | 'bulk_operations'
  | 'advanced_automation'
  | 'white_labeling'
  | 'unified_profiles'
  | 'custom_dashboards'
  | 'workflow_automation'
  | 'predictive_analytics'
  | 'sentiment_analysis'
  | 'lead_scoring'
  | 'achievements'
  | 'leaderboards'
  | 'rewards'
  | 'multichannel_inbox'
  | 'ai_chatbot'
  | 'email_templates'
  | 'sales_forecasting'
  | 'performance_metrics';

export interface FeatureConfig {
  name: string;
  description: string;
  minPlanId: string;
  beta?: boolean;
  customCheck?: (plan: any) => boolean;
}

export interface FeatureAccess {
  enabled: boolean;
  reason?: string;
  upgradeMessage?: string;
}