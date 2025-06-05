"use client";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChartBarIcon,
  CogIcon,
  CreditCardIcon,
  HomeIcon,
  PlusCircleIcon,
  ScaleIcon,
  XMarkIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Transactions", href: "/transactions", icon: CreditCardIcon },
  { name: "Budgets", href: "/budgets", icon: ScaleIcon },
  { name: "Savings Goals", href: "/savings", icon: PlusCircleIcon },
  { name: "Reports", href: "/reports", icon: ChartBarIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-20 p-2 rounded-lg bg-white dark:bg-slate-800 shadow-md lg:hidden"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 p-4 ${
          theme === "dark" ? "bg-slate-800" : "bg-white"
        } shadow-lg z-10 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-slate-700">
          <h1 className="text-xl font-bold text-blue-500">FinDash</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-4 py-3 rounded-lg mb-2 ${
                pathname === item.href
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
            </a>
          ))}
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700 mt-4"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-0 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
