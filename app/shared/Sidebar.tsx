import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { 
  Home, Users, Shield, CreditCard, BarChart3, Wallet, UserCheck,
  Settings, Bell, HelpCircle, LogOut, ChevronLeft, ChevronRight,
  Menu, X
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get active nav from current location
  const getActiveNav = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'dashboard';
    if (path.startsWith('/user-management')) return 'users';
    if (path.startsWith('/policy-requests')) return 'policies';
    if (path.startsWith('/transactions')) return 'transactions';
    if (path.startsWith('/analytics')) return 'analytics';
    if (path.startsWith('/earnings')) return 'earnings';
    if (path.startsWith('/approvals')) return 'approvals';
    if (path.startsWith('/settings')) return 'settings';
    if (path.startsWith('/help')) return 'help';
    return 'dashboard';
  };

  const activeNav = getActiveNav();

  // Navigation items with their corresponding routes
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'users', label: 'Users', icon: Users, badge: '12.5K', path: '/user-management' },
    { id: 'policies', label: 'Policies', icon: Shield, badge: '234', path: '/policy-requests' },
    { id: 'transactions', label: 'Transactions', icon: CreditCard, path: '/transactions' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { id: 'earnings', label: 'Earnings', icon: Wallet, path: '/earnings' },
    { id: 'approvals', label: 'Approvals', icon: UserCheck, badge: '15', path: '/approvals' },
  ];

  const bottomNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, path: '/help' },
    { id: 'logout', label: 'Logout', icon: LogOut, action: 'logout' },
  ];

  const handleNavClick = (item:any) => {
    setMobileMenuOpen(false); // Close mobile menu when item is clicked
    
    if (item.action === 'logout') {
      // Handle logout logic
      console.log('Logging out...');
      // You can add your logout logic here:
      // - Clear authentication tokens
      // - Clear user data from state/localStorage
      // - Redirect to login page
      // navigate('/login');
      return;
    }
    
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-xl border-r border-gray-200 transition-all duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-40 lg:z-auto h-screen flex flex-col`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">InsureHub</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors hidden lg:block"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                activeNav === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:scale-105'
              }`}
            >
              <item.icon className={`w-5 h-5 ${sidebarCollapsed ? 'mx-auto' : ''} transition-transform group-hover:scale-110`} />
              {!sidebarCollapsed && (
                <>
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                      activeNav === item.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {sidebarCollapsed && item.badge && (
                <div className="absolute right-2 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Notifications Section */}
        <div className="px-4 py-2 border-t border-gray-100">
          <div className={`flex items-center space-x-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1">
                <span className="text-sm font-medium block">Notifications</span>
                <span className="text-xs text-gray-500">3 new alerts</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                item.id === 'logout' 
                  ? 'text-red-600 hover:bg-red-50 hover:text-red-700' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              } hover:scale-105`}
            >
              <item.icon className={`w-5 h-5 ${sidebarCollapsed ? 'mx-auto' : ''} transition-transform group-hover:scale-110`} />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </div>

        {/* User Profile */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200 bg-gray-50 mt-auto">
            <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">Administrator</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;