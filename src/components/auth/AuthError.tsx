import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AuthErrorProps {
  error: Error | null;
}

export const AuthError: React.FC<AuthErrorProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mt-4 p-4 bg-red-500/20 rounded-lg">
      <div className="flex items-center gap-2 text-red-300">
        <AlertCircle size={20} />
        <div>
          <p className="font-medium">Authentication Error</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    </div>
  );
};