import { useState } from "react";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import ExpenseCategoriesChart from "../../charts/ExpenseCategoriesChart";
import MonthlySpendingTrend from "../../charts/MonthlySpendingTrend";
import { useFinancialData } from "../../hooks/useFinancialData";
import { useTransactions } from "../../hooks/useTransactions";
import { format } from "date-fns";
import TransactionForm from "../../forms/TransactionForm/TransactionForm";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { totalIncome, totalExpenses, currentBalance, categoryBreakdown, monthlyTrend } =
    useFinancialData();
  const { transactions, deleteTransaction } = useTransactions();

  const recentTx = transactions.slice(0, 10);

  const [editingTx, setEditingTx] = useState(null);

  return (
    <div className={styles.dashboard}>
      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <SummaryCard title="Total Income" value={`$${totalIncome}`} color="green" />
        <SummaryCard title="Total Expenses" value={`$${totalExpenses}`} color="red" />
        <SummaryCard title="Balance" value={`$${currentBalance}`} color="blue" />
        <SummaryCard title="Savings Goal" value="60%" color="orange" />
      </div>

      {/* Recent Transactions */}
      <h2 className={styles.sectionTitle}>Recent Transactions</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.transactionsTable}>
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
                  <button
                    className={styles.editBtn}
                    onClick={() => setEditingTx(t)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteTransaction(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className={styles.charts}>
        <div className={styles.chartBox}>
          <h3 className={styles.chartTitle}>Expense Categories</h3>
          <ExpenseCategoriesChart data={categoryBreakdown} />
        </div>
        <div className={styles.chartBox}>
          <h3 className={styles.chartTitle}>Monthly Spending Trend</h3>
          <MonthlySpendingTrend data={monthlyTrend} />
        </div>
      </div>

      {/* Edit Modal */}
      {editingTx && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>Edit Transaction</h3>
            <TransactionForm
              initialData={editingTx}
              isEditing={true}
              onSubmitComplete={() => setEditingTx(null)}
            />
            <button
              className={styles.closeBtn}
              onClick={() => setEditingTx(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
