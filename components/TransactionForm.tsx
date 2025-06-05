'use client';
import { useState } from 'react';
import { useFinanceStore } from '@/store/financeStore';

export default function TransactionForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: '',
    description: '',
    type: 'expense'
  });
  const { addTransaction } = useFinanceStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
      date: formData.date
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-slate-800"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-1 text-sm">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-slate-800"
          >
            <option value="">Select category</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Investment">Investment</option>
            <option value="Housing">Housing</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block mb-1 text-sm">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-slate-800"
        />
      </div>
      
      <div>
        <label className="block mb-1 text-sm">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="0.00"
          min="0.01"
          step="0.01"
          className="w-full p-2 border rounded-lg dark:bg-slate-800"
          required
        />
      </div>
      
      <div>
        <label className="block mb-1 text-sm">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add note..."
          className="w-full p-2 border rounded-lg dark:bg-slate-800"
          rows={2}
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}