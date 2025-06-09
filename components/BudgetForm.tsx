'use client';
import { useState } from 'react';
import { useFinanceStore } from '@/store/financeStore';

export default function BudgetForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
  });
  const { addBudget } = useFinanceStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addBudget({
      category: formData.category,
      limit: parseFloat(formData.limit),
      spent: 0,
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg dark:bg-slate-800"
          required
        >
          <option value="">Select category</option>
          <option value="Housing">Housing</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div>
        <label className="block mb-1 text-sm">Budget Limit</label>
        <input
          type="number"
          name="limit"
          value={formData.limit}
          onChange={handleChange}
          placeholder="0.00"
          min="0.01"
          step="0.01"
          className="w-full p-2 border rounded-lg dark:bg-slate-800"
          required
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
          Create Budget
        </button>
      </div>
    </form>
  );
}