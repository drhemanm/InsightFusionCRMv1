```typescript
import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, Clock, Mail, Zap } from 'lucide-react';
import { useAIStore } from '../../store/aiStore';
import { SentimentAnalyzer } from './SentimentAnalyzer';

export const ProductivityAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, suggestions } = useAIStore();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isProcessing) return;

    setIsProcessing(true);
    await sendMessage(message);
    setMessage('');
    setIsProcessing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-2rem)] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Brain className="text-blue-500" size={24} />
          <div>
            <h2 className="font-bold">AI Productivity Assistant</h2>
            <p className="text-sm text-gray-500">Your personal task and email manager</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {msg.content}
              {msg.type && (
                <div className="flex items-center gap-2 mt-2 text-sm opacity-75">
                  {msg.type === 'task' && <Clock size={16} />}
                  {msg.type === 'email' && <Mail size={16} />}
                  {msg.type === 'automation' && <Zap size={16} />}
                  {msg.type}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="p-4 border-t bg-gray-50">
          <div className="flex gap-2 overflow-x-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setMessage(suggestion)}
                className="flex-shrink-0 px-3 py-1 bg-white border rounded-full text-sm hover:bg-gray-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing || !message.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
```