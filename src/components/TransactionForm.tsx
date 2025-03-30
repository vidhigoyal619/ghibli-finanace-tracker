
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import CategoryIcon, { TransactionCategory } from './CategoryIcon';
import { Transaction } from '@/types/finance';

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState<TransactionCategory>('food');
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>('');
  
  const coinSoundRef = useRef<HTMLAudioElement | null>(null);
  const expenseSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio elements
  React.useEffect(() => {
    coinSoundRef.current = new Audio('/coin-sound.mp3');
    expenseSoundRef.current = new Audio('/expense-sound.mp3');
    
    // Set low volume
    if (coinSoundRef.current) coinSoundRef.current.volume = 0.3;
    if (expenseSoundRef.current) expenseSoundRef.current.volume = 0.3;
    
    return () => {
      if (coinSoundRef.current) coinSoundRef.current.pause();
      if (expenseSoundRef.current) expenseSoundRef.current.pause();
    };
  }, []);
  
  const handleClickSound = () => {
    const clickSound = new Audio('/click-sound.mp3');
    clickSound.volume = 0.2;
    clickSound.play();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    // Play appropriate sound
    if (type === 'income' && coinSoundRef.current) {
      coinSoundRef.current.currentTime = 0;
      coinSoundRef.current.play();
    } else if (type === 'expense' && expenseSoundRef.current) {
      expenseSoundRef.current.currentTime = 0;
      expenseSoundRef.current.play();
    }
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      category,
      amount: Number(amount),
      date,
      description,
    };
    
    onAddTransaction(newTransaction);
    
    // Reset form
    setAmount('');
    setDescription('');
  };
  
  return (
    <motion.div 
      className="parchment"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type">Transaction Type</Label>
            <Select
              value={type}
              onValueChange={(value: 'income' | 'expense') => {
                setType(value);
                handleClickSound();
              }}
            >
              <SelectTrigger className="w-full bg-white/70 border-ghibli-goldenBrown">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={(value: TransactionCategory) => {
                setCategory(value);
                handleClickSound();
              }}
            >
              <SelectTrigger className="w-full bg-white/70 border-ghibli-goldenBrown">
                <SelectValue placeholder="Select category">
                  <div className="flex items-center gap-2">
                    <CategoryIcon category={category} size={18} />
                    <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {type === 'income' ? (
                  <SelectItem value="income">
                    <div className="flex items-center gap-2">
                      <CategoryIcon category="income" size={18} />
                      <span>Income</span>
                    </div>
                  </SelectItem>
                ) : (
                  <>
                    <SelectItem value="rent">
                      <div className="flex items-center gap-2">
                        <CategoryIcon category="rent" size={18} />
                        <span>Rent</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="food">
                      <div className="flex items-center gap-2">
                        <CategoryIcon category="food" size={18} />
                        <span>Food</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="shopping">
                      <div className="flex items-center gap-2">
                        <CategoryIcon category="shopping" size={18} />
                        <span>Shopping</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="travel">
                      <div className="flex items-center gap-2">
                        <CategoryIcon category="travel" size={18} />
                        <span>Travel</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="entertainment">
                      <div className="flex items-center gap-2">
                        <CategoryIcon category="entertainment" size={18} />
                        <span>Entertainment</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="utilities">
                      <div className="flex items-center gap-2">
                        <CategoryIcon category="utilities" size={18} />
                        <span>Utilities</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="healthcare">
                      <div className="flex items-center gap-2">
                        <CategoryIcon category="healthcare" size={18} />
                        <span>Healthcare</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="other">
                      <div className="flex items-center gap-2">
                        <CategoryIcon category="other" size={18} />
                        <span>Other</span>
                      </div>
                    </SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="bg-white/70 border-ghibli-goldenBrown"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => handleClickSound()}
                  className="w-full bg-white/70 border-ghibli-goldenBrown justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description"
            className="bg-white/70 border-ghibli-goldenBrown"
          />
        </div>
        
        <motion.button
          type="submit"
          className="ghibli-button w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClickSound}
        >
          Add {type === 'income' ? 'Income' : 'Expense'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TransactionForm;
