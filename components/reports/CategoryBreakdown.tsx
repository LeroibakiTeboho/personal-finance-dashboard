'use client';
import { useTheme } from 'next-themes';
import { useFinanceStore } from '@/store/financeStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#8B5CF6'];

export default function CategoryBreakdown() {
  const { theme } = useTheme();
  const { transactions } = useFinanceStore();
  const textColor = theme === 'dark' ? '#F8FAFC' : '#111827';
  const gridColor = theme === 'dark' ? '#334155' : '#E5E7EB';

  // Calculate expenses by category
  const expenses = transactions.filter(t => t.type === 'expense');
  const categoryMap: Record<string, number> = {};

  expenses.forEach(expense => {
    if (!categoryMap[expense.category]) {
      categoryMap[expense.category] = 0;
    }
    categoryMap[expense.category] += expense.amount;
  });

  const categoryData = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Calculate monthly expenses by category
  const monthlyData: Record<string, Record<string, number>> = {};

  expenses.forEach(expense => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
    
    if (!monthlyData[month]) {
      monthlyData[month] = {};
    }
    
    if (!monthlyData[month][expense.category]) {
      monthlyData[month][expense.category] = 0;
    }
    
    monthlyData[month][expense.category] += expense.amount;
  });

  const monthlyChartData = Object.entries(monthlyData).map(([month, categories]) => {
    return {
      month,
      ...categories
    };
  });

  const categories = Object.keys(categoryMap);

  return (
    <div className="space-y-8">
      {/* Pie Chart */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Expense Distribution</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#334155' : '#E5E7EB'
                }}
                itemStyle={{ color: textColor }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Monthly Category Breakdown</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" stroke={textColor} />
              <YAxis stroke={textColor} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
                  borderColor: theme === 'dark' ? '#334155' : '#E5E7EB'
                }}
                itemStyle={{ color: textColor }}
              />
              <Legend />
              {categories.map((category, index) => (
                <Bar 
                  key={category} 
                  dataKey={category} 
                  stackId="a" 
                  fill={COLORS[index % COLORS.length]} 
                  name={category}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Details */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Category Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {categoryData.map((category) => (
                <tr key={category.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[categoryData.indexOf(category) % COLORS.length] }}
                      ></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-500 font-medium">
                    -${category.value.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {((category.value / expenses.reduce((sum, e) => sum + e.amount, 0)) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 dark:bg-slate-800/50 font-semibold">
                <td className="px-6 py-4 whitespace-nowrap">Total</td>
                <td className="px-6 py-4 whitespace-nowrap text-red-500">
                  -${expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}