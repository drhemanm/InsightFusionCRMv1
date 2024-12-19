import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Mail, Phone, MapPin, DollarSign, Users, Briefcase } from 'lucide-react';
import { ContactSchema, type Contact } from '../../types/crm';
import { FormField } from '../ui/FormField';
import { SelectField } from '../ui/SelectField';

interface ContactFormProps {
  initialData?: Partial<Contact>;
  onSubmit: (data: Partial<Contact>) => void;
  isLoading?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialData,
  onSubmit,
  isLoading
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ContactSchema),
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-3 gap-4">
        <FormField
          label="First Name"
          error={errors.firstName?.message}
          required
        >
          <input
            {...register('firstName')}
            type="text"
            className="form-input"
            placeholder="John"
          />
        </FormField>

        <FormField
          label="Middle Name"
          error={errors.middleName?.message}
        >
          <input
            {...register('middleName')}
            type="text"
            className="form-input"
            placeholder="William"
          />
        </FormField>

        <FormField
          label="Last Name"
          error={errors.lastName?.message}
          required
        >
          <input
            {...register('lastName')}
            type="text"
            className="form-input"
            placeholder="Doe"
          />
        </FormField>
      </div>

      {/* Company Information */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Company Name"
          error={errors.companyName?.message}
          required
          icon={<Building2 className="text-gray-400" size={20} />}
        >
          <input
            {...register('companyName')}
            type="text"
            className="form-input"
            placeholder="Acme Corp"
          />
        </FormField>

        <FormField
          label="Job Title"
          error={errors.jobTitle?.message}
          required
          icon={<Briefcase className="text-gray-400" size={20} />}
        >
          <input
            {...register('jobTitle')}
            type="text"
            className="form-input"
            placeholder="Senior Manager"
          />
        </FormField>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-3 gap-4">
        <FormField
          label="Business Email"
          error={errors.businessContact?.email?.message}
          required
          icon={<Mail className="text-gray-400" size={20} />}
        >
          <input
            {...register('businessContact.email')}
            type="email"
            className="form-input"
            placeholder="john.doe@company.com"
          />
        </FormField>

        <FormField
          label="Office Phone"
          error={errors.businessContact?.officePhone?.message}
          icon={<Phone className="text-gray-400" size={20} />}
        >
          <input
            {...register('businessContact.officePhone')}
            type="tel"
            className="form-input"
            placeholder="+1 (555) 123-4567"
          />
        </FormField>

        <FormField
          label="Mobile Phone"
          error={errors.businessContact?.mobile?.message}
          icon={<Phone className="text-gray-400" size={20} />}
        >
          <input
            {...register('businessContact.mobile')}
            type="tel"
            className="form-input"
            placeholder="+1 (555) 987-6543"
          />
        </FormField>
      </div>

      {/* Business Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Business Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Street Address"
            error={errors.businessAddress?.street?.message}
            required
            icon={<MapPin className="text-gray-400" size={20} />}
          >
            <input
              {...register('businessAddress.street')}
              type="text"
              className="form-input"
              placeholder="123 Business Ave"
            />
          </FormField>

          <FormField
            label="City"
            error={errors.businessAddress?.city?.message}
            required
          >
            <input
              {...register('businessAddress.city')}
              type="text"
              className="form-input"
              placeholder="San Francisco"
            />
          </FormField>

          <FormField
            label="State/Province"
            error={errors.businessAddress?.state?.message}
            required
          >
            <input
              {...register('businessAddress.state')}
              type="text"
              className="form-input"
              placeholder="CA"
            />
          </FormField>

          <FormField
            label="Postal Code"
            error={errors.businessAddress?.postalCode?.message}
            required
          >
            <input
              {...register('businessAddress.postalCode')}
              type="text"
              className="form-input"
              placeholder="94105"
            />
          </FormField>

          <FormField
            label="Country"
            error={errors.businessAddress?.country?.message}
            required
          >
            <input
              {...register('businessAddress.country')}
              type="text"
              className="form-input"
              placeholder="United States"
            />
          </FormField>
        </div>
      </div>

      {/* Lead Information */}
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Lead Source"
          error={errors.leadSource?.message}
          required
          options={[
            { value: 'website', label: 'Website' },
            { value: 'referral', label: 'Referral' },
            { value: 'social_media', label: 'Social Media' },
            { value: 'event', label: 'Event' },
            { value: 'cold_call', label: 'Cold Call' },
            { value: 'other', label: 'Other' }
          ]}
          {...register('leadSource')}
        />

        <SelectField
          label="Lead Status"
          error={errors.leadStatus?.message}
          required
          options={[
            { value: 'new', label: 'New' },
            { value: 'contacted', label: 'Contacted' },
            { value: 'qualified', label: 'Qualified' },
            { value: 'proposal', label: 'Proposal' },
            { value: 'negotiation', label: 'Negotiation' },
            { value: 'closed_won', label: 'Closed Won' },
            { value: 'closed_lost', label: 'Closed Lost' }
          ]}
          {...register('leadStatus')}
        />
      </div>

      {/* Company Details */}
      <div className="grid grid-cols-3 gap-4">
        <FormField
          label="Industry"
          error={errors.industry?.message}
          required
          icon={<Building2 className="text-gray-400" size={20} />}
        >
          <input
            {...register('industry')}
            type="text"
            className="form-input"
            placeholder="Technology"
          />
        </FormField>

        <SelectField
          label="Company Size"
          error={errors.companySize?.message}
          required
          icon={<Users className="text-gray-400" size={20} />}
          options={[
            { value: '1-10', label: '1-10 employees' },
            { value: '11-50', label: '11-50 employees' },
            { value: '51-200', label: '51-200 employees' },
            { value: '201-500', label: '201-500 employees' },
            { value: '501-1000', label: '501-1000 employees' },
            { value: '1001-5000', label: '1001-5000 employees' },
            { value: '5000+', label: '5000+ employees' }
          ]}
          {...register('companySize')}
        />

        <SelectField
          label="Annual Revenue"
          error={errors.annualRevenue?.message}
          required
          icon={<DollarSign className="text-gray-400" size={20} />}
          options={[
            { value: 'under_1m', label: 'Under $1M' },
            { value: '1m_5m', label: '$1M - $5M' },
            { value: '5m_10m', label: '$5M - $10M' },
            { value: '10m_50m', label: '$10M - $50M' },
            { value: '50m_100m', label: '$50M - $100M' },
            { value: 'over_100m', label: 'Over $100M' }
          ]}
          {...register('annualRevenue')}
        />
      </div>

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