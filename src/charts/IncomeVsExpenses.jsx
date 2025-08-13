import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { useFinance } from "../context/FinanceProvider";
import { format } from "date-fns";

export default function IncomeVsExpenses() {
  const { state } = useFinance();
  const now = new Date();
  const monthKey = format(now, "yyyy-MM");

  const income = state.transactions
    .filter(t => t.type === "income" && format(new Date(t.date), "yyyy-MM") === monthKey)
    .reduce((s, t) => s + t.amount, 0);

  const expenses = state.transactions
    .filter(t => t.type === "expense" && format(new Date(t.date), "yyyy-MM") === monthKey)
    .reduce((s, t) => s + t.amount, 0);

  const data = [{ name: format(now, "MMM yyyy"), Income: income, Expenses: expenses }];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="Income" />
        <Bar dataKey="Expenses" />
      </BarChart>
    </ResponsiveContainer>
  );
}
