import React from 'react';
import { Zap, Link, Workflow, Bot, RefreshCw } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const AutomationIntegration: React.FC = () => {
  const features = [
    {
      name: "Workflow Automation",
      icon: <Workflow className="text-blue-500" size={24} />,
      description: "Create custom workflows to automate repetitive sales tasks and processes.",
      benefits: [
        "Time-saving automation",
        "Consistent processes",
        "Error reduction"
      ],
      specs: "Visual workflow builder with 100+ actions"
    },
    {
      name: "AI Assistant",
      icon: <Bot className="text-purple-500" size={24} />,
      description: "AI-powered assistant for task automation and smart recommendations.",
      benefits: [
        "Smart task prioritization",
        "Automated data entry",
        "Intelligent reminders"
      ],
      specs: "Uses natural language processing"
    },
    {
      name: "Third-party Integrations",
      icon: <Link className="text-green-500" size={24} />,
      description: "Connect with popular business tools and services.",
      benefits: [
        "Seamless data sync",
        "Extended functionality",
        "Workflow optimization"
      ],
      specs: "200+ pre-built integrations"
    },
    {
      name: "Data Sync",
      icon: <RefreshCw className="text-indigo-500" size={24} />,
      description: "Bi-directional data synchronization across all integrated platforms.",
      benefits: [
        "Real-time data sync",
        "Data consistency",
        "Automated updates"
      ],
      specs: "Real-time and scheduled sync options"
    },
    {
      name: "Smart Rules",
      icon: <Zap className="text-yellow-500" size={24} />,
      description: "Create intelligent automation rules based on triggers and conditions.",
      benefits: [
        "Automated lead routing",
        "Task assignment",
        "Notification rules"
      ],
      specs: "Supports complex conditional logic"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">Automation & Integration</h2>
        <p className="text-gray-600">Streamline your workflow with powerful automation tools</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.name} {...feature} />
        ))}
      </div>
    </div>
  );
};