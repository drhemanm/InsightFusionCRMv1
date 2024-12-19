import React, { useState } from 'react';
import { Send, Paperclip, Smile, Image, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: Array<{
    type: 'image' | 'file';
    url: string;
    name: string;
  }>;
}

interface ChatWindowProps {
  contact: {
    id: string;
    name: string;
    avatar?: string;
    status: 'online' | 'offline' | 'away';
  };
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  contact,
  messages,
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            {contact.avatar ? (
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-500 font-medium">
                  {contact.name[0]}
                </span>
              </div>
            )}
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              contact.status === 'online'
                ? 'bg-green-500'
                : contact.status === 'away'
                ? 'bg-yellow-500'
                : 'bg-gray-500'
            }`} />
          </div>
          <div>
            <h3 className="font-medium">{contact.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{contact.status}</p>
          </div>
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender.id === 'current-user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className={`max-w-[70%] ${
              message.sender.id === 'current-user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800'
            } rounded-lg px-4 py-2`}>
              {message.content}
              <div className="text-xs mt-1 opacity-75">
                {format(message.timestamp, 'h:mm a')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex items-end gap-2">
          <div className="relative">
            <button
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <Paperclip size={20} />
            </button>
            {showAttachMenu && (
              <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border p-2">
                <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg w-full">
                  <Image size={18} />
                  <span>Image</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg w-full">
                  <Paperclip size={18} />
                  <span>File</span>
                </button>
              </div>
            )}
          </div>
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={1}
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!newMessage.trim()}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};