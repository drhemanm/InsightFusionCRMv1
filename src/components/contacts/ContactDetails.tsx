import React from 'react';
import { format } from 'date-fns';
import { 
  Building2, Mail, Phone, MapPin, Calendar, DollarSign, 
  Users, Briefcase, Tag, Edit2 
} from 'lucide-react';
import type { Contact } from '../../types/crm';

interface ContactDetailsProps {
  contact: Contact;
  onEdit: () => void;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  contact,
  onEdit
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">
                {contact.firstName[0]}{contact.lastName[0]}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {contact.firstName} {contact.middleName ? `${contact.middleName} ` : ''}{contact.lastName}
              </h2>
              <p className="text-gray-600">{contact.jobTitle} at {contact.companyName}</p>
            </div>
          </div>
          <button
            onClick={onEdit}
            className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-50"
          >
            <Edit2 size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Mail className="text-gray-400" size={20} />
            <a href={`mailto:${contact.businessContact.email}`} className="text-blue-600 hover:underline">
              {contact.businessContact.email}
            </a>
          </div>
          {contact.businessContact.officePhone && (
            <div className="flex items-center gap-2">
              <Phone className="text-gray-400" size={20} />
              <a href={`tel:${contact.businessContact.officePhone}`} className="text-blue-600 hover:underline">
                {contact.businessContact.officePhone}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Company Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="text-gray-400" size={20} />
                <span>{contact.companyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="text-gray-400" size={20} />
                <span>{contact.industry}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-gray-400" size={20} />
                <span>{contact.companySize} employees</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="text-gray-400" size={20} />
                <span>Annual Revenue: {contact.annualRevenue.replace('_', ' - ').toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Business Address</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="text-gray-400 mt-1" size={20} />
                <div>
                  <p>{contact.businessAddress.street}</p>
                  <p>{contact.businessAddress.city}, {contact.businessAddress.state} {contact.businessAddress.postalCode}</p>
                  <p>{contact.businessAddress.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Lead Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Lead Source:</span>
                <span className="font-medium">{contact.leadSource.replace('_', ' ').toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Lead Status:</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  contact.leadStatus === 'closed_won'
                    ? 'bg-green-100 text-green-800'
                    : contact.leadStatus === 'closed_lost'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {contact.leadStatus.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Contact:</span>
                <span>{format(contact.lastContactDate, 'MMM d, yyyy')}</span>
              </div>
              {contact.nextFollowUpDate && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Next Follow-up:</span>
                  <span>{format(contact.nextFollowUpDate, 'MMM d, yyyy')}</span>
                </div>
              )}
              {contact.dealValue && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Deal Value:</span>
                  <span className="font-medium">MUR {contact.dealValue.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {contact.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};