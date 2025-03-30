import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Transaction } from '@/types/finance';
import CategoryIcon, { TransactionCategory } from './CategoryIcon';
import { Trash2 } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onDelete: (id: string) => void; // Function to delete transaction
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions, onDelete }) => {
  return (
    <motion.div 
      className="parchment"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
      
      {transactions.length === 0 ? (
        <p className="text-center py-6 text-ghibli-deepBrown/60 italic">
          No transactions yet. Add one to get started!
        </p>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          <AnimatePresence>
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  transaction.type === 'income' 
                    ? 'bg-green-50/80 border border-green-200' 
                    : 'bg-red-50/80 border border-red-200'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' 
                      ? 'bg-green-100' 
                      : 'bg-red-100'
                  }`}>
                    <CategoryIcon 
                      category={transaction.category as TransactionCategory} 
                      size={20} 
                      className={
                        transaction.type === 'income' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }
                    />
                  </div>
                  <div>
                    <p className="font-medium capitalize">
                      {transaction.type === 'income' ? 'Income' : transaction.category}
                    </p>
                    <p className="text-sm text-ghibli-deepBrown/70">
                      {format(transaction.date, 'MMM dd')}
                      {transaction.description && ` · ${transaction.description}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <p className={`font-bold ${
                    transaction.type === 'income' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default TransactionHistory;
