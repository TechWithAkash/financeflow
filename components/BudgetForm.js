'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { budgetSchema, categories } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Target, Calendar, DollarSign, Sparkles, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BudgetForm({ isOpen, onClose, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      month: new Date().toISOString().slice(0, 7), // YYYY-MM format
      category: '',
      amount: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save budget');
      }
      
      const result = await response.json();
      
      // Show success toast
      toast.success('Budget set successfully!', {
        duration: 3000,
        position: 'top-right',
      });
      
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving budget:', error);
      toast.error('Failed to save budget. Please try again.', {
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
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <div>Set Monthly Budget</div>
              <p className="text-sm font-normal text-gray-500 mt-1">
                Plan your spending for the month
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="month" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4 text-blue-600" />
              Month
            </Label>
            <Input
              id="month"
              type="month"
              {...register('month')}
              className={`h-11 bg-white border-gray-200 text-gray-900 focus:border-green-500 focus:ring-green-500/20 ${
                errors.month ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
              }`}
            />
            {errors.month && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                {errors.month.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Category
            </Label>
            <Select
              id="category"
              {...register('category')}
              className={`h-11 bg-white border-gray-200 text-gray-900 focus:border-green-500 focus:ring-green-500/20 ${
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
                <AlertTriangle className="w-4 h-4" />
                {errors.category.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <DollarSign className="w-4 h-4 text-green-600" />
              Budget Amount
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register('amount', { valueAsNumber: true })}
              className={`h-11 bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 ${
                errors.amount ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
              }`}
            />
            {errors.amount && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                {errors.amount.message}
              </p>
            )}
          </div>
          
          <div className="flex gap-3 pt-6">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 h-11 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Set Budget
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
