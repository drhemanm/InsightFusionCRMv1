```typescript
import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { smartCalendar } from '../../services/calendar/SmartCalendar';
import type { Meeting } from '../../services/calendar/SmartCalendar';

export const SmartScheduler: React.FC = () => {
  const [meeting, setMeeting] = useState<Partial<Meeting>>({
    title: '',
    description: '',
    attendees: [],
    reminders: [
      { type: 'whatsapp', time: 1440 },
      { type: 'whatsapp', time: 120 },
      { type: 'whatsapp', time: 15 }
    ]
  });

  const handleSchedule = async () => {
    if (!meeting.title || !meeting.startTime || !meeting.endTime || !meeting.attendees?.length) {
      return;
    }

    try {
      const timezone = await smartCalendar.detectTimezone('current-user');
      await smartCalendar.scheduleMeeting({
        ...meeting as Meeting,
        timezone
      });
    } catch (error) {
      console.error('Failed to schedule meeting:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Schedule Meeting</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <div className="mt-1 relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={meeting.title}
              onChange={(e) => setMeeting({ ...meeting, title: e.target.value })}
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <div className="mt-1 relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="datetime-local"
                value={meeting.startTime?.toISOString().slice(0, 16)}
                onChange={(e) => setMeeting({ ...meeting, startTime: new Date(e.target.value) })}
                className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <div className="mt-1 relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="datetime-local"
                value={meeting.endTime?.toISOString().slice(0, 16)}
                onChange={(e) => setMeeting({ ...meeting, endTime: new Date(e.target.value) })}
                className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Attendees</label>
          <div className="mt-1 relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Enter email addresses separated by commas"
              value={meeting.attendees?.join(', ')}
              onChange={(e) => setMeeting({
                ...meeting,
                attendees: e.target.value.split(',').map(email => email.trim())
              })}
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <div className="mt-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={meeting.location}
              onChange={(e) => setMeeting({ ...meeting, location: e.target.value })}
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter meeting location or video call link"
            />
          </div>
        </div>

        <button
          onClick={handleSchedule}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Schedule Meeting
        </button>
      </div>
    </div>
  );
};
```