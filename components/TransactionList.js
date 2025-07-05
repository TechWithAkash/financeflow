'use client';

import { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, Search, Filter, Calendar, DollarSign, Tag, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { categories } from '@/lib/validations';
import TransactionForm from './TransactionForm';
import ConfirmationModal from '@/components/ui/confirmation-modal';
import toast from 'react-hot-toast';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
        setFilteredTransactions(data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    let filtered = transactions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(transaction => transaction.category === selectedCategory);
    }

    // Sort transactions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'amount':
          return b.amount - a.amount;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, selectedCategory, sortBy]);

  const handleDelete = async (id) => {
    setTransactionToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!transactionToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/transactions/${transactionToDelete}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setTransactions(transactions.filter(t => t._id !== transactionToDelete));
        toast.success('Transaction deleted successfully!', {
          duration: 3000,
          position: 'top-right',
        });
      } else {
        throw new Error('Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Failed to delete transaction. Please try again.', {
        duration: 4000,
        position: 'top-right',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      setTransactionToDelete(null);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  const handleFormSuccess = () => {
    fetchTransactions();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': 'bg-orange-100 text-orange-800',
      'Transportation': 'bg-blue-100 text-blue-800',
      'Shopping': 'bg-purple-100 text-purple-800',
      'Entertainment': 'bg-pink-100 text-pink-800',
      'Bills & Utilities': 'bg-red-100 text-red-800',
      'Healthcare': 'bg-green-100 text-green-800',
      'Travel': 'bg-indigo-100 text-indigo-800',
      'Education': 'bg-yellow-100 text-yellow-800',
      'Personal Care': 'bg-teal-100 text-teal-800',
      'Other': 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const transactionDate = new Date(date);
    const diffTime = Math.abs(now - transactionDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
              </div>
              <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-pulse">
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                  <div className="w-16 h-6 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent ">
            Transactions
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your expenses and track your spending habits
          </p>
        </div>
        <Button 
          onClick={() => setShowForm(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Transaction
        </Button>
      </div>      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Transactions */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Total Transactions</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors duration-200">
              <Calendar className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{filteredTransactions.length}</div>
            <p className="text-xs text-blue-700 mt-1">Active transactions</p>
          </CardContent>
        </Card>

        {/* Total Amount */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Total Amount</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors duration-200">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{formatAmount(totalAmount)}</div>
            <p className="text-xs text-green-700 mt-1">Total spending</p>
          </CardContent>
        </Card>

        {/* Average Transaction */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">Average Transaction</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg group-hover:bg-purple-600 transition-colors duration-200">
              <Tag className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {formatAmount(filteredTransactions.length > 0 ? totalAmount / filteredTransactions.length : 0)}
            </div>
            <p className="text-xs text-purple-700 mt-1">Per transaction</p>
          </CardContent>
        </Card>

        {/* Largest Transaction */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">Largest Transaction</CardTitle>
            <div className="p-2 bg-orange-500 rounded-lg group-hover:bg-orange-600 transition-colors duration-200">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {formatAmount(filteredTransactions.length > 0 ? Math.max(...filteredTransactions.map(t => t.amount)) : 0)}
            </div>
            <p className="text-xs text-orange-700 mt-1">Highest amount</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="min-w-[160px] h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="min-w-[140px] h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
                <option value="category">Sort by Category</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Clock className="w-5 h-5 text-blue-600" />
            Recent Transactions
          </CardTitle>
          <p className="text-sm text-gray-600">
            View and manage all your recent transactions
          </p>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <DollarSign className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {transactions.length === 0 ? 'No transactions yet' : 'No matching transactions'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {transactions.length === 0 
                  ? 'Add your first transaction to get started tracking your finances.' 
                  : 'Try adjusting your search or filter criteria to find the transactions you\'re looking for.'
                }
              </p>
              {transactions.length === 0 && (
                <Button 
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Transaction
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="group relative p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 truncate text-sm">
                          {transaction.description}
                        </h3>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(transaction.category)}`}>
                        {transaction.category}
                      </span>
                    </div>
                    
                    {/* Action buttons - Always visible */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(transaction)}
                        className="h-7 w-7 p-0 text-blue-600 hover:bg-blue-50"
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(transaction._id)}
                        className="h-7 w-7 p-0 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="mb-3">
                    <p className="text-xl font-bold text-gray-900">
                      {formatAmount(transaction.amount)}
                    </p>
                  </div>

                  {/* Date Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{getTimeAgo(transaction.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <TransactionForm
        isOpen={showForm}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        transaction={editingTransaction}
      />
      
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setTransactionToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Are you sure you want to delete this?"
        description="This action cannot be undone. This will permanently delete the transaction from your records."
        confirmText="Delete"
        isLoading={isDeleting}
      />
    </div>
  );
}
