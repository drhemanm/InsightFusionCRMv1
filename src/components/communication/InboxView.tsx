import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Filter, Search, Star, Archive, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  type: 'email' | 'sms' | 'chat';
  subject?: string;
  content: string;
  sender: {
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
  };
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  labels: string[];
}

export const InboxView: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState('all');

  const messages: Message[] = []; // In production, fetch from API

  return (
    <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-2rem)] flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r flex flex-col">
        <div className="p-4 border-b">
          <button className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2">
            <Mail size={18} />
            Compose
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {['all', 'unread', 'starred', 'archived'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`w-full px-3 py-2 rounded-lg flex items-center gap-2 ${
                  filter === type
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {type === 'all' && <Mail size={18} />}
                {type === 'unread' && <MessageSquare size={18} />}
                {type === 'starred' && <Star size={18} />}
                {type === 'archived' && <Archive size={18} />}
                <span className="capitalize">{type}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Message List */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">
            <Filter size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Mail size={48} className="mb-4" />
              <p>No messages found</p>
            </div>
          ) : (
            <div className="divide-y">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    !message.isRead ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {message.sender.avatar ? (
                        <img
                          src={message.sender.avatar}
                          alt={message.sender.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-500 font-medium">
                            {message.sender.name[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">
                          {message.sender.name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {format(message.timestamp, 'MMM d, h:mm a')}
                        </span>
                      </div>
                      {message.subject && (
                        <p className="font-medium text-gray-800 truncate mb-1">
                          {message.subject}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 truncate">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message View */}
      {selectedMessage ? (
        <div className="w-1/2 border-l flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-medium">{selectedMessage.subject}</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">
                <Archive size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-50">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {selectedMessage.sender.avatar ? (
                    <img
                      src={selectedMessage.sender.avatar}
                      alt={selectedMessage.sender.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 font-medium">
                        {selectedMessage.sender.name[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{selectedMessage.sender.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedMessage.sender.email || selectedMessage.sender.phone}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {format(selectedMessage.timestamp, 'MMM d, yyyy h:mm a')}
                </span>
              </div>
              <div className="prose max-w-none">
                {selectedMessage.content}
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center gap-2 mb-2">
              <button className="flex-1 bg-blue-500 text-white rounded-lg px-4 py-2">
                Reply
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 rounded-lg px-4 py-2">
                Forward
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-1/2 border-l flex items-center justify-center text-gray-500">
          <div className="text-center">
            <MessageSquare size={48} className="mx-auto mb-4" />
            <p>Select a message to view</p>
          </div>
        </div>
      )}
    </div>
  );
};