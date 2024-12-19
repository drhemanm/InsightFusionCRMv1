import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Brain, Sparkles, Bot, LineChart, Users, Shield } from 'lucide-react';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { useAuthStore } from '../../store/authStore';

export const LandingPage: React.FC = () => {
  const { plans } = useSubscriptionStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

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

  const handleSelectPlan = (planId: string) => {
    navigate('/register', { state: { selectedPlan: planId } });
  };

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

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

        {/* Pricing Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Choose Your Plan</h2>
          <p className="text-center text-gray-300 mb-12">Get started with InsightFusion CRM today</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-gray-900">MUR {plan.price}</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-blue-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className="w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sign In Section */}
        <div className="max-w-md mx-auto">
          <div className="bg-black/30 backdrop-blur-xl rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Already Registered?</h2>
            <Link
              to="/login"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Sign in to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};