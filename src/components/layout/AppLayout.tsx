import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, Users, DollarSign, CheckSquare, BarChart2, 
  Settings, MessageSquare, Brain, LogOut, Bell, Search 
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useFeatureFlag } from '../../hooks/useFeatureFlag';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { enabled: hasAI } = useFeatureFlag('ai_insights');

  const navigation = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/' },
    { name: 'Contacts', icon: Users, path: '/contacts' },
    { name: 'Deals', icon: DollarSign, path: '/deals' },
    { name: 'Tasks', icon: CheckSquare, path: '/tasks' },
    { name: 'Reports', icon: BarChart2, path: '/reports' },
    { name: 'Messages', icon: MessageSquare, path: '/messages' },
    ...(hasAI ? [{ name: 'AI Insights', icon: Brain, path: '/ai-insights' }] : []),
    { name: 'Settings', icon: Settings, path: '/settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-30">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                InsightFusion
              </span>
            </Link>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="flex flex-col items-end">
                <span className="font-medium text-sm">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
              <button
                onClick={() => logout()}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="fixed inset-y-16 left-0 w-64 bg-white border-r">
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="pt-16 pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};