import React from 'react';
import { useRewardsStore } from '../../store/rewardsStore';
import { format } from 'date-fns';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

export const RedemptionHistory: React.FC<{ userId: string }> = ({ userId }) => {
  const { userRedemptions, isLoading } = useRewardsStore();

  if (isLoading) return <div>Loading redemption history...</div>;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'fulfilled':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'expired':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Redemption History</h2>
      <div className="space-y-4">
        {userRedemptions.map((redemption) => (
          <div
            key={redemption.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-4">
              {getStatusIcon(redemption.status)}
              <div>
                <span className="font-semibold">Reward Title</span>
                <div className="text-sm text-gray-600">
                  Redeemed on {format(new Date(redemption.redeemedAt), 'MMM d, yyyy')}
                </div>
              </div>
            </div>
            <div className="text-sm">
              {redemption.redemptionCode && (
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  {redemption.redemptionCode}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}