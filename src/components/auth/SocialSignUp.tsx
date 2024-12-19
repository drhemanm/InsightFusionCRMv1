import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const SocialSignUp: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleGoogleSignUp = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
        connection: 'google-oauth2'
      }
    });
  };

  const handleFacebookSignUp = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
        connection: 'facebook'
      }
    });
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleSignUp}
        className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>

      <button
        onClick={handleFacebookSignUp}
        className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#1666d4] transition-colors"
      >
        <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
        Continue with Facebook
      </button>
    </div>
  );
};