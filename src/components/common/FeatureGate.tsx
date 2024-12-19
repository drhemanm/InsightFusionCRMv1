import React from 'react';
import { useFeatureFlag } from '../../hooks/useFeatureFlag';
import type { FeatureFlag } from '../../types/features';
import { Lock, AlertCircle } from 'lucide-react';

interface FeatureGateProps {
  feature: FeatureFlag;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({
  feature,
  children,
  fallback
}) => {
  const { enabled, reason, upgradeMessage } = useFeatureFlag(feature);

  if (enabled) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 rounded-full p-3">
          <Lock className="text-gray-400" size={24} />
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Feature Not Available
      </h3>
      {reason && (
        <p className="text-sm text-gray-500 mb-4">
          {reason}
        </p>
      )}
      {upgradeMessage && (
        <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
          <AlertCircle size={16} />
          {upgradeMessage}
        </div>
      )}
    </div>
  );
};