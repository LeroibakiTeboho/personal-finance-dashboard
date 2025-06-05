'use client';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();
  const { transactions, budgets, savingsGoals } = useFinanceStore();
  const [exportStatus, setExportStatus] = useState('');

  const exportData = () => {
    const data = {
      transactions,
      budgets,
      savingsGoals,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finance-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setExportStatus('Data exported successfully!');
    setTimeout(() => setExportStatus(''), 3000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Theme</h2>
          <div className="flex space-x-4">
            <button 
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-lg border ${
                theme === 'light' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-gray-200 dark:border-slate-700'
              }`}
            >
              Light
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-lg border ${
                theme === 'dark' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-gray-200 dark:border-slate-700'
              }`}
            >
              Dark
            </button>
            <button 
              onClick={() => setTheme('system')}
              className={`px-4 py-2 rounded-lg border ${
                theme === 'system' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-gray-200 dark:border-slate-700'
              }`}
            >
              System
            </button>
          </div>
        </div>
        
        {/* Data Management */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Data Management</h2>
          <div className="space-y-4">
            <div>
              <button 
                onClick={exportData}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Export Data
              </button>
              {exportStatus && (
                <p className="mt-2 text-green-500">{exportStatus}</p>
              )}
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Import Data</h3>
              <input 
                type="file" 
                accept=".json"
                className="w-full p-2 border rounded-lg dark:bg-slate-800"
              />
              <button className="mt-2 bg-gray-200 dark:bg-slate-700 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600">
                Import
              </button>
            </div>
          </div>
        </div>
        
        {/* Account Settings */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
              <input 
                type="email" 
                value="user@example.com" 
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-slate-700"
              />
            </div>
            
            <div>
              <label className="block mb-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full p-2 border rounded-lg dark:bg-slate-800"
              />
              <button className="mt-2 text-blue-500 hover:underline">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}