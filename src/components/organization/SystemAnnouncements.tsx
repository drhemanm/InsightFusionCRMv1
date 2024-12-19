```typescript
import React, { useState } from 'react';
import { Bell, Plus, Megaphone, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  startDate: Date;
  endDate?: Date;
  createdBy: string;
}

export const SystemAnnouncements: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'System Maintenance',
      content: 'Scheduled maintenance on Sunday, 2AM-4AM UTC',
      priority: 'high',
      startDate: new Date(),
      createdBy: 'System Admin'
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    priority: 'medium'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) return;

    setAnnouncements([
      ...announcements,
      {
        ...newAnnouncement,
        id: crypto.randomUUID(),
        startDate: new Date(),
        createdBy: 'Current User'
      } as Announcement
    ]);
    setShowCreateForm(false);
    setNewAnnouncement({ priority: 'medium' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">System Announcements</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          New Announcement
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={newAnnouncement.title || ''}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                value={newAnnouncement.content || ''}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                value={newAnnouncement.priority}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value as Announcement['priority'] })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Create Announcement
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`bg-white rounded-lg shadow p-6 border-l-4 ${
              announcement.priority === 'high'
                ? 'border-red-500'
                : announcement.priority === 'medium'
                ? 'border-yellow-500'
                : 'border-green-500'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Megaphone className="text-blue-500" size={24} />
                <h3 className="font-medium">{announcement.title}</h3>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                announcement.priority === 'high'
                  ? 'bg-red-100 text-red-800'
                  : announcement.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {announcement.priority.toUpperCase()}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{announcement.content}</p> Continuing with the SystemAnnouncements.tsx file content:

```typescript
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {format(announcement.startDate, 'MMM d, yyyy')}
                {announcement.endDate && (
                  <> - {format(announcement.endDate, 'MMM d, yyyy')}</>
                )}
              </div>
              <span>Posted by {announcement.createdBy}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```