// src/App.tsx - Minimal Auth Test
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore, initializeAuth } from './store/authStore';
import { SignUpPage } from './components/auth/SignUpPage';

const App: React.FC = () => {
  const { user, isLoading, isInitialized } = useAuthStore();

  // Initialize Supabase auth when app starts
  useEffect(() => {
    initializeAuth();
  }, []);

  console.log('App render - isInitialized:', isInitialized, 'isLoading:', isLoading, 'user:', user);

  // Show loading spinner while initializing auth
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="mt-4 text-white">Initializing InsightFusion...</p>
        </div>
      </div>
    );
  }

  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <h1>Auth Test Page</h1>
        <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
        <p>User: {user?.email || 'None'}</p>
      </div>
      
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
