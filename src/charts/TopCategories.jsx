import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useFinance } from "../context/FinanceProvider";
import { format } from "date-fns";

export default function TopCategories() {
  const { state } = useFinance();
  const monthKey = format(new Date(), "yyyy-MM");

  const totals = state.transactions
    .filter(t => t.type === "expense" && format(new Date(t.date), "yyyy-MM") === monthKey)
    .reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + t.amount; return acc; }, {});

  const data = Object.entries(totals)
    .map(([name, value]) => ({ name, value }))
    .sort((a,b) => b.value - a.value)
    .slice(0,5);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Bar dataKey="value" />
      </BarChart>
    </ResponsiveContainer>
  );
}
