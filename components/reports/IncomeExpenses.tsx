'use client';
import { useTheme } from 'next-themes';
import { useFinanceStore } from '@/store/financeStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

export default function IncomeExpenses() {
  const { theme } = useTheme();
  const { transactions } = useFinanceStore();
  const textColor = theme === 'dark' ? '#F8FAFC' : '#111827';
  const gridColor = theme === 'dark' ? '#334155' : '#E5E7EB';

  // Process data for monthly income vs expenses
  const monthlyData: Record<string, { income: number; expenses: number; net: number }> = {};

  transactions.forEach(transaction => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expenses: 0, net: 0 };
    }
    
    if (transaction.type === 'income') {
      monthlyData[month].income += transaction.amount;
      monthlyData[month].net += transaction.amount;
    } else {
      monthlyData[month].expenses += transaction.amount;
      monthlyData[month].net -= transaction.amount;
    }
  });

  const chartData = Object.entries(monthlyData)
    .map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
      net: data.net
    }))
    .sort((a, b) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });

  return (
    <div className="space-y-8">
      {/* Income vs Expenses Bar Chart */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Monthly Income vs Expenses</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
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
              <Bar dataKey="income" fill="#10B981" name="Income" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Net Cash Flow */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Net Cash Flow</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
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
              <Area 
                type="monotone" 
                dataKey="net" 
                stroke="#3B82F6" 
                fill="#93C5FD" 
                name="Net Cash Flow" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income vs Expenses Trend */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Income vs Expenses Trend</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
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
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Income" 
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#EF4444" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Expenses" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Summary Table */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Monthly Summary</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Income
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Expenses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Net
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Savings Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {chartData.map((monthData) => (
                <tr key={monthData.month}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {monthData.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-500">
                    ${monthData.income.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-500">
                    -${monthData.expenses.toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap font-medium ${
                    monthData.net >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {monthData.net >= 0 ? '+' : ''}${monthData.net.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {monthData.income > 0 
                      ? `${((1 - monthData.expenses / monthData.income) * 100).toFixed(1)}%` 
                      : 'N/A'}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 dark:bg-slate-800/50 font-semibold">
                <td className="px-6 py-4 whitespace-nowrap">Total</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-500">
                  ${chartData.reduce((sum, m) => sum + m.income, 0).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-red-500">
                  -${chartData.reduce((sum, m) => sum + m.expenses, 0).toFixed(2)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${
                  chartData.reduce((sum, m) => sum + m.net, 0) >= 0 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {chartData.reduce((sum, m) => sum + m.net, 0) >= 0 ? '+' : ''}
                  ${chartData.reduce((sum, m) => sum + m.net, 0).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {chartData.reduce((sum, m) => sum + m.income, 0) > 0 
                    ? `${((1 - chartData.reduce((sum, m) => sum + m.expenses, 0) / chartData.reduce((sum, m) => sum + m.income, 0)) * 100).toFixed(1)}%` 
                    : 'N/A'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}