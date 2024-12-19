import React, { useState } from 'react';
import { useContactStore } from '../../../store/contactStore';
import { Search, Phone, Mail } from 'lucide-react';

interface AgentContactsProps {
  agentId?: string;
}

export const AgentContacts: React.FC<AgentContactsProps> = ({ agentId }) => {
  const { contacts } = useContactStore();
  const [searchQuery, setSearchQuery] = useState('');

  const agentContacts = contacts.filter(contact => 
    contact.assignedTo === agentId &&
    (searchQuery === '' || 
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Your Contacts</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {agentContacts.map((contact) => (
          <div key={contact.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{contact.firstName} {contact.lastName}</div>
              <div className="flex items-center gap-2">
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="p-1 text-gray-500 hover:text-blue-600">
                    <Phone size={16} />
                  </a>
                )}
                <a href={`mailto:${contact.email}`} className="p-1 text-gray-500 hover:text-blue-600">
                  <Mail size={16} />
                </a>
              </div>
            </div>
            {contact.company && (
              <div className="text-sm text-gray-500">{contact.company}</div>
            )}
          </div>
        ))}

        {agentContacts.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No contacts found
          </div>
        )}
      </div>
    </div>
  );
};