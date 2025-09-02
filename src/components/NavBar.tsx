import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Home, Plus, LogOut } from 'lucide-react';

interface NavBarProps {
  user: { email: string };
  onLogout: () => void;
}

function NavBar({ user, onLogout }: NavBarProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">AI Study Buddy</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <Link
              to="/create"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive('/create') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create</span>
            </Link>

            <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
              <span className="text-gray-700 hidden sm:inline">{user?.email}</span>
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-200"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;