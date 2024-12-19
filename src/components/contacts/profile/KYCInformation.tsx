import React, { useState } from 'react';
import { Shield, Edit2, Phone, Mail, MapPin, CreditCard } from 'lucide-react';
import { useContactStore } from '../../../store/contactStore';

interface Props {
  contactId: string;
  onUpdate: (updates: any) => Promise<void>;
}

export const KYCInformation: React.FC<Props> = ({ contactId, onUpdate }) => {
  const { contacts } = useContactStore();
  const contact = contacts.find(c => c.id === contactId);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    legalName: contact?.kyc?.legalName || '',
    phone: contact?.kyc?.phone || '',
    email: contact?.kyc?.email || '',
    address: contact?.kyc?.address || '',
    governmentIdType: contact?.kyc?.governmentIdType || '',
    governmentIdNumber: contact?.kyc?.governmentIdNumber || '',
    preferredCommunication: contact?.kyc?.preferredCommunication || 'email'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate({ kyc: formData });
    setIsEditing(false);
  };

  if (!contact) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="text-green-500" size={24} />
          <h2 className="text-xl font-semibold">KYC Information</h2>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Legal Name
            </label>
            <input
              type="text"
              value={formData.legalName}
              onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <div className="mt-1 relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Residential Address
            </label>
            <div className="mt-1 relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Government ID Type
              </label>
              <select
                value={formData.governmentIdType}
                onChange={(e) => setFormData({ ...formData, governmentIdType: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select ID Type</option>
                <option value="passport">Passport</option>
                <option value="national_id">National ID</option>
                <option value="drivers_license">Driver's License</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                ID Number
              </label>
              <div className="mt-1 relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.governmentIdNumber}
                  onChange={(e) => setFormData({ ...formData, governmentIdNumber: e.target.value })}
                  className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
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
        <div className="space-y-6">
          {contact.kyc ? (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500">Legal Name</label>
                  <p className="font-medium">{contact.kyc.legalName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Contact Number</label>
                  <p className="font-medium">{contact.kyc.phone}</p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Email Address</label>
                <p className="font-medium">{contact.kyc.email}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Residential Address</label>
                <p className="font-medium whitespace-pre-line">{contact.kyc.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500">Government ID</label>
                  <p className="font-medium">
                    {contact.kyc.governmentIdType} - {contact.kyc.governmentIdNumber}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Preferred Communication</label>
                  <p className="font-medium capitalize">
                    {contact.kyc.preferredCommunication}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium mb-2">No KYC Information</p>
              <p className="text-sm">
                Click the edit button to add KYC information for this contact.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};