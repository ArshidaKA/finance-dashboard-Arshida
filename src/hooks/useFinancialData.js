import { useFinance } from "../context/FinanceProvider";
import { format } from "date-fns";

export const useFinancialData = () => {
  const { state } = useFinance();
  const now = new Date();

  const totalIncome = state.transactions
    .filter(
      (t) =>
        t.type === "income" &&
        format(new Date(t.date), "yyyy-MM") === format(now, "yyyy-MM")
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = state.transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        format(new Date(t.date), "yyyy-MM") === format(now, "yyyy-MM")
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalIncome - totalExpenses;

  const categoryBreakdown = state.transactions.reduce((acc, t) => {
    if (t.type === "expense") {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
    }
    return acc;
  }, {});

  const monthlyTrend = [...Array(6)].map((_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = format(date, "yyyy-MM");
    const expenses = state.transactions
      .filter((t) => t.type === "expense" && format(new Date(t.date), "yyyy-MM") === monthKey)
      .reduce((sum, t) => sum + t.amount, 0);
    return { month: format(date, "MMM yyyy"), expenses };
  }).reverse();

  return { totalIncome, totalExpenses, currentBalance, categoryBreakdown, monthlyTrend };
};
