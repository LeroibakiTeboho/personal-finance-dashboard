'use client';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    localStorage.setItem('user', JSON.stringify({
      id: 'user-123',
      name: 'John Doe',
      email
    }));
    
    router.push('/dashboard');
  };


  return (
    <div className="w-full max-w-4xl p-6">
      <div className="flex flex-col lg:flex-row rounded-xl shadow-lg overflow-hidden bg-white dark:bg-slate-800">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-700 p-12 hidden lg:block">
          <div className="h-full flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-4">Take Control of Your Finances</h1>
            <p className="text-xl text-white opacity-90">Visualize, track, and optimize your financial health</p>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Sign in to your account</p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center hover:bg-blue-600 transition"
            >
              Sign In <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
            
            <div className="text-center mt-4">
              <p className="text-gray-600 dark:text-gray-300">
                Don&apos;t have an account? 
                <a href="/register" className="text-blue-500 ml-2 hover:underline">Sign up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
