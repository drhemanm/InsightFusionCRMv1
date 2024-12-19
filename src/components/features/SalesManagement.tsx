import React from 'react';
import { DollarSign, Target, FileText, Briefcase, TrendingUp } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const SalesManagement: React.FC = () => {
  const features = [
    {
      name: "Deal Pipeline",
      icon: <TrendingUp className="text-blue-500" size={24} />,
      description: "Visual deal tracking with customizable stages and probability scoring.",
      benefits: [
        "Clear sales pipeline visibility",
        "Accurate forecasting",
        "Stage-based analytics"
      ],
      specs: "Supports custom pipeline stages and multiple pipelines"
    },
    {
      name: "Quote Management",
      icon: <DollarSign className="text-green-500" size={24} />,
      description: "Create and manage professional quotes with electronic signatures via DocuSign.",
      benefits: [
        "Professional quote templates",
        "Electronic signatures",
        "Quote tracking and analytics"
      ],
      specs: "Integrates with DocuSign and PandaDoc"
    },
    {
      name: "Territory Management",
      icon: <Target className="text-purple-500" size={24} />,
      description: "Define and manage sales territories with automated lead assignment.",
      benefits: [
        "Balanced lead distribution",
        "Geographic targeting",
        "Performance tracking by region"
      ],
      specs: "Includes mapping and geo-fencing capabilities"
    },
    {
      name: "Contract Management",
      icon: <FileText className="text-indigo-500" size={24} />,
      description: "End-to-end contract lifecycle management with version control.",
      benefits: [
        "Contract templates",
        "Version tracking",
        "Approval workflows"
      ],
      specs: "Supports major document formats and e-signatures"
    },
    {
      name: "Account Planning",
      icon: <Briefcase className="text-orange-500" size={24} />,
      description: "Strategic account planning tools for key accounts and opportunities.",
      benefits: [
        "Strategic planning templates",
        "Relationship mapping",
        "Growth opportunity tracking"
      ],
      specs: "Includes org charts and buying center mapping"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">Sales Management</h2>
        <p className="text-gray-600">Comprehensive tools for managing your entire sales process</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.name} {...feature} />
        ))}
      </div>
    </div>
  );
};