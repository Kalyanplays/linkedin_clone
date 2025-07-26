import React, { useState } from 'react';
import { Search, MessageCircle, Bell, Users, Home, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'network', label: 'My Network', icon: Users },
    { id: 'messaging', label: 'Messaging', icon: MessageCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Search */}
          <div className="flex items-center space-x-4 flex-1 max-w-lg">
            <div className="text-2xl font-bold text-blue-600">
              <span className="bg-blue-600 text-white px-2 py-1 rounded">in</span>
            </div>
            
            <div className="hidden md:flex relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex flex-col items-center space-y-1 p-2 text-xs font-medium transition-colors ${
                    activeTab === item.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden lg:block">{item.label}</span>
                </button>
              );
            })}
            
            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-1 p-2 text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                <img
                  src={user?.profileImage}
                  alt={`${user?.firstName} ${user?.lastName}`}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="hidden lg:block">Me</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.profileImage}
                        alt={`${user?.firstName} ${user?.lastName}`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-gray-600 truncate">{user?.headline}</p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      onTabChange('profile');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
              
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setShowMobileMenu(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 text-left transition-colors ${
                      activeTab === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <button
                onClick={() => {
                  onTabChange('profile');
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center space-x-3 p-3 text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
              
              <button
                onClick={() => {
                  logout();
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center space-x-3 p-3 text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};