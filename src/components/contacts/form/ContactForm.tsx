import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { ContactDetailsSection } from './sections/ContactDetailsSection';
import { AddressSection } from './sections/AddressSection';
import { ProfessionalSection } from './sections/ProfessionalSection';
import { AdditionalDetailsSection } from './sections/AdditionalDetailsSection';
import { EmergencyContactSection } from './sections/EmergencyContactSection';
import { ContactSchema } from '../../../types/contacts';
import type { ContactFormData } from '../../../types/contacts';

interface Props {
  onSubmit: (data: ContactFormData) => void;
  initialData?: Partial<ContactFormData>;
  isLoading?: boolean;
}

export const ContactForm: React.FC<Props> = ({ onSubmit, initialData, isLoading }) => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: initialData
  });

  const handleSubmit = (data: ContactFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      <PersonalInfoSection form={form} />
      <ContactDetailsSection form={form} />
      <AddressSection form={form} />
      <ProfessionalSection form={form} />
      <AdditionalDetailsSection form={form} />
      <EmergencyContactSection form={form} />

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Contact'}
        </button>
      </div>
    </form>
  );
};