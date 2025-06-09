'use client';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  ChartBarIcon, CogIcon, CreditCardIcon, HomeIcon, 
  PlusCircleIcon, ScaleIcon, XMarkIcon, Bars3Icon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Transactions', href: '/transactions', icon: CreditCardIcon },
  { name: 'Budgets', href: '/budgets', icon: ScaleIcon },
  { name: 'Savings Goals', href: '/savings', icon: PlusCircleIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsOpen(window.innerWidth >= 1024);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <>
      {/* Mobile menu button - only visible on mobile */}
      {isMobile && !isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className={`fixed top-4 left-4 z-30 p-2 rounded-lg ${
            theme === 'dark' ? 'bg-slate-800' : 'bg-white'
          } shadow-md`}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 p-4 ${
          theme === 'dark' ? 'bg-slate-800' : 'bg-white'
        } shadow-lg z-20 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-slate-700">
          <h1 className="text-xl font-bold text-blue-500">FinDash</h1>
          {isMobile && (
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>
        
        <nav className="mt-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => isMobile && setIsOpen(false)}
              className={`flex items-center px-4 py-3 rounded-lg mb-2 ${
                pathname === item.href 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
            </a>
          ))}
          
          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700 mt-4"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}