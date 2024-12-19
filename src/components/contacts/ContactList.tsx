import React, { useState } from 'react';
import { useContactStore } from '../../store/contactStore';
import { Search, UserPlus, Filter } from 'lucide-react';
import { AddContactModal } from './AddContactModal';

export const ContactList: React.FC = () => {
  const { contacts, isLoading, error } = useContactStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) return <div className="flex justify-center p-8">Loading contacts...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Contacts</h2>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <UserPlus size={20} />
            Add Contact
          </button>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            Filter
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {contacts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No contacts found. Add your first contact to get started!
          </div>
        ) : (
          contacts
            .filter(contact => 
              `${contact.firstName} ${contact.lastName} ${contact.email}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
            .map((contact) => (
              <div key={contact.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{`${contact.firstName} ${contact.lastName}`}</h3>
                    {contact.company && (
                      <p className="text-sm text-gray-500">{contact.company}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    {contact.phone && (
                      <p className="text-sm text-gray-500">{contact.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
        )}
      </div>

      <AddContactModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};