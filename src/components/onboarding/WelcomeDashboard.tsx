import React, { useState } from 'react';
import { Brain, CheckCircle2, Import, Users, Settings } from 'lucide-react';
import { OnboardingTour } from '../onboarding/OnboardingTour';

export const WelcomeDashboard: React.FC = () => {
  const [showTour, setShowTour] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const setupSteps = [
    {
      id: 'import',
      title: 'Import Your Data',
      description: 'Get started by importing your existing contacts and deals',
      icon: Import,
      action: 'Import Now'
    },
    {
      id: 'team',
      title: 'Invite Your Team',
      description: 'Collaborate with your team members',
      icon: Users,
      action: 'Add Team Members'
    },
    {
      id: 'customize',
      title: 'Customize Your CRM',
      description: 'Configure settings to match your workflow',
      icon: Settings,
      action: 'Customize'
    }
  ];

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps([...completedSteps, stepId]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Brain className="mx-auto h-16 w-16 text-blue-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Welcome to InsightFusion CRM!</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Let's get you set up for success. Complete these quick steps to get the most out of your CRM.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {setupSteps.map((step) => {
          const Icon = step.icon;
          const isCompleted = completedSteps.includes(step.id);

          return (
            <div
              key={step.id}
              className={`relative p-6 rounded-lg border-2 transition-all ${
                isCompleted
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-blue-500'
              }`}
            >
              {isCompleted && (
                <CheckCircle2 className="absolute top-4 right-4 text-green-500" size={20} />
              )}
              <Icon className={`h-8 w-8 ${isCompleted ? 'text-green-500' : 'text-blue-500'} mb-4`} />
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{step.description}</p>
              <button
                onClick={() => handleStepComplete(step.id)}
                disabled={isCompleted}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isCompleted
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isCompleted ? 'Completed' : step.action}
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Need Help Getting Started?</h2>
        <p className="mb-6">
          Our team is here to help you get the most out of InsightFusion CRM.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowTour(true)}
            className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50"
          >
            Take a Tour
          </button>
          <button className="px-6 py-2 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800">
            Schedule Demo
          </button>
        </div>
      </div>

      {showTour && <OnboardingTour onClose={() => setShowTour(false)} />}
    </div>
  );
};