import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, Bot, LineChart, Users, Shield } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Insights',
      description: 'Get intelligent recommendations and predictions for your sales pipeline'
    },
    {
      icon: LineChart,
      title: 'Advanced Analytics',
      description: 'Deep insights into your sales performance and team metrics'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team members and track progress'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security to protect your sensitive business data'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Brain className="h-16 w-16 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            InsightFusion CRM
          </h1>
          <div className="flex items-center justify-center gap-2 text-blue-300 mb-8">
            <Sparkles className="h-6 w-6" />
            <span className="text-xl">AI-Powered Customer Relationship Management</span>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Transform your sales process with intelligent insights, automated workflows, and powerful collaboration tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-6 transform hover:scale-105 transition-all">
                <Icon className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
            >
              Sign In
            </Link>
          </div>
          <p className="text-gray-400 text-sm">
            No credit card required • Free 14-day trial
          </p>
        </div>
      </div>
    </div>
  );
};