import React from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Call {
  id: string;
  type: 'incoming' | 'outgoing' | 'missed';
  contact: {
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  duration?: number;
  notes?: string;
}

export const CallHistory: React.FC = () => {
  // Mock data - in production, fetch from API
  const calls: Call[] = [
    {
      id: '1',
      type: 'incoming',
      contact: { name: 'John Doe' },
      timestamp: new Date(),
      duration: 300
    },
    {
      id: '2',
      type: 'outgoing',
      contact: { name: 'Jane Smith' },
      timestamp: new Date(),
      duration: 180
    },
    {
      id: '3',
      type: 'missed',
      contact: { name: 'Bob Wilson' },
      timestamp: new Date()
    }
  ];

  const getCallIcon = (type: Call['type']) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming className="text-green-500" size={20} />;
      case 'outgoing':
        return <PhoneOutgoing className="text-blue-500" size={20} />;
      case 'missed':
        return <PhoneMissed className="text-red-500" size={20} />;
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="space-y-4">
        {calls.map((call) => (
          <div
            key={call.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {call.contact.avatar ? (
                  <img
                    src={call.contact.avatar}
                    alt={call.contact.name}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-gray-600 font-medium">
                    {call.contact.name[0]}
                  </span>
                )}
              </div>
              <div>
                <div className="font-medium">{call.contact.name}</div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {getCallIcon(call.type)}
                  <span>
                    {format(call.timestamp, 'MMM d, h:mm a')}
                  </span>
                  {call.duration && (
                    <>
                      <span>•</span>
                      <Clock size={14} />
                      <span>{formatDuration(call.duration)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button className="p-2 text-gray-500 hover:text-blue-500 rounded-full hover:bg-blue-50">
              <Phone size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};