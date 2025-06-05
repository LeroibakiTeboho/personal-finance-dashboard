'use client';
import { Transaction } from '@/store/financeStore';
import { useFinanceStore } from '@/store/financeStore';
import { format } from 'date-fns';

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const { deleteTransaction } = useFinanceStore();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow overflow-hidden">
      {transactions.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No transactions found. Add your first transaction to get started.
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-slate-700">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 flex justify-between items-center">
              <div>
                <div className="font-medium">{transaction.description}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(transaction.date), 'MMM dd, yyyy')} • {transaction.category}
                </div>
              </div>
              <div className="flex items-center">
                <div className={`text-right mr-4 ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  <div className="font-medium">
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </div>
                </div>
                <button 
                  onClick={() => deleteTransaction(transaction.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}