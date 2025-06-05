'use client';
import { useState } from 'react';
import { useFinanceStore } from '@/store/financeStore';

export default function SavingsGoalForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    target: '',
    current: '',
    deadline: new Date().toISOString().split('T')[0],
  });
  const { addSavingsGoal } = useFinanceStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addSavingsGoal({
      name: formData.name,
      target: parseFloat(formData.target),
      current: parseFloat(formData.current) || 0,
      deadline: formData.deadline,
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm">Goal Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Vacation Fund"
          className="w-full p-2 border rounded-lg dark:bg-slate-800"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm">Target Amount</label>
          <input
            type="number"
            name="target"
            value={formData.target}
            onChange={handleChange}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            className="w-full p-2 border rounded-lg dark:bg-slate-800"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1 text-sm">Current Amount</label>
          <input
            type="number"
            name="current"
            value={formData.current}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full p-2 border rounded-lg dark:bg-slate-800"
          />
        </div>
      </div>
      
      <div>
        <label className="block mb-1 text-sm">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
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
          Create Goal
        </button>
      </div>
    </form>
  );
}