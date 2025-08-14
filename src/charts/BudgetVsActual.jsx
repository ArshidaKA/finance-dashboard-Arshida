import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { useFinance } from "../context/FinanceProvider";
import { format } from "date-fns";

export default function BudgetVsActual() {
  const { state } = useFinance();
  const monthKey = format(new Date(), "yyyy-MM");

  const actualByCat = state.transactions
    .filter(t => t.type === "expense" && format(new Date(t.date), "yyyy-MM") === monthKey)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

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
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        margin: "20px 0",
        width: "100%",
        height: "auto"
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "15px",
          color: "#333",
          fontSize: "18px"
        }}
      >
        Budget vs Actual (This Month)
      </h3>

      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            style={{
              fontFamily: "Arial, sans-serif"
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="category" style={{ fontSize: "12px" }} />
            <YAxis style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "5px"
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="Budget" fill="#4CAF50" radius={[5, 5, 0, 0]} />
            <Bar dataKey="Actual" fill="#F44336" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
