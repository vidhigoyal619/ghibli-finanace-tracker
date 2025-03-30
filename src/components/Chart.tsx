import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import gsap from "gsap";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import WizardCharacter from "./WizardCharacter";
import Navigation from "./Navigation";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Transaction {
  id: number;
  date: string;
  category: string;
  type: "Income" | "Expense";
  amount: number;
}

// Initial Transactions
const initialTransactions: Transaction[] = [
  { id: 1, date: "2025-03-30", category: "Food", type: "Expense", amount: 500 },
  { id: 2, date: "2025-03-29", category: "Salary", type: "Income", amount: 30000 },
  { id: 3, date: "2025-03-28", category: "Shopping", type: "Expense", amount: 1500 },
  { id: 4, date: "2025-03-27", category: "Transport", type: "Expense", amount: 100 },
  { id: 5, date: "2025-03-26", category: "Investment", type: "Expense", amount: 5000 },
];

const Chart: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const chartRef = useRef(null);

  useEffect(() => {
    // GSAP animation for Chart
    gsap.fromTo(
      chartRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  // Data preparation for Chart
  const dates = transactions.map((txn) => txn.date);
  const expenses = transactions.map((txn) => (txn.type === "Expense" ? txn.amount : 0));
  const income = transactions.map((txn) => (txn.type === "Income" ? txn.amount : 0));

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Expenses",
        data: expenses,
        backgroundColor: "#a52a2a",
        borderColor: "#552302",
        borderWidth: 1,
      },
      {
        label: "Income",
        data: income,
        backgroundColor: "#2e8b57",
        borderColor: "#1f6038",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: true }, tooltip: { enabled: true } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-[url('/lovable-uploads/background.png')]">
      {/* Navigation Bar */}
      <div>
        <Navigation />
      </div>

      {/* Wizard Character */}
      <div className="align-middle justify-center">
        <WizardCharacter />
      </div>

      {/* Chart Container */}
      <h1 className="text-5xl font-extrabold text-ghibli-deepBrown mb-3 drop-shadow-lg text-center">Financial Overview</h1>
      <div className="max-w-xl w-full relative p-3">
      <div className="p-4 bg-[#f9ead6] rounded-2xl shadow-2xl " ref={chartRef}>
        <h2 className="text-1xl font-bold text-[#552302] mb-4 text-center">Expense & Income Chart</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
      </div>
    </div>
  );
};

export default Chart;
