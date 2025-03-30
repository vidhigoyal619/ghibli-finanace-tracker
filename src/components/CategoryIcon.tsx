
import React from 'react';
import { Home, Utensils, ShoppingBag, Plane, Tv, UtilityPole, Pill } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TransactionCategory = 
  | 'rent'
  | 'food'
  | 'shopping'
  | 'travel'
  | 'entertainment'
  | 'utilities'
  | 'healthcare'
  | 'income'
  | 'other';

interface CategoryIconProps {
  category: TransactionCategory;
  className?: string;
  size?: number;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  category, 
  className, 
  size = 24 
}) => {
  const iconClass = cn(
    "transition-all",
    className
  );
  
  // Map categories to their respective icons
  const getIcon = () => {
    switch (category) {
      case 'rent':
        return <Home size={size} className={iconClass} />;
      case 'food':
        return <Utensils size={size} className={iconClass} />;
      case 'shopping':
        return <ShoppingBag size={size} className={iconClass} />;
      case 'travel':
        return <Plane size={size} className={iconClass} />;
      case 'entertainment':
        return <Tv size={size} className={iconClass} />;
      case 'utilities':
        return <UtilityPole size={size} className={iconClass} />;
      case 'healthcare':
        return <Pill size={size} className={iconClass} />;
      case 'income':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconClass}>
            <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      default:
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconClass}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M12 8v8M8 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
    }
  };
  
  return getIcon();
};

export default CategoryIcon;
