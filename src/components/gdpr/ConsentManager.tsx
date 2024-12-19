import React, { useState } from 'react';
import { Shield, Info } from 'lucide-react';
import { gdprService } from '../../services/gdprService';
import type { Consent } from '../../types/gdpr';

export const ConsentManager: React.FC = () => {
  const [consent, setConsent] = useState<Consent>({
    marketing: false,
    analytics: false,
    thirdParty: false,
    timestamp: new Date(),
    ipAddress: 'client-ip' // In production, get from server
  });

  const handleConsentUpdate = async (key: keyof Omit<Consent, 'timestamp' | 'ipAddress'>) => {
    const updatedConsent = {
      ...consent,
      [key]: !consent[key],
      timestamp: new Date()
    };
    setConsent(updatedConsent);
    await gdprService.recordConsent('current-user', updatedConsent);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="text-green-500" size={24} />
        <h2 className="text-xl font-semibold">Privacy Preferences</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium">Marketing Communications</h3>
            <p className="text-sm text-gray-600">
              Receive updates about products, services, and promotions
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={consent.marketing}
              onChange={() => handleConsentUpdate('marketing')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium">Analytics</h3>
            <p className="text-sm text-gray-600">
              Help us improve by allowing usage analytics
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={consent.analytics}
              onChange={() => handleConsentUpdate('analytics')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium">Third-Party Integration</h3>
            <p className="text-sm text-gray-600">
              Allow data sharing with integrated services
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={consent.thirdParty}
              onChange={() => handleConsentUpdate('thirdParty')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
          <Info size={16} />
          <p>
            Last updated: {consent.timestamp.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};