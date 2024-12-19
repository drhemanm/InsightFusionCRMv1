import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Brain, RefreshCw } from 'lucide-react';

export const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendVerification = async () => {
    try {
      // Implement resend verification logic
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      console.error('Failed to resend verification:', error);
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
                We've sent a verification link to your email address
              </p>
              <p className="text-gray-300">
                Please check your inbox and click the link to complete your registration.
              </p>
            </div>

            <div className="text-sm text-gray-400">
              <p className="mb-4">Didn't receive the email?</p>
              <button 
                onClick={handleResendVerification}
                disabled={!canResend}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={16} />
                {canResend ? 'Resend verification email' : `Wait ${countdown}s`}
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