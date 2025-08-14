import IncomeVsExpenses from "../../charts/IncomeVsExpenses";
import TopCategories from "../../charts/TopCategories";
import BudgetVsActual from "../../charts/BudgetVsActual";
import ProfileForm from "../../forms/ProfileForm/ProfileForm";
import BudgetsForm from "../../forms/BudgetsForm/BudgetsForm";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import { useFinance } from "../../context/FinanceProvider";
import { exportTransactionsToCSV } from "../../utils/csv";
import { exportStateAsJSON, importStateFromJSON, clearAllData } from "../../utils/storage";
import styles from "./ReportsSettings.module.css";

export default function ReportsSettings() {
  const { state } = useFinance();

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    importStateFromJSON(file, parsed => {
      if (parsed.transactions) parsed.transactions = Array.isArray(parsed.transactions) ? parsed.transactions : [];
      localStorage.setItem("financeData", JSON.stringify(parsed));
      window.location.reload();
    });
  };

  return (
    <div className={styles.container}>
      {/* Reports Section */}
      <section className={styles.section}>
        <h2>Reports</h2>
        <div className={styles.reportsGrid}>
          <div>
            <h3>Monthly Income vs Expenses</h3>
            <IncomeVsExpenses />
          </div>
          <div>
            <h3>Top 5 Spending Categories</h3>
            <TopCategories />
          </div>
          <div className={styles.fullWidth}>
            <h3>Budget vs Actual (Current Month)</h3>
            <BudgetVsActual />
          </div>
        </div>

        <div className={styles.exportButtons}>
          <button onClick={() => exportTransactionsToCSV(state.transactions)}>Export CSV</button>
          <button onClick={() => exportStateAsJSON(state)}>Export JSON</button>
          <label className={styles.fileLabel}>
            <input type="file" accept="application/json" onChange={handleImport} />
            Import JSON
          </label>
        </div>
      </section>

      {/* Settings Section */}
      <section className={styles.section}>
        <h2>Settings</h2>
        <div className={styles.settingsGrid}>
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
            <button onClick={clearAllData} className={styles.clearButton}>
              Clear All Data
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
