'use client';
import { useState } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import SavingsGoalCard from '@/components/SavingsGoalCard';
import SavingsGoalForm from '@/components/SavingsGoalForm';

export default function SavingsPage() {
  const [showForm, setShowForm] = useState(false);
  const { savingsGoals } = useFinanceStore();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Savings Goals</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create Goal
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsGoals.map(goal => (
          <SavingsGoalCard key={goal.id} goal={goal} />
        ))}
      </div>
      
      {savingsGoals.length === 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">No Savings Goals</h3>
          <p className="text-gray-500 mb-4">Create your first savings goal to start tracking your progress</p>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Goal
          </button>
        </div>
      )}
      
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Create Savings Goal</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <SavingsGoalForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}