'use client';
import { useState } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';

export default function TransactionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const { transactions } = useFinanceStore();

  // Filter transactions
  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex space-x-3">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white dark:bg-slate-800 border rounded-lg px-3 py-2"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Add New
          </button>
        </div>
      </div>

      <TransactionList transactions={filteredTransactions} />

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add Transaction</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <TransactionForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}