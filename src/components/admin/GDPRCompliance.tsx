import React, { useState } from 'react';
import { gdprService } from '../../services/gdprService';
import { Shield, Download, Trash2, ClipboardList } from 'lucide-react';

export const GDPRCompliance: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleDataRequest = async (type: 'access' | 'delete') => {
    if (!selectedUserId) return;
    
    setProcessing(true);
    try {
      if (type === 'access') {
        await gdprService.requestDataAccess(selectedUserId);
      } else {
        await gdprService.requestDataDeletion(selectedUserId);
      }
    } catch (error) {
      console.error('Failed to process request:', error);
    }
    setProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="text-green-500" size={24} />
          <h2 className="text-xl font-semibold">GDPR Compliance Tools</h2>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <Download className="text-blue-500" size={20} />
                <h3 className="font-medium">Data Export</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Export all personal data for a specific user in a machine-readable format.
              </p>
              <button
                onClick={() => handleDataRequest('access')}
                disabled={!selectedUserId || processing}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {processing ? 'Processing...' : 'Request Data Export'}
              </button>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <Trash2 className="text-red-500" size={20} />
                <h3 className="font-medium">Data Deletion</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Permanently delete all personal data associated with a user.
              </p>
              <button
                onClick={() => handleDataRequest('delete')}
                disabled={!selectedUserId || processing}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                {processing ? 'Processing...' : 'Request Data Deletion'}
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="text-gray-500" size={20} />
              <h3 className="font-medium">Audit Log</h3>
            </div>
            <div className="space-y-4">
              {/* In production, fetch and display actual audit logs */}
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <span className="font-medium">Data Access Request</span>
                  <div className="text-sm text-gray-500">user123</div>
                </div>
                <div className="text-sm text-gray-500">
                  2024-03-15 14:30:00
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <span className="font-medium">Consent Updated</span>
                  <div className="text-sm text-gray-500">user456</div>
                </div>
                <div className="text-sm text-gray-500">
                  2024-03-14 09:15:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};