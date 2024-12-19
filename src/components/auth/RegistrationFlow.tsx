import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { UserRegistration } from './UserRegistration';
import { CompanyRegistration } from './CompanyRegistration';
import { ChevronLeft } from 'lucide-react';

export const RegistrationFlow: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithRedirect } = useAuth0();
  const selectedPlan = location.state?.selectedPlan;

  // If no plan is selected, redirect to landing page
  if (!selectedPlan) {
    navigate('/');
    return null;
  }

  const [step, setStep] = useState<'user' | 'company'>('user');
  const [registrationData, setRegistrationData] = useState({
    plan: selectedPlan,
    user: null,
    company: null
  });

  const handleUserRegistration = async (userData: any) => {
    setRegistrationData(prev => ({ ...prev, user: userData }));
    setStep('company');
  };

  const handleCompanyRegistration = async (companyData: any) => {
    try {
      setRegistrationData(prev => ({ ...prev, company: companyData }));
      
      // Register with Auth0 and trigger verification email
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: "signup",
          login_hint: registrationData.user.email
        },
        appState: {
          returnTo: "/verification-sent"
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleBack = () => {
    if (step === 'user') {
      navigate('/');
    } else {
      setStep('user');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleBack}
        className="fixed top-8 left-8 flex items-center gap-2 px-4 py-2 text-white bg-black/30 backdrop-blur-lg rounded-lg hover:bg-black/40 transition-colors z-50"
      >
        <ChevronLeft size={20} />
        Back
      </button>

      {step === 'user' ? (
        <UserRegistration
          selectedPlan={registrationData.plan}
          onComplete={handleUserRegistration}
        />
      ) : (
        <CompanyRegistration
          userData={registrationData.user}
          selectedPlan={registrationData.plan}
          onComplete={handleCompanyRegistration}
        />
      )}
    </div>
  );
};