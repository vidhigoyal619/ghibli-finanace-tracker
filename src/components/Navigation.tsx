import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoMdSave } from "react-icons/io";
import { saveAs } from "file-saver";

interface Transaction {
  id: number;
  date: string;
  category: string;
  type: string;
  amount: number;
  description: string;
}

// Predefined Transactions
const predefinedTransactions: Transaction[] = [
  { id: 1, date: "2025-03-30", category: "Food", type: "Expense", amount: 500, description: "Lunch at restaurant" },
  { id: 2, date: "2025-03-29", category: "Salary", type: "Income", amount: 30000, description: "March salary credited" },
  { id: 3, date: "2025-03-28", category: "Shopping", type: "Expense", amount: 1500, description: "Bought new shoes" },
  { id: 4, date: "2025-03-27", category: "Transport", type: "Expense", amount: 100, description: "Cab fare" },
  { id: 5, date: "2025-03-26", category: "Investment", type: "Expense", amount: 5000, description: "Stocks investment" }
];

const Navigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab: string) => {
    const clickSound = new Audio("/click-sound.mp3");
    clickSound.volume = 0.2;
    clickSound.play().catch((e) => console.log("Audio play prevented:", e));
    setActiveTab(tab);
  };

  // Transactions ko CSV me Export karna
  const exportToCSV = () => {
    const csvContent =
      "ID,Date,Category,Type,Amount,Description\n" +
      predefinedTransactions
        .map(
          (txn) =>
            `${txn.id},${txn.date},${txn.category},${txn.type},${txn.amount},${txn.description}`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "transactions.csv");
  };

  return (
    <motion.div
      className="mb-8 max-w-xl m-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <nav className="bg-[#f4dcb8] p-3 flex justify-center rounded-lg shadow-md navigation">
        <ul className="flex space-x-5">
          <li>
            <Link to="/" onClick={() => handleTabClick("dashboard")}>
              <motion.button
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "dashboard"
                    ? "bg-[#552302] text-[#f4dcb8] border-yellow-600 border-2"
                    : "bg-transparent text-[#552302] hover:bg-[#7a4f2a]/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Dashboard
              </motion.button>
            </Link>
          </li>
          <li>
            <Link to="/chart" onClick={() => handleTabClick("dashboard")}>
              <motion.button
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "dashboard"
                    ? "bg-[#552302] text-[#f4dcb8] border-yellow-600 border-2"
                    : "bg-transparent text-[#552302] hover:bg-[#7a4f2a]/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Chart
              </motion.button>
            </Link>
          </li>
          <li onClick={() => handleTabClick("dashboard")}>
              <motion.button
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "dashboard"
                    ? "bg-[#552302] text-[#f4dcb8] border-yellow-600 border-2"
                    : "bg-transparent text-[#552302] hover:bg-[#7a4f2a]/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save
              </motion.button>
          </li>
        </ul>

        {/* Export CSV Button */}
        {/* <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#552302] text-[#f4dcb8] hover:bg-[#7a4f2a] transition-all"
        >
         Save
        </button> */}
      </nav>
    </motion.div>
  );
};

export default Navigation;
