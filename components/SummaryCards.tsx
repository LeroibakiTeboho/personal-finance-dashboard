'use client';
import { useFinanceStore } from '@/store/financeStore';
import { ArrowDownIcon, ArrowUpIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function SummaryCards() {
  const { transactions } = useFinanceStore();
  
  // Calculate financial metrics
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netWorth = income - expenses;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Income Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <div className="flex items-center">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
            <ArrowUpIcon className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Income</p>
            <h3 className="text-2xl font-bold">${income.toFixed(2)}</h3>
          </div>
        </div>
      </div>
      
      {/* Expenses Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <div className="flex items-center">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg mr-4">
            <ArrowDownIcon className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Expenses</p>
            <h3 className="text-2xl font-bold">${expenses.toFixed(2)}</h3>
          </div>
        </div>
      </div>
      
      {/* Net Worth Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
            <CurrencyDollarIcon className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Net Worth</p>
            <h3 className={`text-2xl font-bold ${netWorth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${netWorth.toFixed(2)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}