import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Brain, Bell, Search, Settings, LogOut, Users, Wallet, 
  CheckSquare, BarChart2, MessageSquare, Zap, Star, Building2, FileText 
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', icon: BarChart2, path: '/dashboard' },
    { name: 'Contacts', icon: Users, path: '/contacts' },
    { name: 'Deals', icon: Wallet, path: '/deals' },
    { name: 'Tasks', icon: CheckSquare, path: '/tasks' },
    { name: 'Messages', icon: MessageSquare, path: '/messages' },
    { name: 'Organization', icon: Building2, path: '/organization' },
    { name: 'Documentation', icon: FileText, path: '/docs' },
    { name: 'Features', icon: Star, path: '/features' },
    { name: 'Automation', icon: Zap, path: '/automation' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-30">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              InsightFusion
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};