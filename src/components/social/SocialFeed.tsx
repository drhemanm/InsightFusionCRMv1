import React from 'react';
import { useSocialStore } from '../../store/socialStore';
import { format } from 'date-fns';
import { Briefcase, Building, MessageSquare, Award, ExternalLink, Check } from 'lucide-react';

interface Props {
  contactId: string;
}

export const SocialFeed: React.FC<Props> = ({ contactId }) => {
  const { updates, markUpdateAsRead, markUpdateActionTaken } = useSocialStore();
  const contactUpdates = updates.filter(update => update.contactId === contactId);

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'job_change':
        return <Briefcase className="text-blue-500" size={20} />;
      case 'company_update':
        return <Building className="text-purple-500" size={20} />;
      case 'post':
        return <MessageSquare className="text-green-500" size={20} />;
      case 'achievement':
        return <Award className="text-yellow-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Social Updates</h2>
      
      <div className="space-y-4">
        {contactUpdates.map(update => (
          <div
            key={update.id}
            className={`border rounded-lg p-4 ${
              !update.isRead ? 'bg-blue-50 border-blue-200' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getUpdateIcon(update.type)}
                <span className={`text-sm font-medium ${
                  update.importance === 'high'
                    ? 'text-red-600'
                    : update.importance === 'medium'
                    ? 'text-yellow-600'
                    : 'text-gray-600'
                }`}>
                  {update.platform.toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {format(new Date(update.timestamp), 'MMM d, yyyy')}
              </span>
            </div>

            <p className="text-gray-700 mb-3">{update.content}</p>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {update.url && (
                  <a
                    href={update.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                  >
                    View <ExternalLink size={14} />
                  </a>
                )}
              </div>
              
              {!update.actionTaken && (
                <button
                  onClick={() => {
                    markUpdateAsRead(update.id);
                    markUpdateActionTaken(update.id);
                  }}
                  className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
                >
                  <Check size={16} />
                  Mark Addressed
                </button>
              )}
            </div>
          </div>
        ))}

        {contactUpdates.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No recent social updates
          </div>
        )}
      </div>
    </div>
  );
};