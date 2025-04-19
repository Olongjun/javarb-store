'use client';

import { ThemeProvider } from 'next-themes';
import { TransactionProvider } from './context/TransactionContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <TransactionProvider>
        {children}
      </TransactionProvider>
    </ThemeProvider>
  );
}
