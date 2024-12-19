import React from 'react';
import { format } from 'date-fns';
import { Timeline } from '../../types/workflow';
import { Mail, Phone, Calendar, FileText, MessageSquare } from 'lucide-react';

interface TimelineViewProps {
  timeline: Timeline[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({ timeline }) => {
  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'email_sent':
        return <Mail className="text-blue-500" size={20} />;
      case 'call_logged':
        return <Phone className="text-green-500" size={20} />;
      case 'meeting_scheduled':
        return <Calendar className="text-purple-500" size={20} />;
      case 'task_completed':
        return <FileText className="text-yellow-500" size={20} />;
      default:
        return <MessageSquare className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Activity Timeline</h2>
      
      <div className="space-y-6">
        {timeline.map((entry) => (
          <div key={entry.id} className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              {getEventIcon(entry.eventType)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium">{entry.description}</h3>
                <span className="text-sm text-gray-500">
                  {format(entry.timestamp, 'MMM d, yyyy h:mm a')}
                </span>
              </div>
              
              {entry.metadata && (
                <div className="text-sm text-gray-600 mt-1">
                  {Object.entries(entry.metadata).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="font-medium capitalize">
                        {key.replace('_', ' ')}:
                      </span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {timeline.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No activity recorded yet
          </div>
        )}
      </div>
    </div>
  );
};