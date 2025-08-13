import IncomeVsExpenses from "../charts/IncomeVsExpenses";
import TopCategories from "../charts/TopCategories";
import BudgetVsActual from "../charts/BudgetVsActual";
import ProfileForm from "../forms/ProfileForm";
import BudgetsForm from "../forms/BudgetsForm";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import { useFinance } from "../context/FinanceProvider";
import { exportTransactionsToCSV } from "../utils/csv";
import { exportStateAsJSON, importStateFromJSON, clearAllData } from "../utils/storage";

export default function ReportsSettings() {
  const { state, dispatch } = useFinance();

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    importStateFromJSON(file, parsed => {
      // naive merge/replace: replace whole state then persist via dispatches
      if (parsed.transactions) parsed.transactions = Array.isArray(parsed.transactions) ? parsed.transactions : [];
      localStorage.setItem("financeData", JSON.stringify(parsed));
      // Force app to adopt imported data
      window.location.reload();
    });
  };

  return (
    <div style={{ padding: "1rem", display: "grid", gap: "2rem" }}>
      {/* Reports (Top Half) */}
      <section>
        <h2>Reports</h2>
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
          <div>
            <h3>Monthly Income vs Expenses</h3>
            <IncomeVsExpenses />
          </div>
          <div>
            <h3>Top 5 Spending Categories</h3>
            <TopCategories />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <h3>Budget vs Actual (Current Month)</h3>
            <BudgetVsActual />
          </div>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button onClick={() => exportTransactionsToCSV(state.transactions)}>Export CSV</button>
          <button onClick={() => exportStateAsJSON(state)}>Export JSON</button>
          <label style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center" }}>
            <input type="file" accept="application/json" onChange={handleImport} />
            Import JSON
          </label>
        </div>
      </section>

      {/* Settings (Bottom Half) */}
      <section>
        <h2>Settings</h2>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div>
            <h3>User Profile</h3>
            <ProfileForm />
          </div>

          <div>
            <h3>Monthly Budgets per Category</h3>
            <BudgetsForm />
          </div>

          <div>
            <h3>Theme</h3>
            <ThemeToggle />
          </div>

          <div>
            <h3>Data Management</h3>
            <button onClick={clearAllData} style={{ background: "#f44336", color: "white", padding: "0.5rem 1rem" }}>
              Clear All Data
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
