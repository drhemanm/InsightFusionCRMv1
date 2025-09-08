// src/App.tsx - Minimal Working Version
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignUpPage } from './components/auth/SignUpPage';
import { LoginForm } from './components/auth/LoginForm';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🎉 Success! You're logged in!
              </h1>
              <p className="text-gray-600">Your InsightFusion CRM is working!</p>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default App;
