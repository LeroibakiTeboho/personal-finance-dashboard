'use client';
import { Budget } from '@/store/financeStore';
import { useFinanceStore } from '@/store/financeStore';

export default function BudgetCard({ budget }: { budget: Budget }) {
  const { deleteBudget } = useFinanceStore();
  const percentage = Math.min(100, (budget.spent / budget.limit) * 100);
  const remaining = budget.limit - budget.spent;
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{budget.category}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            ${budget.spent.toFixed(2)} of ${budget.limit.toFixed(2)}
          </p>
        </div>
        <button 
          onClick={() => deleteBudget(budget.id)}
          className="text-gray-400 hover:text-red-500"
        >
          Delete
        </button>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 mb-4">
        <div 
          className={`h-2.5 rounded-full ${
            percentage < 70 ? 'bg-green-500' : 
            percentage < 90 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          {percentage.toFixed(0)}% spent
        </span>
        <span className="font-medium">
          ${remaining.toFixed(2)} left
        </span>
      </div>
    </div>
  );
}