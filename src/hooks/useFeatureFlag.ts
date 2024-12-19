import { useSubscriptionStore } from '../store/subscriptionStore';
import { featureConfigs, isFeatureEnabled } from '../config/features';
import type { FeatureFlag, FeatureAccess } from '../types/features';

export function useFeatureFlag(feature: FeatureFlag): FeatureAccess {
  const { currentSubscription, plans } = useSubscriptionStore();

  if (!currentSubscription) {
    return {
      enabled: false,
      reason: 'No active subscription',
      upgradeMessage: 'Subscribe to access this feature'
    };
  }

  const currentPlan = plans.find(p => p.id === currentSubscription.planId);
  if (!currentPlan) {
    return {
      enabled: false,
      reason: 'Invalid subscription plan',
      upgradeMessage: 'Contact support'
    };
  }

  const featureConfig = featureConfigs[feature];
  if (!featureConfig) {
    return {
      enabled: false,
      reason: 'Feature not available',
      upgradeMessage: 'Contact support'
    };
  }

  const enabled = isFeatureEnabled(feature, currentPlan.id);
  if (!enabled) {
    const requiredPlan = plans.find(p => p.id === featureConfig.minPlanId);
    return {
      enabled: false,
      reason: `Requires ${requiredPlan?.name || 'higher'} plan`,
      upgradeMessage: requiredPlan 
        ? `Upgrade to ${requiredPlan.name} for MUR ${requiredPlan.price}/month`
        : 'Contact support for upgrade options'
    };
  }

  return { enabled: true };
}