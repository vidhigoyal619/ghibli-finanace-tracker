
import React from 'react';
import { motion } from 'framer-motion';

interface TreasureChestProps {
  balance: number;
}

const TreasureChest: React.FC<TreasureChestProps> = ({ balance }) => {
  // Determine chest state based on balance
  const isOpen = balance > 0;
  
  return (
    <motion.div 
      className="treasure-chest absolute bottom-10 right-10 z-10"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
    >
      {/* Render chest with coins overflowing if balance is positive */}
      <svg width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        {/* Chest Base */}
        <rect x="20" y="50" width="80" height="40" rx="5" fill="#8B4513" stroke="#5D2906" strokeWidth="2" />
        
        {/* Chest Lid */}
        <motion.path 
          d="M10 50 L110 50 L100 30 L20 30 Z" 
          fill="#A0522D" 
          stroke="#5D2906" 
          strokeWidth="2"
          initial={{ rotateX: isOpen ? -70 : 0 }}
          animate={{ rotateX: isOpen ? -70 : 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        />
        
        {/* Lock */}
        <rect x="50" y={isOpen ? "25" : "45"} width="20" height="15" rx="2" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
        
        {/* Coins - only shown when chest is open and balance is positive */}
        {isOpen && (
          <>
            <motion.circle 
              cx="50" cy="45" r="8" 
              fill="#FFD700" stroke="#B8860B" 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.circle 
              cx="65" cy="48" r="8" 
              fill="#FFD700" stroke="#B8860B"
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            />
            <motion.circle 
              cx="80" cy="45" r="8" 
              fill="#FFD700" stroke="#B8860B"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
};

export default TreasureChest;
