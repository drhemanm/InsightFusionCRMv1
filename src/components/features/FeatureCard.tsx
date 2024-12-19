import React from 'react';

interface FeatureCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  benefits: string[];
  specs?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  name,
  icon,
  description,
  benefits,
  specs
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-700">Key Benefits:</h4>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      
      {specs && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Specifications:</span> {specs}
          </p>
        </div>
      )}
    </div>
  );
};