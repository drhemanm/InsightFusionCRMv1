import React from 'react';
import { User } from 'lucide-react';
import { useOrganizationStore } from '../../store/organizationStore';

interface AgentSelectorProps {
  value: string;
  onChange: (agentId: string) => void;
  error?: string;
}

export const AgentSelector: React.FC<AgentSelectorProps> = ({ value, onChange, error }) => {
  const { teamMembers } = useOrganizationStore();
  const activeAgents = teamMembers.filter(member => member.status === 'active');

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Assign To
      </label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Agent</option>
          <option value="self">Assign to Myself</option>
          {activeAgents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.firstName} {agent.lastName}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};