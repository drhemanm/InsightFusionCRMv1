import React from 'react';
import { PersonalInfo } from './PersonalInfo';
import { KYCInformation } from './KYCInformation';
import { CommunicationPreferences } from './CommunicationPreferences';
import { useContactStore } from '../../../store/contactStore';
import type { Contact } from '../../../types/crm';

export const ClientProfile: React.FC<{ contactId: string }> = ({ contactId }) => {
  const { updateContact, isLoading } = useContactStore();

  const handleUpdate = async (updates: Partial<Contact>) => {
    await updateContact(contactId, updates);
  };

  return (
    <div className="space-y-6">
      <PersonalInfo contactId={contactId} onUpdate={handleUpdate} />
      <KYCInformation contactId={contactId} onUpdate={handleUpdate} />
      <CommunicationPreferences contactId={contactId} onUpdate={handleUpdate} />
    </div>
  );
};