import React from 'react';
import { Download, Trash2, Clock } from 'lucide-react';
import { gdprService } from '../../services/gdprService';

export const DataRequestManager: React.FC = () => {
  const handleDataAccess = async () => {
    await gdprService.requestDataAccess('current-user');
  };

  const handleDataDeletion = async () => {
    await gdprService.requestDataDeletion('current-user');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Data Management</h2>

      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="text-blue-500" size={24} />
              <div>
                <h3 className="font-medium">Download Your Data</h3>
                <p className="text-sm text-gray-600">
                  Get a copy of all your personal data
                </p>
              </div>
            </div>
            <button
              onClick={handleDataAccess}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Request Export
            </button>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trash2 className="text-red-500" size={24} />
              <div>
                <h3 className="font-medium">Delete Account</h3>
                <p className="text-sm text-gray-600">
                  Permanently remove all your data
                </p>
              </div>
            </div>
            <button
              onClick={handleDataDeletion}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Request Deletion
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} />
            <p>
              Requests are typically processed within 30 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};