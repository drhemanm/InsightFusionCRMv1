import React from 'react';
import { Mail, Bell, Calendar, FileText, MessageSquare } from 'lucide-react';
import type { WorkflowAction } from '../../../types/workflow';

const actionTypes = [
  {
    type: 'send_email',
    name: 'Send Email',
    icon: Mail,
    fields: ['template', 'to', 'subject', 'body']
  },
  {
    type: 'create_task',
    name: 'Create Task',
    icon: FileText,
    fields: ['title', 'description', 'assignee', 'dueDate']
  },
  {
    type: 'send_notification',
    name: 'Send Notification',
    icon: Bell,
    fields: ['message', 'recipients', 'priority']
  },
  {
    type: 'schedule_meeting',
    name: 'Schedule Meeting',
    icon: Calendar,
    fields: ['title', 'participants', 'date', 'duration']
  },
  {
    type: 'send_message',
    name: 'Send Message',
    icon: MessageSquare,
    fields: ['channel', 'message', 'recipients']
  }
];

interface Props {
  actions: WorkflowAction[];
  onChange: (actions: WorkflowAction[]) => void;
}

export const ActionBuilder: React.FC<Props> = ({ actions, onChange }) => {
  const addAction = (type: string) => {
    const newAction: WorkflowAction = {
      id: crypto.randomUUID(),
      type,
      params: {},
      timestamp: new Date(),
      userId: 'current-user',
      context: { screen: 'automation' }
    };
    onChange([...actions, newAction]);
  };

  const removeAction = (id: string) => {
    onChange(actions.filter(action => action.id !== id));
  };

  return (
    <div className="space-y-4">
      {actions.map((action, index) => {
        const actionType = actionTypes.find(t => t.type === action.type);
        if (!actionType) return null;
        
        const Icon = actionType.icon;
        return (
          <div key={action.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Icon className="text-blue-500" size={24} />
                <h4 className="font-medium">{actionType.name}</h4>
              </div>
              <button
                onClick={() => removeAction(action.id)}
                className="text-gray-400 hover:text-red-500"
              >
                Remove
              </button>
            </div>
            
            <div className="space-y-4">
              {actionType.fields.map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field.replace('_', ' ')}
                  </label>
                  <input
                    type="text"
                    value={action.params[field] || ''}
                    onChange={(e) => {
                      const updatedActions = [...actions];
                      updatedActions[index].params[field] = e.target.value;
                      onChange(updatedActions);
                    }}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {actionTypes.map((type) => (
          <button
            key={type.type}
            onClick={() => addAction(type.type)}
            className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <type.icon className="text-blue-500" size={24} />
            <span className="text-sm font-medium">{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};