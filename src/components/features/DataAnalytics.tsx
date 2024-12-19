import React from 'react';
import { BarChart2, PieChart, Activity, Brain, LineChart } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const DataAnalytics: React.FC = () => {
  const features = [
    {
      name: "Sales Analytics",
      icon: <BarChart2 className="text-blue-500" size={24} />,
      description: "Comprehensive sales analytics with customizable dashboards and real-time reporting.",
      benefits: [
        "Real-time performance tracking",
        "Custom report builder",
        "Trend analysis"
      ],
      specs: "Includes 50+ pre-built reports and custom report builder"
    },
    {
      name: "AI Insights",
      icon: <Brain className="text-purple-500" size={24} />,
      description: "AI-powered insights for deal predictions and next best actions.",
      benefits: [
        "Win probability prediction",
        "Opportunity scoring",
        "Behavioral analytics"
      ],
      specs: "Uses machine learning for predictive analytics"
    },
    {
      name: "Performance Metrics",
      icon: <Activity className="text-green-500" size={24} />,
      description: "Track KPIs and performance metrics across teams and individuals.",
      benefits: [
        "Team performance tracking",
        "Goal progress monitoring",
        "Productivity analytics"
      ],
      specs: "Customizable KPIs and metrics"
    },
    {
      name: "Revenue Analytics",
      icon: <LineChart className="text-red-500" size={24} />,
      description: "Advanced revenue tracking and forecasting capabilities.",
      benefits: [
        "Revenue forecasting",
        "Pipeline analysis",
        "Historical trends"
      ],
      specs: "Multiple forecasting models available"
    },
    {
      name: "Customer Analytics",
      icon: <PieChart className="text-orange-500" size={24} />,
      description: "Deep insights into customer behavior and engagement patterns.",
      benefits: [
        "Customer segmentation",
        "Engagement scoring",
        "Churn prediction"
      ],
      specs: "Includes customer health scoring"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">Data & Analytics</h2>
        <p className="text-gray-600">Turn your sales data into actionable insights</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.name} {...feature} />
        ))}
      </div>
    </div>
  );
};