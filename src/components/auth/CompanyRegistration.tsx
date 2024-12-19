import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building2, Users, Briefcase, Globe, Brain, Sparkles, CircuitBoard } from 'lucide-react';
import { useSubscriptionStore } from '../../store/subscriptionStore';

export const CompanyRegistration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plans } = useSubscriptionStore();
  const selectedPlanId = location.state?.selectedPlan || 'basic';
  const selectedPlan = plans.find(p => p.id === selectedPlanId);

  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    size: '',
    website: '',
    numUsers: 1
  });

  const [currentStep, setCurrentStep] = useState(0);

  const calculateTotalPrice = () => {
    if (!selectedPlan) return 0;
    return selectedPlan.price * formData.numUsers;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would make an API call to create the company
    // and initiate the subscription
    
    // Send verification email
    // For demo, we'll just navigate to a success page
    navigate('/verification-sent');
  };

  const steps = [
    {
      title: 'Company Details',
      icon: Building2,
      fields: ['companyName', 'website']
    },
    {
      title: 'Industry Information',
      icon: Briefcase,
      fields: ['industry', 'size', 'numUsers']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75"></div>
          <div className="relative bg-black bg-opacity-50 backdrop-blur-xl rounded-lg p-8">
            <div className="flex justify-center mb-4">
              <Brain className="h-12 w-12 text-blue-400" />
            </div>
            
            <h1 className="text-center text-3xl font-bold text-white mb-2">
              Complete Your Registration
            </h1>
            <div className="flex items-center justify-center gap-2 text-blue-300 mb-4">
              <Sparkles className="h-5 w-5" />
              <span>Selected Plan: {selectedPlan?.name}</span>
            </div>

            <div className="mb-8 flex justify-center">
              <div className="flex items-center">
                {steps.map((step, index) => (
                  <React.Fragment key={index}>
                    <div className={`flex items-center ${
                      index <= currentStep ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      <div className={`rounded-full transition-all p-2 ${
                        index === currentStep ? 'bg-blue-500/20 animate-pulse' : ''
                      }`}>
                        <step.icon className="h-6 w-6" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-1 mx-2 rounded ${
                          index < currentStep ? 'bg-blue-400' : 'bg-gray-600'
                        }`} />
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 0 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Company Name
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Website
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        required
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Industry
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        required
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Industry</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="services">Professional Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Company Size
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        required
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501+">501+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Number of Users
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        min="1"
                        max={selectedPlan?.limits.users || 999999}
                        required
                        value={formData.numUsers}
                        onChange={(e) => setFormData({ ...formData, numUsers: parseInt(e.target.value) })}
                        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Total Price: MUR {calculateTotalPrice()} /month
                    </p>
                  </div>
                </>
              )}

              <div className="flex justify-between">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none"
                  >
                    Back
                  </button>
                )}
                
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="w-32 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-32 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Complete
                  </button>
                )}
              </div>
            </form>

            <div className="mt-8 flex justify-center">
              <CircuitBoard className="text-blue-400/50 h-24 w-24 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};