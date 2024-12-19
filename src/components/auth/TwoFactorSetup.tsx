import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Shield, Key } from 'lucide-react';

export const TwoFactorSetup: React.FC = () => {
  const { setupTwoFactor, verifyTwoFactor, isLoading, error } = useAuthStore();
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    const initSetup = async () => {
      try {
        const code = await setupTwoFactor();
        setQrCode(code);
      } catch (error) {
        console.error('Failed to setup 2FA:', error);
      }
    };

    initSetup();
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyTwoFactor(verificationCode);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">Two-Factor Authentication Setup</h2>
      </div>

      <div className="space-y-6">
        {qrCode && (
          <div className="text-center">
            <img
              src={qrCode}
              alt="2FA QR Code"
              className="mx-auto mb-4"
            />
            <p className="text-sm text-gray-600">
              Scan this QR code with your authenticator app
            </p>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter 6-digit code"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading || !verificationCode}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify & Enable 2FA'}
          </button>
        </form>
      </div>
    </div>
  );
};