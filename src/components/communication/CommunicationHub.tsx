import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Calendar, Filter, Search } from 'lucide-react';
import { InboxView } from './InboxView';
import { ChatWindow } from './ChatWindow';
import { CallHistory } from './CallHistory';

export const CommunicationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'chat' | 'calls'>('inbox');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-2rem)] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Communications</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'inbox'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Mail size={20} />
            Inbox
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'chat'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MessageSquare size={20} />
            Chat
          </button>
          <button
            onClick={() => setActiveTab('calls')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'calls'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Phone size={20} />
            Calls
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'inbox' && <InboxView />}
        {activeTab === 'chat' && (
          <ChatWindow
            contact={{
              id: '1',
              name: 'John Doe',
              status: 'online'
            }}
            messages={[]}
            onSendMessage={() => {}}
          />
        )}
        {activeTab === 'calls' && <CallHistory />}
      </div>
    </div>
  );
};