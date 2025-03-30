
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Transaction } from '@/types/finance';

interface BalanceOverviewProps {
  transactions: Transaction[];
}

const BalanceOverview: React.FC<BalanceOverviewProps> = ({ transactions }) => {
  const balanceControls = useAnimation();
  const prevBalanceRef = useRef<number>(0);
  
  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;
  
  // Animate balance when it changes
  useEffect(() => {
    if (prevBalanceRef.current !== balance) {
      balanceControls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.3 }
      });
      
      if (Math.abs(balance - prevBalanceRef.current) > 0) {
        balanceControls.start({
          x: [0, -3, 3, -3, 0],
          transition: { duration: 0.3, delay: 0.15 }
        });
      }
      
      prevBalanceRef.current = balance;
    }
  }, [balance, balanceControls]);
  
  return (
    <motion.div 
      className="parchment"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center justify-center mb-4 gap-3">
        <motion.div 
          className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#7a4f2a" strokeWidth="1.5" />
            <path d="M12 8v8M8 12h8" stroke="#7a4f2a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-bold">Balance</h2>
      </div>
      
      <motion.div 
        className="text-5xl font-bold text-center mb-6"
        animate={balanceControls}
      >
        ${balance.toFixed(2)}
      </motion.div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50/80 p-4 rounded-xl border border-green-200">
          <p className="text-green-700 font-semibold mb-1">Income</p>
          <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        
        <div className="bg-red-50/80 p-4 rounded-xl border border-red-200">
          <p className="text-red-700 font-semibold mb-1">Expenses</p>
          <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceOverview;
