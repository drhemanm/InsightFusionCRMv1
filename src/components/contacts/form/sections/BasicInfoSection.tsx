import React from 'react';
import { User, Mail, Phone, Building2, Briefcase, Globe, MapPin } from 'lucide-react';
import { FormField } from '../../../ui/FormField';

interface Props {
  formData: any;
  onChange: (data: any) => void;
}

export const BasicInfoSection: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Basic Information</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="First Name"
          icon={<User size={18} />}
          required
        >
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => onChange({ ...formData, firstName: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="John"
          />
        </FormField>

        <FormField
          label="Last Name"
          icon={<User size={18} />}
          required
        >
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => onChange({ ...formData, lastName: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Doe"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Email"
          icon={<Mail size={18} />}
          required
        >
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="john.doe@example.com"
          />
        </FormField>

        <FormField
          label="Phone"
          icon={<Phone size={18} />}
        >
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="+1234567890"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Company"
          icon={<Building2 size={18} />}
        >
          <input
            type="text"
            value={formData.company}
            onChange={(e) => onChange({ ...formData, company: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Acme Corp"
          />
        </FormField>

        <FormField
          label="Position"
          icon={<Briefcase size={18} />}
        >
          <input
            type="text"
            value={formData.position}
            onChange={(e) => onChange({ ...formData, position: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Senior Manager"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Website"
          icon={<Globe size={18} />}
        >
          <input
            type="url"
            value={formData.website}
            onChange={(e) => onChange({ ...formData, website: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </FormField>

        <FormField
          label="Department"
          icon={<Building2 size={18} />}
        >
          <input
            type="text"
            value={formData.department}
            onChange={(e) => onChange({ ...formData, department: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Sales"
          />
        </FormField>
      </div>
    </div>
  );
};