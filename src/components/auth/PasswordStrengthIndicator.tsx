import React from 'react';

interface Props {
  password: string;
}

export const PasswordStrengthIndicator: React.FC<Props> = ({ password }) => {
  const getStrength = (): { score: number; label: string; color: string } => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        return { score, label: 'Weak', color: 'bg-red-500' };
      case 2:
      case 3:
        return { score, label: 'Medium', color: 'bg-yellow-500' };
      case 4:
      case 5:
        return { score, label: 'Strong', color: 'bg-green-500' };
      default:
        return { score: 0, label: 'Weak', color: 'bg-red-500' };
    }
  };

  const strength = getStrength();
  const width = (strength.score / 5) * 100;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-400">Password strength:</span>
        <span className={`text-xs ${
          strength.color === 'bg-red-500' ? 'text-red-400' :
          strength.color === 'bg-yellow-500' ? 'text-yellow-400' :
          'text-green-400'
        }`}>
          {strength.label}
        </span>
      </div>
      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${strength.color} transition-all duration-300`}
          style={{ width: `${width}%` }}
        />
      </div>
      <ul className="mt-2 text-xs text-gray-400 space-y-1">
        <li className={password.length >= 8 ? 'text-green-400' : ''}>
          • At least 8 characters
        </li>
        <li className={/[A-Z]/.test(password) ? 'text-green-400' : ''}>
          • At least one uppercase letter
        </li>
        <li className={/[a-z]/.test(password) ? 'text-green-400' : ''}>
          • At least one lowercase letter
        </li>
        <li className={/[0-9]/.test(password) ? 'text-green-400' : ''}>
          • At least one number
        </li>
        <li className={/[^A-Za-z0-9]/.test(password) ? 'text-green-400' : ''}>
          • At least one special character
        </li>
      </ul>
    </div>
  );
};