
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BalanceOverview from '@/components/BalanceOverview';
import TransactionForm from '@/components/TransactionForm';
import TransactionHistory from '@/components/TransactionHistory';
import FireflyContainer from '@/components/FireflyContainer';
import CloudBackground from '@/components/CloudBackground';
import TreasureChest from '@/components/TreasureChest';
import Navigation from '@/components/Navigation';
import WizardCharacter from '@/components/WizardCharacter';
import { Transaction } from '@/types/finance';
import { toast } from 'sonner';

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Load transactions from localStorage
  useEffect(() => {
    
    // Load transactions
    const savedTransactions = localStorage.getItem('ghibli-finance-transactions');
    if (savedTransactions) {
      try {
        const parsedTransactions = JSON.parse(savedTransactions);
        // Convert date strings back to Date objects
        const processedTransactions = parsedTransactions.map((t: any) => ({
          ...t,
          date: new Date(t.date),
        }));
        setTransactions(processedTransactions);
      } catch (error) {
        console.error('Error parsing saved transactions', error);
      }
    }
    
    // Clean up function to stop music when component unmounts
  }, []);
  
  // Save transactions to localStorage when they change
  useEffect(() => {
    localStorage.setItem('ghibli-finance-transactions', JSON.stringify(transactions));
  }, [transactions]);
  
  // Add new transaction
  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
    
    // Play sound effect based on transaction type
    const soundEffect = new Audio(
      transaction.type === 'income' ? '/coin-sound.mp3' : '/expense-sound.mp3'
    );
    soundEffect.volume = 0.3;
    soundEffect.play();
    
    toast(
      transaction.type === 'income' ? 'Income Added!' : 'Expense Recorded!', 
      {
        description: `$${transaction.amount.toFixed(2)} has been ${
          transaction.type === 'income' ? 'added to' : 'deducted from'
        } your balance.`,
        position: 'top-center',
      }
    );
  };
  
  // Calculate balance for treasure chest animation
  const balance = transactions.reduce((sum, t) => {
    return t.type === 'income' ? sum + t.amount : sum - t.amount;
  }, 0);
  
  return (
    <div className="min-h-screen relative">
      <div className="min-h-screen bg-[url('/lovable-uploads/background.png')] bg-cover bg-center bg-fixed">
        {/* Background Elements */}
        <CloudBackground />
        <FireflyContainer />
        <TreasureChest balance={balance} />
        <WizardCharacter />
        
        <div className="container mx-auto px-4 py-10 relative z-10">
          <Navigation />
          
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              Personal Finance
            </motion.h1>
            <motion.h2 
              className="text-2xl md:text-4xl font-semibold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              & Budgeting Tracker
            </motion.h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <BalanceOverview transactions={transactions} />
              
              <TransactionForm onAddTransaction={addTransaction} />
            </div>
            
            <TransactionHistory transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
