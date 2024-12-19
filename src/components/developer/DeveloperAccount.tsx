import React from 'react';
import { Shield, Key, Terminal } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { defaultPermissions } from '../../types/permissions';

export const DeveloperAccount: React.FC = () => {
  const { user } = useAuthStore();
  const [credentials, setCredentials] = React.useState<{
    apiKey: string;
    secretKey: string;
  }>({
    apiKey: 'dev_' + crypto.randomUUID(),
    secretKey: 'secret_' + crypto.randomUUID()
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-purple-500" />
          <div>
            <h1 className="text-2xl font-bold">Developer Account</h1>
            <p className="text-gray-600">Access credentials and permissions</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* API Credentials */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-medium mb-4">API Credentials</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">API Key</label>
                <div className="mt-1 flex">
                  <input
                    type="text"
                    readOnly
                    value={credentials.apiKey}
                    className="flex-1 px-3 py-2 bg-gray-100 rounded-l-lg"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(credentials.apiKey)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Secret Key</label>
                <div className="mt-1 flex">
                  <input
                    type="password"
                    readOnly
                    value={credentials.secretKey}
                    className="flex-1 px-3 py-2 bg-gray-100 rounded-l-lg"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(credentials.secretKey)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Developer Permissions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-medium mb-4">Developer Permissions</h2>
            <div className="grid grid-cols-2 gap-4">
              {defaultPermissions.developer.map((permission) => (
                <div
                  key={permission}
                  className="flex items-center gap-2 p-2 bg-white rounded border"
                >
                  <Key size={16} className="text-green-500" />
                  <span className="text-sm">{permission}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-medium mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/developer/docs"
                className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50"
              >
                <Terminal size={20} className="text-blue-500" />
                <div>
                  <div className="font-medium">API Documentation</div>
                  <div className="text-sm text-gray-500">View API endpoints and guides</div>
                </div>
              </a>

              <a
                href="/developer/console"
                className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50"
              >
                <Terminal size={20} className="text-purple-500" />
                <div>
                  <div className="font-medium">Developer Console</div>
                  <div className="text-sm text-gray-500">Test API endpoints</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};