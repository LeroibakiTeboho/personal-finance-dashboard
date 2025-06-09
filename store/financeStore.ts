import { atom } from "jotai";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
export type Transaction = {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: "income" | "expense";
};

export type Budget = {
  id: string;
  category: string;
  limit: number;
  spent: number;
};

export type SavingsGoal = {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
};

type FinanceState = {
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addBudget: (budget: Omit<Budget, "id">) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, "id">) => void;
  updateSavingsGoal: (id: string, goal: Partial<SavingsGoal>) => void;
  deleteSavingsGoal: (id: string) => void;
};

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: [],
      budgets: [
        { id: "1", category: "Housing", limit: 1500, spent: 1200 },
        { id: "2", category: "Food", limit: 500, spent: 350 },
        { id: "3", category: "Transport", limit: 300, spent: 200 },
      ],
      savingsGoals: [
        {
          id: "1",
          name: "Emergency Fund",
          target: 10000,
          current: 3500,
          deadline: "2024-12-31",
        },
        {
          id: "2",
          name: "Vacation",
          target: 3000,
          current: 1200,
          deadline: "2024-07-31",
        },
      ],

      // Transaction actions
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id: Date.now().toString() },
          ],
        })),

      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      // Budget actions
      addBudget: (budget) =>
        set((state) => ({
          budgets: [...state.budgets, { ...budget, id: Date.now().toString() }],
        })),

      updateBudget: (id, updates) =>
        set((state) => ({
          budgets: state.budgets.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        })),

      deleteBudget: (id) =>
        set((state) => ({
          budgets: state.budgets.filter((b) => b.id !== id),
        })),

      // Savings goal actions
      addSavingsGoal: (goal) =>
        set((state) => ({
          savingsGoals: [
            ...state.savingsGoals,
            { ...goal, id: Date.now().toString() },
          ],
        })),

      updateSavingsGoal: (id, updates) =>
        set((state) => ({
          savingsGoals: state.savingsGoals.map((g) =>
            g.id === id ? { ...g, ...updates } : g
          ),
        })),

      deleteSavingsGoal: (id) =>
        set((state) => ({
          savingsGoals: state.savingsGoals.filter((g) => g.id !== id),
        })),
    }),
    {
      name: "finance-storage",
      partialize: (state) => ({
        transactions: state.transactions,
        budgets: state.budgets,
        savingsGoals: state.savingsGoals,
      }),
    }
  )
);

// Atoms
export const transactionsAtom = atom<Transaction[]>([]);
export const budgetsAtom = atom<Budget[]>([]);
export const savingsGoalsAtom = atom<SavingsGoal[]>([]);
