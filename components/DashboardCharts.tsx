'use client';
import { LineChart, BarChart, PieChart, AreaChart, 
  Line, Bar, Pie, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from 'next-themes';
import { useFinanceStore } from '@/store/financeStore';

const COLORS = ['#3B82F6', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6'];

export default function DashboardCharts() {
  const { theme } = useTheme();
  const { savingsGoals, transactions } = useFinanceStore();
  const textColor = theme === 'dark' ? '#F8FAFC' : '#111827';
  const gridColor = theme === 'dark' ? '#334155' : '#E5E7EB';

  // Calculate expense categories from transactions
  const expenses = transactions.filter(t => t.type === 'expense');
  const categoryMap: Record<string, number> = {};

  expenses.forEach(expense => {
    if (!categoryMap[expense.category]) {
      categoryMap[expense.category] = 0;
    }
    categoryMap[expense.category] += expense.amount;
  });

  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  // Savings goals progress
  const goalProgressData = savingsGoals.map(goal => ({
    name: goal.name,
    progress: Math.min(100, (goal.current / goal.target) * 100)
  }));

  // Net worth data (simplified)
  const netWorthData = [
    { month: 'Jan', net: 1800 },
    { month: 'Feb', net: 2200 },
    { month: 'Mar', net: 1300 },
    { month: 'Apr', net: 2500 },
  ];

  // Income vs expenses data
  const incomeExpenseData = [
    { month: 'Jan', income: 5000, expenses: 3200 },
    { month: 'Feb', income: 5200, expenses: 3000 },
    { month: 'Mar', income: 4800, expenses: 3500 },
    { month: 'Apr', income: 5300, expenses: 2800 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Net Worth Chart */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Net Worth Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          
          <AreaChart data={netWorthData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip />
            <Area type="monotone" dataKey="net" fill="#93C5FD" stroke="#3B82F6" />
          </AreaChart>
          
        </ResponsiveContainer>
 <Tooltip 
          contentStyle={{
            backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
            borderColor: theme === 'dark' ? '#334155' : '#E5E7EB'
          }}
          itemStyle={{ color: textColor }}
        />
       
      </div>

       {/* Expense Categories */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Expense Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Income vs Expenses */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={incomeExpenseData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#10B981" name="Income" />
            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Savings Goals Progress */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Savings Goals Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={goalProgressData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
            <XAxis type="number" domain={[0, 100]} stroke={textColor} />
            <YAxis type="category" dataKey="name" stroke={textColor} width={100} />
            <Tooltip formatter={(value) => [`${value}%`, 'Progress']} />
            <Bar dataKey="progress" fill="#60A5FA" radius={[0, 4, 4, 0]}>
              {goalProgressData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index % 2 === 0 ? '#60A5FA' : '#3B82F6'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}