// src/App.tsx - Simple Fixed Version
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { LoginForm } from './components/auth/LoginForm';
import { SignUpPage } from './components/auth/SignUpPage';
import { Settings } from './components/settings/Settings';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { ContactList } from './components/contacts/ContactList';
import { DealPipeline } from './components/deals/DealPipeline';
import { TaskDashboard } from './components/tasks/TaskDashboard';
import { InboxView } from './components/communication/InboxView';
import { FeaturesOverview } from './components/features/FeaturesOverview';
import { AutomationSuggestions } from './components/workflow/AutomationSuggestions';
import { OrganizationDashboard } from './components/organization/OrganizationDashboard';
import { Documentation } from './components/docs/Documentation';

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [appReady, setAppReady] = useState(false);

  // Simple initialization without auth calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
