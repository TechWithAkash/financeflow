'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, categories } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DollarSign, Calendar, FileText, Tag, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TransactionForm({ isOpen, onClose, onSuccess, transaction = null }) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = Boolean(transaction);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: transaction ? {
      amount: transaction.amount,
      date: transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : '',
      description: transaction.description,
      category: transaction.category,
    } : {
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const url = isEditing ? `/api/transactions/${transaction._id}` : '/api/transactions';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save transaction');
      }
      
      const result = await response.json();
      
      // Show success toast
      toast.success(isEditing ? 'Transaction updated successfully!' : 'Transaction added successfully!', {
        duration: 3000,
        position: 'top-right',
      });
      
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
      toast.error('Failed to save transaction. Please try again.', {
        duration: 4000,
        position: 'top-right',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-0 ">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <div>{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</div>
              <p className="text-sm font-normal text-gray-500 mt-1">
                {isEditing ? 'Update your transaction details' : 'Add a new financial transaction'}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <DollarSign className="w-4 h-4 text-green-600" />
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register('amount', { valueAsNumber: true })}
              className={`h-11 bg-white  border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 ${
                errors.amount ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
              }`}
            />
            {errors.amount && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.amount.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4 text-blue-600" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              {...register('date')}
              className={`h-11 bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20 ${
                errors.date ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
              }`}
            />
            {errors.date && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.date.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 text-purple-600" />
              Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Enter transaction description"
              {...register('description')}
              className={`h-11 bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 ${
                errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.description.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Tag className="w-4 h-4 text-orange-600" />
              Category
            </Label>
            <Select
              id="category"
              {...register('category')}
              className={`h-11 bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20 ${
                errors.category ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
              }`}
            >
              <option value="" disabled className="text-gray-400">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category} className="text-gray-900">
                  {category}
                </option>
              ))}
            </Select>
            {errors.category && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.category.message}
              </p>
            )}
          </div>
          
          <div className="flex gap-3 pt-6">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  {isEditing ? 'Update Transaction' : 'Add Transaction'}
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 h-11 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all duration-200"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
