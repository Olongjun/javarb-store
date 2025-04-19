'use client';

import { createContext, useContext, useState } from 'react';
import { Transaction } from '../types/transaction';

interface TransactionContextType {
  transactions: Transaction[];
  getAllTransactions: () => Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getAllTransactions = () => {
    return transactions;
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      getAllTransactions,
      addTransaction,
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
