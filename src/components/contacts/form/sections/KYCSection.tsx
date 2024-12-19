import React from 'react';
import { Calendar, User, Globe, MapPin, Briefcase, Upload, AlertCircle } from 'lucide-react';
import { FormField } from '../../../ui/FormField';

interface Props {
  formData: any;
  onChange: (data: any) => void;
}

export const KYCSection: React.FC<Props> = ({ formData, onChange }) => {
  const handleFileChange = (field: 'governmentId' | 'proofOfAddress') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      onChange({ ...formData, [field]: file });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <AlertCircle className="inline-block text-blue-500 mr-2" size={20} />
        <span className="text-sm text-blue-700">
          The following fields are optional and help us better understand our customers. Your privacy is important to us, and this information will be securely stored following data protection regulations.
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Date of Birth (Optional)"
          icon={<Calendar size={18} />}
        >
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => onChange({ ...formData, dateOfBirth: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField
          label="Nationality (Optional)"
          icon={<Globe size={18} />}
        >
          <input
            type="text"
            value={formData.nationality}
            onChange={(e) => onChange({ ...formData, nationality: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Mauritian"
          />
        </FormField>
      </div>

      <FormField
        label="Passport/ID Number (Optional)"
        icon={<User size={18} />}
      >
        <input
          type="text"
          value={formData.passportIdNumber}
          onChange={(e) => onChange({ ...formData, passportIdNumber: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter passport or ID number"
        />
      </FormField>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Current Address (Optional)</h4>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Street Address"
            icon={<MapPin size={18} />}
          >
            <input
              type="text"
              value={formData.currentAddress.street}
              onChange={(e) => onChange({
                ...formData,
                currentAddress: { ...formData.currentAddress, street: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="123 Main St"
            />
          </FormField>

          <FormField label="City">
            <input
              type="text"
              value={formData.currentAddress.city}
              onChange={(e) => onChange({
                ...formData,
                currentAddress: { ...formData.currentAddress, city: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="City"
            />
          </FormField>

          <FormField label="State/Province">
            <input
              type="text"
              value={formData.currentAddress.state}
              onChange={(e) => onChange({
                ...formData,
                currentAddress: { ...formData.currentAddress, state: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="State"
            />
          </FormField>

          <FormField label="Postal Code">
            <input
              type="text"
              value={formData.currentAddress.postalCode}
              onChange={(e) => onChange({
                ...formData,
                currentAddress: { ...formData.currentAddress, postalCode: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Postal Code"
            />
          </FormField>

          <FormField label="Country">
            <input
              type="text"
              value={formData.currentAddress.country}
              onChange={(e) => onChange({
                ...formData,
                currentAddress: { ...formData.currentAddress, country: e.target.value }
              })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Country"
            />
          </FormField>
        </div>
      </div>

      <FormField
        label="Occupation (Optional)"
        icon={<Briefcase size={18} />}
      >
        <input
          type="text"
          value={formData.occupation}
          onChange={(e) => onChange({ ...formData, occupation: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Current occupation"
        />
      </FormField>

      <div className="space-y-4">
        <FormField
          label="Government ID (Optional, PDF/JPG/PNG, max 5MB)"
          icon={<Upload size={18} />}
        >
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange('governmentId')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField
          label="Proof of Address (Optional, PDF/JPG/PNG, max 5MB)"
          icon={<Upload size={18} />}
        >
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange('proofOfAddress')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>
      </div>
    </div>
  );
};