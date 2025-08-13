import SummaryCard from "../components/SummaryCard/SummaryCard";
import ExpenseCategoriesChart from "../charts/ExpenseCategoriesChart";
import MonthlySpendingTrend from "../charts/MonthlySpendingTrend";
import { useFinancialData } from "../hooks/useFinancialData";
import { useTransactions } from "../hooks/useTransactions";
import { format } from "date-fns";

export default function Dashboard() {
  const { totalIncome, totalExpenses, currentBalance, categoryBreakdown, monthlyTrend } =
    useFinancialData();
  const { transactions, deleteTransaction } = useTransactions();

  const recentTx = transactions.slice(0, 10);

  return (
    <div style={{ padding: "1rem" }}>
      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <SummaryCard title="Total Income" value={`$${totalIncome}`} color="green" />
        <SummaryCard title="Total Expenses" value={`$${totalExpenses}`} color="red" />
        <SummaryCard title="Balance" value={`$${currentBalance}`} color="blue" />
        <SummaryCard title="Savings Goal" value="60%" color="orange" />
      </div>

      {/* Recent Transactions */}
      <h2 style={{ marginTop: "2rem" }}>Recent Transactions</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentTx.map((t) => (
            <tr key={t.id}>
              <td>{format(new Date(t.date), "dd MMM yyyy")}</td>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>{t.description || "-"}</td>
              <td>${t.amount}</td>
              <td>
                <button onClick={() => deleteTransaction(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Charts */}
      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3>Expense Categories</h3>
          <ExpenseCategoriesChart data={categoryBreakdown} />
        </div>
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3>Monthly Spending Trend</h3>
          <MonthlySpendingTrend data={monthlyTrend} />
        </div>
      </div>
    </div>
  );
}
