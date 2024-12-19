import React from 'react';
import { AlertTriangle, X, Check, User, Mail, Phone } from 'lucide-react';
import type { Contact } from '../../types';

interface Props {
  duplicates: Contact[];
  onContinue: () => void;
  onCancel: () => void;
}

export const DuplicateWarning: React.FC<Props> = ({
  duplicates,
  onContinue,
  onCancel
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full m-4 p-6">
        <div className="flex items-center gap-3 text-yellow-600 mb-4">
          <AlertTriangle size={24} />
          <h2 className="text-xl font-semibold">Potential Duplicates Found</h2>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-gray-600">
            We found {duplicates.length} potential duplicate contact{duplicates.length > 1 ? 's' : ''}.
            Please review before continuing.
          </p>

          <div className="max-h-64 overflow-y-auto space-y-4">
            {duplicates.map((contact) => (
              <div key={contact.id} className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <User className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {contact.firstName} {contact.lastName}
                    </h3>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        {contact.email}
                      </div>
                      {contact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={14} />
                          {contact.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700"
          >
            Create Anyway
          </button>
        </div>
      </div>
    </div>
  );
};