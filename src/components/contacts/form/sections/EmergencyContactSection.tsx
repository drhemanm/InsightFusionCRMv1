import React from 'react';
import { User, Phone, Mail, Heart } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import type { ContactFormData } from '../../../../types/contacts';

interface Props {
  form: UseFormReturn<ContactFormData>;
}

export const EmergencyContactSection: React.FC<Props> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Heart className="text-red-500" size={24} />
        <h3 className="text-lg font-medium">Emergency Contact</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <div className="mt-1 relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              {...register('emergencyContact.name')}
              type="text"
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {errors.emergencyContact?.name && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Relationship *
          </label>
          <input
            {...register('emergencyContact.relationship')}
            type="text"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.emergencyContact?.relationship && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.relationship.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <div className="mt-1 relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              {...register('emergencyContact.phone')}
              type="tel"
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {errors.emergencyContact?.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="mt-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              {...register('emergencyContact.email')}
              type="email"
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {errors.emergencyContact?.email && (
            <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.email.message}</p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          Emergency contact information will only be used in case of emergencies and is stored securely.
        </p>
      </div>
    </div>
  );
};