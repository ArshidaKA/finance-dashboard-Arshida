import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useFinance } from "../context/FinanceProvider";
import { format } from "date-fns";

export default function TopCategories() {
  const { state } = useFinance();
  const monthKey = format(new Date(), "yyyy-MM");

  const totals = state.transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        format(new Date(t.date), "yyyy-MM") === monthKey
    )
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(totals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        height: "100%",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "15px",
          color: "#333",
        }}
      >
        Top Categories (This Month)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#555" }}
            axisLine={{ stroke: "#ccc" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            axisLine={{ stroke: "#ccc" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "8px",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
