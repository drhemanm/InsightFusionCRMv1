import React from 'react';
import { Phone, Mail, Globe, Share2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import type { ContactFormData } from '../../../../types/contacts';

interface Props {
  form: UseFormReturn<ContactFormData>;
}

export const ContactDetailsSection: React.FC<Props> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Contact Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Primary Phone *
          </label>
          <div className="mt-1 relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              {...register('primaryPhone')}
              type="tel"
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="+1234567890"
            />
          </div>
          {errors.primaryPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.primaryPhone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Secondary Phone
          </label>
          <div className="mt-1 relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              {...register('secondaryPhone')}
              type="tel"
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="+1234567890"
            />
          </div>
          {errors.secondaryPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.secondaryPhone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email Address *
        </label>
        <div className="mt-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            {...register('email')}
            type="email"
            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="email@example.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Website
        </label>
        <div className="mt-1 relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            {...register('website')}
            type="url"
            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com"
          />
        </div>
        {errors.website && (
          <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Social Media
        </label>
        <div className="space-y-4">
          <div className="relative">
            <Share2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              {...register('socialMedia.linkedin')}
              type="url"
              placeholder="LinkedIn Profile URL"
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Share2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              {...register('socialMedia.twitter')}
              type="url"
              placeholder="Twitter Profile URL"
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Share2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              {...register('socialMedia.facebook')}
              type="url"
              placeholder="Facebook Profile URL"
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};