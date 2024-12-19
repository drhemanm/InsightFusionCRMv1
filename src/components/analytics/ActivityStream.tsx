import React from 'react';
import { Activity, User, DollarSign, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import type { TimeRange } from '../dashboard/filters/TimeRangeFilter';

interface ActivityEvent {
  id: string;
  type: 'contact' | 'deal' | 'email' | 'call';
  title: string;
  description?: string;
  timestamp: Date;
  user: {
    name: string;
    avatar?: string;
  };
}

interface ActivityStreamProps {
  timeRange: TimeRange['value'];
  title?: string;
}

export const ActivityStream: React.FC<ActivityStreamProps> = ({
  timeRange,
  title = 'Recent Activity'
}) => {
  // Mock data - in production, fetch based on timeRange
  const events: ActivityEvent[] = [
    {
      id: '1',
      type: 'deal',
      title: 'New deal created',
      description: 'Enterprise package - MUR 50,000',
      timestamp: new Date(),
      user: { name: 'John Doe' }
    },
    {
      id: '2',
      type: 'contact',
      title: 'Contact updated',
      description: 'Updated contact information for ABC Corp',
      timestamp: new Date(),
      user: { name: 'Jane Smith' }
    }
  ];

  const getEventIcon = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'contact':
        return <User className="text-blue-500" size={20} />;
      case 'deal':
        return <DollarSign className="text-green-500" size={20} />;
      case 'email':
        return <Mail className="text-purple-500" size={20} />;
      case 'call':
        return <Phone className="text-yellow-500" size={20} />;
      default:
        return <Activity className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="text-blue-500" size={24} />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex gap-4 hover:bg-gray-50 p-3 rounded-lg transition-colors"
          >
            <div className="flex-shrink-0">
              {event.user.avatar ? (
                <img
                  src={event.user.avatar}
                  alt={event.user.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 font-medium">
                    {event.user.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {getEventIcon(event.type)}
                <span className="font-medium">{event.title}</span>
              </div>
              {event.description && (
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{event.user.name}</span>
                <span>•</span>
                <span>{format(event.timestamp, 'MMM d, h:mm a')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};