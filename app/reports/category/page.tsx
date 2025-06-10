'use client';
import CategoryBreakdown from '@/components/reports/CategoryBreakdown';

export default function CategoryReport() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Category Breakdown</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Detailed analysis of your spending by category
      </p>
      <CategoryBreakdown />
    </div>
  );
}