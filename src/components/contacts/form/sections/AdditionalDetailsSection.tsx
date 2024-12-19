import React from 'react';
import { Tag, Globe, MessageSquare, Calendar } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import type { ContactFormData } from '../../../../types/contacts';

interface Props {
  form: UseFormReturn<ContactFormData>;
}

export const AdditionalDetailsSection: React.FC<Props> = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;
  const tags = watch('tags') || [];

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!tags.includes(newTag)) {
        setValue('tags', [...tags, newTag]);
      }
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue('tags', tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Additional Details</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category *
        </label>
        <select
          {...register('category')}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select category</option>
          <option value="family">Family</option>
          <option value="friend">Friend</option>
          <option value="colleague">Colleague</option>
          <option value="client">Client</option>
          <option value="other">Other</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Important Dates
        </label>
        <div className="mt-2 space-y-2">
          {watch('importantDates')?.map((date, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1">
                <input
                  {...register(`importantDates.${index}.date`)}
                  type="date"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex-1">
                <input
                  {...register(`importantDates.${index}.occasion`)}
                  type="text"
                  placeholder="Occasion"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    {...register(`importantDates.${index}.reminder`)}
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Reminder</span>
                </label>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const currentDates = watch('importantDates') || [];
              setValue('importantDates', [...currentDates, { date: '', occasion: '', reminder: false }]);
            }}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Add Date
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <div className="mt-1">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-blue-400 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              onKeyDown={handleAddTag}
              placeholder="Type and press Enter to add tags"
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Preferred Contact Method *
          </label>
          <select
            {...register('preferredContactMethod')}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="sms">SMS</option>
            <option value="any">Any</option>
          </select>
          {errors.preferredContactMethod && (
            <p className="mt-1 text-sm text-red-600">{errors.preferredContactMethod.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time Zone *
          </label>
          <div className="mt-1 relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <select
              {...register('timezone')}
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select timezone</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
          {errors.timezone && (
            <p className="mt-1 text-sm text-red-600">{errors.timezone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <div className="mt-1 relative">
          <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
          <textarea
            {...register('notes')}
            rows={4}
            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add any additional notes..."
          />
        </div>
      </div>
    </div>
  );
};