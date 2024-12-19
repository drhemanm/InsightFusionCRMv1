import React, { useState } from 'react';
import { BasicInfoSection } from './form/sections/BasicInfoSection';
import { KYCSection } from './form/sections/KYCSection';

export const CreateContactForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    website: '',
    department: '',
    tags: [] as string[],
    
    // KYC Fields
    dateOfBirth: '',
    passportIdNumber: '',
    nationality: '',
    currentAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    occupation: '',
    companyOrganization: '',
    governmentId: null as File | null,
    proofOfAddress: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Handle form submission
      onSuccess();
    } catch (error) {
      console.error('Failed to create contact:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <BasicInfoSection 
        formData={formData} 
        onChange={setFormData} 
      />
      
      <KYCSection 
        formData={formData} 
        onChange={setFormData} 
      />

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Create Contact
        </button>
      </div>
    </form>
  );
};