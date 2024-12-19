import React, { useState } from 'react';
import { DollarSign, Calendar, FileText } from 'lucide-react';
import { useDealStore } from '../../store/dealStore';
import { useContactStore } from '../../store/contactStore';
import { useAuthStore } from '../../store/authStore';
import { dealWorkflowService } from '../../services/deals/DealWorkflowService';
import { FormField } from '../ui/FormField';
import { ErrorMessage } from '../ui/ErrorMessage';
import { AgentSelector } from './AgentSelector';

interface CreateDealFormProps {
  onClose: () => void;
}

export const CreateDealForm: React.FC<CreateDealFormProps> = ({ onClose }) => {
  const { addDeal, isLoading } = useDealStore();
  const { contacts } = useContactStore();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    value: '',
    startDate: '',
    expectedCloseDate: '',
    priority: 'medium' as const,
    stage: 'lead' as const,
    status: 'new_lead' as const,
    contactId: '',
    assignedTo: '',
    tags: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate required fields
    const validationErrors: Record<string, string> = {};
    if (!formData.title) validationErrors.title = 'Title is required';
    if (!formData.contactId) validationErrors.contactId = 'Contact is required';
    if (!formData.startDate) validationErrors.startDate = 'Start date is required';
    if (!formData.expectedCloseDate) validationErrors.expectedCloseDate = 'Expected close date is required';
    if (!formData.assignedTo) validationErrors.assignedTo = 'Assignment is required';
    if (!formData.status) validationErrors.status = 'Status is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const deal = await addDeal({
        ...formData,
        value: parseFloat(formData.value) || 0,
        assignedTo: formData.assignedTo === 'self' ? user!.id : formData.assignedTo
      });

      await dealWorkflowService.processDealCreation(deal);
      
      onClose();
    } catch (error) {
      setErrors({ submit: 'Failed to create deal' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Deal Title"
        error={errors.title}
        required
        icon={<FileText size={18} />}
      >
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter deal title"
        />
      </FormField>

      <FormField
        label="Deal Value (MUR)"
        error={errors.value}
        icon={<DollarSign size={18} />}
      >
        <input
          type="text"
          value={formData.value}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^\d*\.?\d*$/.test(value)) {
              setFormData({ ...formData, value });
            }
          }}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter deal value"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Start Date"
          error={errors.startDate}
          required
          icon={<Calendar size={18} />}
        >
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField
          label="Expected Close Date"
          error={errors.expectedCloseDate}
          required
          icon={<Calendar size={18} />}
        >
          <input
            type="date"
            value={formData.expectedCloseDate}
            onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </FormField>
      </div>

      <FormField
        label="Contact"
        error={errors.contactId}
        required
      >
        <select
          value={formData.contactId}
          onChange={(e) => setFormData({ ...formData, contactId: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select contact</option>
          {contacts.map(contact => (
            <option key={contact.id} value={contact.id}>
              {contact.firstName} {contact.lastName} - {contact.email}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Status"
        error={errors.status}
        required
      >
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="new_lead">New Lead</option>
          <option value="initial_contact">Initial Contact</option>
          <option value="in_negotiation">In Negotiation</option>
          <option value="proposal_sent">Proposal Sent</option>
          <option value="contract_pending">Contract Pending</option>
          <option value="closed_won">Closed Won</option>
          <option value="closed_lost">Closed Lost</option>
          <option value="on_hold">On Hold</option>
        </select>
      </FormField>

      <AgentSelector
        value={formData.assignedTo}
        onChange={(agentId) => setFormData({ ...formData, assignedTo: agentId })}
        error={errors.assignedTo}
      />

      <FormField
        label="Description"
        error={errors.description}
        icon={<FileText size={18} />}
      >
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter deal description"
        />
      </FormField>

      {errors.submit && (
        <ErrorMessage type="error" message={errors.submit} />
      )}

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Deal'}
        </button>
      </div>
    </form>
  );
};