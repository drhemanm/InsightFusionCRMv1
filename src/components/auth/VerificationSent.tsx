import React from 'react';
import { Mail, Brain, RefreshCw } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

export const VerificationSent: React.FC = () => {
  const { user } = useAuth0();

  const handleResendVerification = async () => {
    try {
      // In production, this would call Auth0's Management API to resend verification
      await fetch(`https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/jobs/verification-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user?.sub,
        }),
      });
      
      alert('Verification email has been resent!');
    } catch (error) {
      console.error('Failed to resend verification:', error);
      alert('Failed to resend verification email. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75"></div>
          <div className="relative bg-black bg-opacity-50 backdrop-blur-xl rounded-lg p-8 text-center">
            <Brain className="mx-auto h-12 w-12 text-blue-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Verify Your Email
            </h2>
            
            <div className="bg-blue-500/20 rounded-lg p-6 mb-6">
              <Mail className="mx-auto h-8 w-8 text-blue-400 mb-4" />
              <p className="text-gray-300 mb-4">
                We've sent a verification link to <span className="font-semibold text-blue-300">{user?.email}</span>
              </p>
              <p className="text-gray-300">
                Please check your inbox and click the link to complete your registration.
              </p>
            </div>

            <div className="text-sm text-gray-400">
              <p className="mb-4">Didn't receive the email?</p>
              <button 
                onClick={handleResendVerification}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw size={16} />
                Resend verification email
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-400">
              <p>
                Make sure to check your spam folder if you don't see the email in your inbox.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};