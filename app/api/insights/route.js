import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('financeflow');
    
    // Get current month
    const currentDate = new Date();
    const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    
    // Get current month's transactions
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    const transactions = await db.collection('transactions').find({
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    }).toArray();
    
    // Get current month's budgets
    const budgets = await db.collection('budgets').find({
      month: currentMonth,
    }).toArray();
    
    // Calculate spending by category
    const spendingByCategory = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});
    
    // Calculate total spending
    const totalSpending = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    
    // Calculate total budget
    const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
    
    // Find budget overages
    const budgetOverages = budgets.map(budget => {
      const spent = spendingByCategory[budget.category] || 0;
      const percentage = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
      return {
        category: budget.category,
        budgeted: budget.amount,
        spent,
        remaining: budget.amount - spent,
        percentage: Math.round(percentage),
        isOverBudget: spent > budget.amount,
      };
    });
    
    // Get monthly spending data for the last 6 months
    const monthlySpending = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthTransactions = await db.collection('transactions').find({
        date: {
          $gte: monthStart,
          $lte: monthEnd,
        },
      }).toArray();
      
      const monthTotal = monthTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      
      monthlySpending.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        amount: monthTotal,
      });
    }
    
    return NextResponse.json({
      totalSpending,
      totalBudget,
      spendingByCategory,
      budgetOverages,
      monthlySpending,
      transactionCount: transactions.length,
    });
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json({ error: 'Failed to fetch insights' }, { status: 500 });
  }
}
