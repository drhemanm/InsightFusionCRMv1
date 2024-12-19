import React, { useState } from 'react';
import { User, Calendar, Edit2 } from 'lucide-react';
import { useContactStore } from '../../../store/contactStore';
import { format } from 'date-fns';

interface Props {
  contactId: string;
  onUpdate: (updates: any) => Promise<void>;
}

export const PersonalInfo: React.FC<Props> = ({ contactId, onUpdate }) => {
  const { contacts } = useContactStore();
  const contact = contacts.find(c => c.id === contactId);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: contact?.firstName || '',
    lastName: contact?.lastName || '',
    dateOfBirth: contact?.dateOfBirth || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(formData);
    setIsEditing(false);
  };

  if (!contact) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <User className="text-blue-500" size={24} />
          <h2 className="text-xl font-semibold">Personal Information</h2>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-gray-500 hover:text-blue-500"
        >
          <Edit2 size={20} />
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth *
            </label>
            <div className="mt-1 relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Required for birthday notifications
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">First Name</label>
              <p className="font-medium">{contact.firstName}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Last Name</label>
              <p className="font-medium">{contact.lastName}</p>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Date of Birth</label>
            <p className="font-medium">
              {contact.dateOfBirth ? format(new Date(contact.dateOfBirth), 'dd/MM/yyyy') : 'Not set'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};