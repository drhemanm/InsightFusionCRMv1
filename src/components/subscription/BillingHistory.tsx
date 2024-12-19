import React from 'react';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { FileText, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export const BillingHistory: React.FC = () => {
  const { invoices, isLoading } = useSubscriptionStore();

  if (isLoading) return <div>Loading billing history...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="text-blue-500" size={24} />
          <h2 className="text-xl font-semibold">Billing History</h2>
        </div>
      </div>

      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-4">
              {invoice.status === 'paid' ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <AlertCircle className="text-yellow-500" size={20} />
              )}
              <div>
                <div className="font-medium">
                  ${invoice.amount} {invoice.currency}
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  invoice.status === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {invoice.status.toUpperCase()}
              </span>
              <button
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full"
                title="Download invoice"
              >
                <Download size={20} />
              </button>
            </div>
          </div>
        ))}

        {invoices.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No invoices found
          </div>
        )}
      </div>
    </div>
  );
};