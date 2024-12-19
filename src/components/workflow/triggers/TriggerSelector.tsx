```typescript
import React from 'react';
import { Mail, Calendar, DollarSign, User, Star } from 'lucide-react';
import type { WorkflowTrigger } from '../../../types/workflow';

const triggers = [
  {
    id: 'new_contact',
    name: 'New Contact Created',
    icon: User,
    category: 'contacts'
  },
  {
    id: 'deal_stage_change',
    name: 'Deal Stage Changed',
    icon: DollarSign,
    category: 'deals'
  },
  {
    id: 'email_received',
    name: 'Email Received',
    icon: Mail,
    category: 'communication'
  },
  {
    id: 'meeting_scheduled',
    name: 'Meeting Scheduled',
    icon: Calendar,
    category: 'calendar'
  },
  {
    id: 'lead_score_change',
    name: 'Lead Score Changed',
    icon: Star,
    category: 'leads'
  }
];

interface Props {
  onSelect: (trigger: WorkflowTrigger) => void;
}

export const TriggerSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {triggers.map((trigger) => {
        const Icon = trigger.icon;
        return (
          <button
            key={trigger.id}
            onClick={() => onSelect({ type: trigger.id, conditions: {} })}
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Icon className="text-blue-500" size={24} />
            <div className="text-left">
              <div className="font-medium">{trigger.name}</div>
              <div className="text-sm text-gray-500 capitalize">
                {trigger.category}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
```