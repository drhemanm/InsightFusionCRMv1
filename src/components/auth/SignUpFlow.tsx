import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Mail, Building2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface SignUpData {
  step: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  jobTitle: string;
  teamSize: string;
  goals: string[];
}

export const SignUpFlow: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState<SignUpData>({
    step: 1,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    companyName: '',
    jobTitle: '',
    teamSize: '',
    goals: []
  });

  const handleNext = () => {
    setFormData(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const handleBack = () => {
    setFormData(prev => ({ ...prev, step: prev.step - 1 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) {
      navigate('/verify-email');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75"></div>
          <div className="relative bg-black bg-opacity-50 backdrop-blur-xl rounded-lg p-8">
            <div className="flex justify-center mb-4">
              <Brain className="h-12 w-12 text-blue-400" />
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">
                  {formData.step === 1 && "Create Your Account"}
                  {formData.step === 2 && "Verify Your Email"}
                  {formData.step === 3 && "Complete Your Profile"}
                  {formData.step === 4 && "Customize Your CRM"}
                </h2>
                <span className="text-blue-400">Step {formData.step}/4</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(formData.step / 4) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {formData.step === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Email Address
                    </label>
                    <div className="mt-1 relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 block w-full rounded-lg border-gray-600 bg-black/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-600 bg-black/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                </>
              )}

              {formData.step === 2 && (
                <div className="text-center">
                  <Mail className="mx-auto h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Check your email</h3>
                  <p className="text-gray-400 mb-4">
                    We've sent a verification link to {formData.email}
                  </p>
                  <button
                    type="button"
                    onClick={() => {/* Resend verification */}}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Didn't receive the email? Click to resend
                  </button>
                </div>
              )}

              {formData.step === 3 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="mt-1 block w-full rounded-lg border-gray-600 bg-black/30 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="mt-1 block w-full rounded-lg border-gray-600 bg-black/30 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Company Name
                    </label>
                    <div className="mt-1 relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="pl-10 block w-full rounded-lg border-gray-600 bg-black/30 text-white"
                      />
                    </div>
                  </div>
                </>
              )}

              {formData.step === 4 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Team Size
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="mt-1 block w-full rounded-lg border-gray-600 bg-black/30 text-white"
                    >
                      <option value="">Select team size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201+">201+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      What are your main goals with InsightFusion CRM?
                    </label>
                    <div className="space-y-2">
                      {[
                        'Lead Management',
                        'Sales Pipeline',
                        'Team Collaboration',
                        'Customer Support',
                        'Analytics & Reporting'
                      ].map((goal) => (
                        <label key={goal} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.goals.includes(goal)}
                            onChange={(e) => {
                              const goals = e.target.checked
                                ? [...formData.goals, goal]
                                : formData.goals.filter(g => g !== goal);
                              setFormData({ ...formData, goals });
                            }}
                            className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-300">{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between">
                {formData.step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-300 hover:text-white"
                  >
                    <ChevronLeft size={20} />
                    Back
                  </button>
                )}
                
                {formData.step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Complete Setup'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};