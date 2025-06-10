'use client';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    localStorage.setItem('user', JSON.stringify({
      id: 'user-123',
      name,
      email
    }));
    
    router.push('/');
  };

  return (
    <div className="w-full max-w-4xl p-6">
      <div className="flex flex-col lg:flex-row rounded-xl shadow-lg overflow-hidden bg-white dark:bg-slate-800">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-700 p-12 hidden lg:block">
          <div className="h-full flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-white mb-4">Start Your Financial Journey</h1>
            <p className="text-xl text-white opacity-90">Take control of your money with powerful tracking tools</p>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Set up your financial dashboard</p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className="block mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                placeholder="John Doe"
              />
            </div>
            
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
            
            <div>
              <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center hover:bg-blue-600 transition"
            >
              Create Account <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
            
            <div className="text-center mt-4">
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account? 
                <Link href="/" className="text-blue-500 ml-2 hover:underline">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}