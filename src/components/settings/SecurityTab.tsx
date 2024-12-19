import React, { useState } from 'react';
import { Shield, Key, Lock, Smartphone } from 'lucide-react';

export const SecurityTab: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordExpiry, setPasswordExpiry] = useState(90);
  const [sessionTimeout, setSessionTimeout] = useState(30);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Security Settings</h2>

      <div className="space-y-4">
        {/* Two-Factor Authentication */}
        <div className="p-4 bg-white border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-500" size={24} />
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Password Settings */}
        <div className="p-4 bg-white border rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Key className="text-blue-500" size={24} />
            <div>
              <h3 className="font-medium">Password Settings</h3>
              <p className="text-sm text-gray-600">Manage your password security</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password Expiry (days)
              </label>
              <input
                type="number"
                value={passwordExpiry}
                onChange={(e) => setPasswordExpiry(parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Change Password
            </button>
          </div>
        </div>

        {/* Session Settings */}
        <div className="p-4 bg-white border rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-blue-500" size={24} />
            <div>
              <h3 className="font-medium">Session Settings</h3>
              <p className="text-sm text-gray-600">Manage your session security</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};