import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FunnelStep {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

interface ConversionFunnelProps {
  steps: FunnelStep[];
  title: string;
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = ({
  steps,
  title
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">{title}</h2>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{step.label}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {step.value.toLocaleString()}
                </span>
                <span className={`text-sm font-medium ${
                  step.percentage >= 50 ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {step.percentage}%
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${step.percentage}%`,
                    backgroundColor: step.color
                  }}
                />
              </div>

              {index < steps.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <ChevronDown className="text-gray-400" size={20} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {steps[0].value}
            </div>
            <div className="text-sm text-gray-600">Total Leads</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {steps[steps.length - 1].value}
            </div>
            <div className="text-sm text-gray-600">Conversions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {((steps[steps.length - 1].value / steps[0].value) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};