import React, { useEffect } from 'react';
import { useDealStore } from '../../../store/dealStore';
import { DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface DealMetricsProps {
  agentId?: string;
}

export const DealMetrics: React.FC<DealMetricsProps> = ({ agentId }) => {
  const { deals, fetchDeals } = useDealStore();

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const agentDeals = deals.filter(deal => deal.assignedTo === agentId);

  const metrics = {
    totalValue: agentDeals.reduce((sum, deal) => sum + deal.value, 0),
    activeDeals: agentDeals.filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage)).length,
    closedDeals: agentDeals.filter(deal => deal.stage === 'closed-won').length,
    avgDealSize: agentDeals.length > 0 
      ? agentDeals.reduce((sum, deal) => sum + deal.value, 0) / agentDeals.length 
      : 0
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Pipeline Value</p>
            <p className="text-2xl font-bold">
              {metrics.totalValue === 0 ? 'MUR 0' : `MUR ${metrics.totalValue.toLocaleString()}`}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <DollarSign className="text-green-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Active Deals</p>
            <p className="text-2xl font-bold">{metrics.activeDeals}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <TrendingUp className="text-blue-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Closed Deals</p>
            <p className="text-2xl font-bold">{metrics.closedDeals}</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <CheckCircle className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Average Deal Size</p>
            <p className="text-2xl font-bold">
              {metrics.avgDealSize === 0 ? 'MUR 0' : `MUR ${metrics.avgDealSize.toLocaleString()}`}
            </p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Clock className="text-yellow-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};