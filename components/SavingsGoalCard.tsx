'use client';
import { SavingsGoal } from '@/store/financeStore';
import { useFinanceStore } from '@/store/financeStore';
import { format } from 'date-fns';

export default function SavingsGoalCard({ goal }: { goal: SavingsGoal }) {
  const { deleteSavingsGoal } = useFinanceStore();
  const percentage = Math.min(100, (goal.current / goal.target) * 100);
  const daysLeft = Math.floor(
    (new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{goal.name}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Target: ${goal.target.toFixed(2)}
          </p>
        </div>
        <button 
          onClick={() => deleteSavingsGoal(goal.id)}
          className="text-gray-400 hover:text-red-500"
        >
          Delete
        </button>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 mb-4">
        <div 
          className="h-2.5 rounded-full bg-blue-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-500 dark:text-gray-400">
          ${goal.current.toFixed(2)} saved
        </span>
        <span className="font-medium">
          {percentage.toFixed(0)}%
        </span>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Deadline
          </span>
          <span>
            {format(new Date(goal.deadline), 'MMM dd, yyyy')}
          </span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-500 dark:text-gray-400">
            Days left
          </span>
          <span className={daysLeft < 0 ? 'text-red-500' : ''}>
            {daysLeft > 0 ? daysLeft : 'Passed'}
          </span>
        </div>
      </div>
    </div>
  );
}