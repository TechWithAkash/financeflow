'use client';

import { useState } from 'react';
import { Plus, CreditCard, Target, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TransactionForm from './TransactionForm';
import BudgetForm from './BudgetForm';
import toast from 'react-hot-toast';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  const handleTransactionSuccess = () => {
    setShowTransactionForm(false);
    setIsOpen(false);
    // toast.success('Transaction added successfully!');
    // Use a more gentle refresh approach
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleBudgetSuccess = () => {
    setShowBudgetForm(false);
    setIsOpen(false);
    // toast.success('Budget created successfully!');
    // Use a more gentle refresh approach
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleOpenTransactionForm = () => {
    console.log('Opening transaction form');
    setShowTransactionForm(true);
    setIsOpen(false);
  };

  const handleOpenBudgetForm = () => {
    console.log('Opening budget form');
    setShowBudgetForm(true);
    setIsOpen(false);
  };

  const toggleFAB = () => {
    console.log('Toggling FAB, current state:', isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {/* Action buttons */}
        <div className={`flex flex-col space-y-3 transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          <div className="relative group">
            <button
              onClick={handleOpenTransactionForm}
              className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white  border-white"
              type="button"
            >
              <CreditCard className="h-5 w-5" />
            </button>
            {/* Tooltip */}
            <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Add Transaction
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-y-4 border-y-transparent"></div>
            </div>
          </div>
          
          <div className="relative group">
            <button
              onClick={handleOpenBudgetForm}
              className="h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white  border-white"
              type="button"
            >
              <Target className="h-5 w-5" />
            </button>
            {/* Tooltip */}
            <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Set Budget
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-y-4 border-y-transparent"></div>
            </div>
          </div>
        </div>

        {/* Main FAB */}
        <div className="relative group">
          <button
            onClick={toggleFAB}
            className="h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white border-white"
            type="button"
          >
            <div className={`transition-all duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
              <Plus className="h-6 w-6" />
            </div>
          </button>
          
          {/* Main tooltip */}
          {!isOpen && (
            <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Quick Actions
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-0 h-0 border-l-4 border-l-gray-900 border-y-4 border-y-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className=""
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Forms */}
      <TransactionForm
        isOpen={showTransactionForm}
        onClose={() => setShowTransactionForm(false)}
        onSuccess={handleTransactionSuccess}
      />
      <BudgetForm
        isOpen={showBudgetForm}
        onClose={() => setShowBudgetForm(false)}
        onSuccess={handleBudgetSuccess}
      />

      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
