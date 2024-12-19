import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useDealStore } from '../../store/dealStore';
import { CreateDealForm } from './CreateDealForm';

export const DealPipeline: React.FC = () => {
  const { deals = [], fetchDeals } = useDealStore();
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const stages = [
    { id: 'lead', label: 'Lead' },
    { id: 'qualified', label: 'Qualified' },
    { id: 'proposal', label: 'Proposal' },
    { id: 'negotiation', label: 'Negotiation' },
    { id: 'closed-won', label: 'Won' },
    { id: 'closed-lost', label: 'Lost' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Deals Pipeline</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          New Deal
        </button>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {stages.map((stage) => {
          const stageDeals = deals.filter(deal => deal.stage === stage.id) || [];
          const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
          
          return (
            <div key={stage.id} className="flex flex-col h-full">
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{stage.label}</h3>
                  <span className="text-sm bg-white px-2 py-1 rounded-full">
                    {stageDeals.length}
                  </span>
                </div>
                <div className="text-sm font-medium bg-white px-2 py-1.5 rounded-md">
                  MUR {totalValue.toLocaleString()}
                </div>
              </div>

              <div className="flex-1 space-y-2">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="bg-white p-3 rounded-lg shadow-sm hover:shadow transition-shadow cursor-pointer"
                  >
                    <h4 className="font-medium mb-2">{deal.title}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-600">
                        MUR {deal.value.toLocaleString()}
                      </span>
                      <span className="text-gray-500">
                        {new Date(deal.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showCreateForm && (
        <CreateDealForm onClose={() => setShowCreateForm(false)} />
      )}
    </div>
  );
};