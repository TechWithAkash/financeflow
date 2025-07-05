'use client';

import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  Target, 
  Plus,
  TrendingDown,
  Calendar,
  PieChart,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BudgetForm from './BudgetForm';

export default function Dashboard() {
  const [insights, setInsights] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  const fetchData = async () => {
    try {
      const [insightsRes, budgetsRes] = await Promise.all([
        fetch('/api/insights'),
        fetch('/api/budgets'),
      ]);

      if (insightsRes.ok && budgetsRes.ok) {
        const insightsData = await insightsRes.json();
        const budgetsData = await budgetsRes.json();
        
        setInsights(insightsData);
        setBudgets(budgetsData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBudgetSuccess = () => {
    fetchData();
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatAmountDetailed = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-64 animate-pulse" />
            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md w-48 animate-pulse" />
          </div>
          <div className="h-11 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24" />
                    <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20" />
                  </div>
                  <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg" />
                </div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="animate-pulse shadow-lg">
          <CardContent className="p-6">
            <div className="h-80 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const overBudgetCategories = insights?.budgetOverages?.filter(item => item.isOverBudget) || [];
  const budgetUtilization = insights?.totalBudget > 0 ? (insights?.totalSpending / insights?.totalBudget) * 100 : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Financial Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Your complete financial overview at a glance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl  shadow-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
          </div>
          <Button 
            onClick={() => setShowBudgetForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Set Budget
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Spending */}
        <Card className="relative overflow-hidden  shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Total Spending</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors duration-200">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{formatAmount(insights?.totalSpending || 0)}</div>
            <p className="text-xs text-blue-700 mt-1">This month</p>
          </CardContent>
        </Card>

        {/* Total Budget */}
        <Card className="relative overflow-hidden  shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Total Budget</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors duration-200">
              <Target className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{formatAmount(insights?.totalBudget || 0)}</div>
            <p className="text-xs text-green-700 mt-1">This month</p>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card className="relative overflow-hidden  shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Transactions</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg group-hover:bg-purple-600 transition-colors duration-200">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{insights?.transactionCount || 0}</div>
            <p className="text-xs text-purple-700 mt-1">This month</p>
          </CardContent>
        </Card>

        {/* Budget Status */}
        <Card className={`relative overflow-hidden  shadow-lg hover:shadow-xl transition-all duration-300 group ${
          overBudgetCategories.length > 0 
            ? 'bg-gradient-to-br from-red-50 to-red-100' 
            : 'bg-gradient-to-br from-orange-50 to-orange-100'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${
              overBudgetCategories.length > 0 ? 'text-red-900' : 'text-orange-900'
            }`}>
              Budget Status
            </CardTitle>
            <div className={`p-2 rounded-lg transition-colors duration-200 ${
              overBudgetCategories.length > 0 ? 'bg-red-500 group-hover:bg-red-600' : 'bg-orange-500 group-hover:bg-orange-600'
            }`}>
              {overBudgetCategories.length > 0 ? (
                <AlertTriangle className="h-4 w-4 text-white" />
              ) : (
                <TrendingUp className="h-4 w-4 text-white" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              overBudgetCategories.length > 0 ? 'text-red-900' : 'text-orange-900'
            }`}>
              {Math.round(budgetUtilization)}%
            </div>
            <p className={`text-xs mt-1 ${
              overBudgetCategories.length > 0 ? 'text-red-700' : 'text-orange-700'
            }`}>
              {overBudgetCategories.length > 0 ? 'Over budget' : 'Budget used'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Overview */}
      <Card className=" shadow-lg bg-gradient-to-r from-white to-gray-50/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Budget Overview
              </CardTitle>
              <p className="text-gray-600">Track your spending against your monthly budgets</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full  shadow-sm">
                <PieChart className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {insights?.budgetOverages?.length || 0} categories
                </span>
              </div>
              <Button 
                
                onClick={() => setShowBudgetForm(true)}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Budget
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          {!insights?.budgetOverages?.length ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6 shadow-lg">
                <Target className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No budgets set yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Create your first budget to start tracking your spending and achieving your financial goals.
              </p>
              <Button 
                onClick={() => setShowBudgetForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-2.5"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Budget
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {insights?.budgetOverages?.map((item, index) => (
                <div
                  key={index}
                  className="group relative p-5 rounded-2xl bg-white/80  shadow-lg hover:shadow-md transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full shadow-sm ${
                            item.isOverBudget
                              ? 'bg-red-500'
                              : 'bg-green-500'
                          }`}
                        />
                        <h3 className="text-lg font-semibold text-gray-800">{item.category}</h3>
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatAmountDetailed(item.spent)} 
                        <span className="mx-1 text-gray-400">/</span>
                        {formatAmountDetailed(item.budgeted)}
                      </div>
                    </div>

                    {item.isOverBudget && (
                      <div className="ml-3 p-2 bg-red-100 rounded-lg border border-red-200">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                    )}
                  </div>

                  {/* Remaining */}
                  <div
                    className={`text-sm font-medium w-fit px-2 py-1 rounded-full border ${
                      item.isOverBudget
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-green-50 text-green-700 border-green-200'
                    }`}
                  >
                    {item.isOverBudget ? 'Over by' : 'Remaining'}: {formatAmountDetailed(Math.abs(item.remaining))}
                  </div>

                  {/* Progress */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm font-medium text-gray-500">
                      <span>Progress</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${
                          item.isOverBudget
                            ? 'bg-red-100 text-red-600 border-red-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      >
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="relative w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          item.isOverBudget
                            ? 'bg-red-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(item.percentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>$0</span>
                      <span>{formatAmount(item.budgeted)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Budget Alerts */}
      {overBudgetCategories.length > 0 && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50/70 to-pink-50/70 backdrop-blur-sm border-red-200/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-red-800 flex items-center gap-3">
              <div className="p-2.5 bg-red-500 rounded-xl shadow-lg">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Budget Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              {overBudgetCategories.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-red-200/50 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex-shrink-0 w-3 h-3 bg-red-500 rounded-full shadow-sm" />
                  <div className="flex-1">
                    <span className="font-bold text-red-900">{item.category}</span> is over budget by{' '}
                    <span className="font-black text-red-700 bg-red-100 px-2 py-1 rounded-lg">
                      {formatAmountDetailed(Math.abs(item.remaining))}
                    </span>
                    <span className="text-red-700 font-medium">
                      {' '}({item.percentage}% of budget used)
                    </span>
                  </div>
                  <div className="flex-shrink-0 px-3 py-1 bg-red-100 rounded-full text-red-700 text-sm font-semibold">
                    {item.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <BudgetForm
        isOpen={showBudgetForm}
        onClose={() => setShowBudgetForm(false)}
        onSuccess={handleBudgetSuccess}
      />
    </div>
  );
}
