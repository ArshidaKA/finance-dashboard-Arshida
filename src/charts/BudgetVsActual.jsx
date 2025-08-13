import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { useFinance } from "../context/FinanceProvider";
import { format } from "date-fns";

export default function BudgetVsActual() {
  const { state } = useFinance();
  const monthKey = format(new Date(), "yyyy-MM");

  const actualByCat = state.transactions
    .filter(t => t.type === "expense" && format(new Date(t.date), "yyyy-MM") === monthKey)
    .reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + t.amount; return acc; }, {});

  const categories = Array.from(new Set([
    ...Object.keys(state.budgets || {}),
    ...Object.keys(actualByCat)
  ]));

  const data = categories.map(cat => ({
    category: cat,
    Budget: state.budgets?.[cat] ?? 0,
    Actual: actualByCat[cat] ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="Budget" />
        <Bar dataKey="Actual" />
      </BarChart>
    </ResponsiveContainer>
  );
}
