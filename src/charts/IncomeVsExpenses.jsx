import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from "recharts";
import { useFinance } from "../context/FinanceProvider";
import { format } from "date-fns";

export default function IncomeVsExpenses() {
  const { state } = useFinance();
  const now = new Date();
  const monthKey = format(now, "yyyy-MM");

  const income = state.transactions
    .filter(
      (t) =>
        t.type === "income" &&
        format(new Date(t.date), "yyyy-MM") === monthKey
    )
    .reduce((s, t) => s + t.amount, 0);

  const expenses = state.transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        format(new Date(t.date), "yyyy-MM") === monthKey
    )
    .reduce((s, t) => s + t.amount, 0);

  const data = [
    { name: format(now, "MMM yyyy"), Income: income, Expenses: expenses },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "1rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        width: "100%",
        height: "100%",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "1rem", fontSize: "1.2rem", color: "#333" }}>
        Income vs Expenses
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#555" }} />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar
            dataKey="Income"
            fill="#4caf50"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="Expenses"
            fill="#f44336"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
