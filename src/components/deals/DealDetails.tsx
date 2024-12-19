import React from 'react';
import { DollarSign, Calendar, Users, FileText, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { VirtualSalesCoach } from '../ai/VirtualSalesCoach';
import { useFeatureFlag } from '../../hooks/useFeatureFlag';

interface DealDetailsProps {
  deal: {
    id: string;
    title: string;
    value: number;
    stage: string;
    expectedCloseDate: Date;
    contacts: Array<{
      id: string;
      name: string;
      role: string;
    }>;
    activities: Array<{
      id: string;
      type: string;
      description: string;
      timestamp: Date;
    }>;
  };
}

export const DealDetails: React.FC<DealDetailsProps> = ({ deal }) => {
  const { enabled: hasAI } = useFeatureFlag('ai_insights');

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        {/* Deal Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{deal.title}</h2>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              deal.stage === 'won'
                ? 'bg-green-100 text-green-800'
                : deal.stage === 'lost'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {deal.stage.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <DollarSign className="text-green-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Deal Value</p>
                <p className="text-xl font-bold">
                  MUR {deal.value.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-blue-500" size={24} />
              <div>
                <p className="text-sm text-gray-600">Expected Close</p>
                <p className="text-xl font-bold">
                  {format(deal.expectedCloseDate, 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Contacts */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Key Contacts</h3>
            <button className="text-blue-600 hover:text-blue-700">
              Add Contact
            </button>
          </div>

          <div className="space-y-4">
            {deal.contacts.map(contact => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {contact.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.role}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MessageSquare size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium mb-4">Activity Timeline</h3>
          <div className="space-y-4">
            {deal.activities.map(activity => (
              <div key={activity.id} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="text-blue-500" size={16} />
                  </div>
                </div>
                <div>
                  <p className="font-medium">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500">
                    {format(activity.timestamp, 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* AI Sales Coach */}
        {hasAI && <VirtualSalesCoach deal={deal} />}

        {/* Files & Documents */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium mb-4">Files & Documents</h3>
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <p className="text-gray-500">
              Drag and drop files here or click to upload
            </p>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium mb-4">Notes</h3>
          <textarea
            placeholder="Add a note about this deal..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};