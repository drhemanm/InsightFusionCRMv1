import React, { useState } from 'react';
import { useRewardsStore } from '../../store/rewardsStore';
import { useGamificationStore } from '../../store/gamificationStore';
import { Gift, Star, Package, Compass, Search, Filter } from 'lucide-react';

const categoryIcons = {
  gift_cards: Gift,
  perks: Star,
  swag: Package,
  experiences: Compass,
};

export const RewardsMarketplace: React.FC = () => {
  const { rewards, isLoading, redeemReward } = useRewardsStore();
  const { userProgress } = useGamificationStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRewards = rewards.filter((reward) => {
    if (selectedCategory && reward.category !== selectedCategory) return false;
    if (searchQuery && !reward.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleRedeem = async (rewardId: string) => {
    if (!userProgress) return;
    await redeemReward(userProgress.userId, rewardId);
  };

  if (isLoading) return <div className="text-center p-8">Loading rewards...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Rewards Marketplace</h1>
        {userProgress && (
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
            <Star className="text-yellow-400" size={24} />
            <span className="text-xl font-semibold">{userProgress.points} Points Available</span>
          </div>
        )}
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {Object.entries(categoryIcons).map(([category, Icon]) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon size={20} />
              {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredRewards.map((reward) => {
          const canAfford = userProgress && userProgress.points >= reward.pointsCost;
          const Icon = categoryIcons[reward.category];

          return (
            <div key={reward.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={reward.imageUrl}
                alt={reward.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={20} className="text-blue-500" />
                  <h3 className="text-xl font-semibold">{reward.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-400" size={20} />
                    <span className="font-semibold">{reward.pointsCost} Points</span>
                  </div>
                  <button
                    onClick={() => handleRedeem(reward.id)}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-lg ${
                      canAfford
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem' : 'Not Enough Points'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}