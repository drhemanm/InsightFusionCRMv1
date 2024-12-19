import React from 'react';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { CreditCard, DollarSign, Calendar, RefreshCw } from 'lucide-react';

export const SubscriptionManagement: React.FC = () => {
  const { currentSubscription, plans, invoices } = useSubscriptionStore();

  const currentPlan = plans.find(p => p.id === currentSubscription?.planId);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Current Subscription</h3>
        {currentSubscription && currentPlan ? (
          <div className="grid grid-cols-4 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="text-blue-500" size={20} />
                <span className="font-medium">Plan</span>
              </div>
              <div className="text-2xl font-bold">{currentPlan.name}</div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="text-green-500" size={20} />
                <span className="font-medium">Monthly Cost</span>
              </div>
              <div className="text-2xl font-bold">${currentPlan.price}</div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-purple-500" size={20} />
                <span className="font-medium">Next Billing</span>
              </div>
              <div className="text-2xl font-bold">
                {new Date(currentSubscription.currentPeriodEnd).toLocaleDateString()}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="text-yellow-500" size={20} />
                <span className="font-medium">Status</span>
              </div>
              <div className="text-2xl font-bold capitalize">
                {currentSubscription.status}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No active subscription
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Recent Invoices</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${invoice.amount} {invoice.currency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};