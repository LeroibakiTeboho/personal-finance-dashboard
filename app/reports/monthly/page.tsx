'use client';
import MonthlyChart from '@/components/reports/MonthlyChart';

export default function MonthlyReport() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Monthly Overview</h1>
      <MonthlyChart />
    </div>
  );
}