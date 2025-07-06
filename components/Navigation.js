'use client';

import { useState } from 'react';
import { Home, CreditCard, BarChart3, Menu, X, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation({ currentTab, onTabChange, onBackToLanding }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview & insights' },
    { id: 'transactions', label: 'Transactions', icon: CreditCard, description: 'Manage expenses' },
    { id: 'charts', label: 'Analytics', icon: BarChart3, description: 'Visual reports' },
  ];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
  };

  const handleKeyDown = (event, tabId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(tabId);
    }
  };

  return (
    <>
      {/* Backdrop blur overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <nav className="bg-gradient-to-br from-slate-50  to-indigo-50 backdrop-blur-xl sticky top-0 z-50 p-2 " role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand - Clickable */}
            <button 
              onClick={onBackToLanding}
              className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl p-2 -m-2"
              aria-label="Back to Landing Page"
            >
              <div className="flex items-center justify-center w-11 h-11 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" aria-hidden="true">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="">
                <h1 className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 ">
                  FinanceFlow
                </h1>
                <p className="text-xs text-gray-500 font-medium -mt-0.5">Personal Finance Manager</p>
              </div>
            </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, tab.id)}
                  className={`
                    relative flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-md shadow-blue-200/50 border border-blue-200/50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 hover:shadow-sm'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`${tab.label} - ${tab.description}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : ''}`} />
                  <span className="font-semibold">{tab.label}</span>
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative focus:ring-2 focus:ring-blue-500 h-10 w-10 rounded-lg hover:bg-gray-100/80 transition-all duration-200"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <div className={`transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}>
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" />
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 animate-slideIn shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-md shadow-blue-200/50 border border-blue-200/50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{tab.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{tab.description}</div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
