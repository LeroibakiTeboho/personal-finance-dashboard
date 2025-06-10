'use client';
import IncomeExpenses from '@/components/reports/IncomeExpenses';

export default function IncomeExpensesReport() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Income vs Expenses</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Comparison of your earnings and spending over time
      </p>
      <IncomeExpenses />
    </div>
  );
}