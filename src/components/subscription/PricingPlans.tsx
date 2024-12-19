import React from 'react';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { Brain, Check, Sparkles } from 'lucide-react';

interface PricingPlansProps {
  onSelectPlan: (plan: any) => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ onSelectPlan }) => {
  const { plans } = useSubscriptionStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Brain className="mx-auto h-16 w-16 text-blue-400" />
        <h2 className="mt-6 text-3xl font-bold text-white">Choose Your Plan</h2>
        <div className="flex items-center justify-center gap-2 text-blue-300 mt-2">
          <Sparkles className="h-5 w-5" />
          <span>Start your journey with InsightFusion CRM</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white/10 backdrop-blur-xl rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <p className="mt-4 flex items-baseline text-white">
                <span className="text-4xl font-bold tracking-tight">MUR {plan.price}</span>
                <span className="ml-1 text-xl font-semibold">/month</span>
              </p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex text-white">
                    <Check className="h-5 w-5 text-blue-400 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSelectPlan(plan)}
                className="mt-8 block w-full bg-blue-600 text-white rounded-lg px-4 py-3 text-center font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};