'use client';
import { useTheme } from 'next-themes';
import { useFinanceStore } from '@/store/financeStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MonthlyChart() {
  const { theme } = useTheme();
  const { transactions } = useFinanceStore();
  
  // Process transaction data for monthly view
  const processData = () => {
    const monthlyData: Record<string, { income: number; expenses: number }> = {};
    
    transactions.forEach(transaction => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
      
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expenses: 0 };
      }
      
      if (transaction.type === 'income') {
        monthlyData[month].income += transaction.amount;
      } else {
        monthlyData[month].expenses += transaction.amount;
      }
    });
    
    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
      net: data.income - data.expenses
    }));
  };
  
  const chartData = processData();
  const textColor = theme === 'dark' ? '#F8FAFC' : '#111827';
  const gridColor = theme === 'dark' ? '#334155' : '#E5E7EB';

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="month" stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="income" 
            stroke="#10B981" 
            strokeWidth={2}
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="expenses" 
            stroke="#EF4444" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="net" 
            stroke="#3B82F6" 
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}