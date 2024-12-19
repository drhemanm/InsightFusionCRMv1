import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutGrid,
  Users,
  DollarSign,
  CheckSquare,
  BarChart2,
  Building2,
  Shield,
  LogOut,
  Settings
} from 'lucide-react';
import { useTenant } from '../../context/TenantContext';
import { useAuthStore } from '../../store/authStore';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { logout } = useAuthStore();
  const { tenant, user } = useTenant();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col py-4">
            {/* Logo and Company Name */}
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">InsightFusion CRM</h1>
              <p className="text-sm text-gray-500">Designed by Dr Heman Mohabeer</p>
            </div>

            {/* Navigation */}
            <nav className="flex items-center justify-center space-x-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/contacts"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Contacts
              </Link>
              <Link
                to="/deals"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Deals
              </Link>
              <Link
                to="/tasks"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Tasks
              </Link>
              <Link
                to="/reports"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Reports
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Admin
                </Link>
              )}
              <Link
                to="/organization"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Organization
              </Link>
              <Link
                to="/settings"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Settings
              </Link>
            </nav>

            {/* User Info */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-500">{tenant?.name}</p>
              </div>
              <button
                onClick={() => logout()}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};