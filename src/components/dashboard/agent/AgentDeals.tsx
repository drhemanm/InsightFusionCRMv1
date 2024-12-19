import React, { useState } from 'react';
import { useDealStore } from '../../../store/dealStore';
import { format } from 'date-fns';
import { DollarSign, Calendar, ArrowUpRight, Filter, Search } from 'lucide-react';

interface AgentDealsProps {
  agentId?: string;
}

export const AgentDeals: React.FC<AgentDealsProps> = ({ agentId }) => {
  const { deals } = useDealStore();
  const [sortField, setSortField] = useState<'value' | 'createdAt' | 'stage'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');

  const agentDeals = deals.filter(deal => 
    deal.assignedTo === agentId &&
    (stageFilter === 'all' || deal.stage === stageFilter) &&
    (searchQuery === '' || 
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedDeals = [...agentDeals].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Your Deals</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Stages</option>
            <option value="lead">Lead</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="closed-won">Closed Won</option>
            <option value="closed-lost">Closed Lost</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Deal</th>
              <th className="text-left py-3 px-4">Stage</th>
              <th className="text-left py-3 px-4">Value</th>
              <th className="text-left py-3 px-4">Created</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedDeals.map((deal) => (
              <tr key={deal.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium">{deal.title}</div>
                    <div className="text-sm text-gray-500">{deal.description}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    deal.stage === 'closed-won'
                      ? 'bg-green-100 text-green-800'
                      : deal.stage === 'closed-lost'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {deal.stage.replace('-', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-green-600">
                    <DollarSign size={16} />
                    <span>{deal.value.toLocaleString()}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar size={16} />
                    <span>{format(new Date(deal.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-700">
                    <ArrowUpRight size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};