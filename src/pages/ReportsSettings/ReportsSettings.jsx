import { useFinance } from "../../context/FinanceProvider";
import { exportTransactionsToCSV } from "../../utils/csv";
import { exportStateAsJSON, importStateFromJSON, clearAllData } from "../../utils/storage";
import IncomeVsExpenses from "../../charts/IncomeVsExpenses";
import TopCategories from "../../charts/TopCategories";
import BudgetVsActual from "../../charts/BudgetVsActual";
import ProfileForm from "../../forms/ProfileForm/ProfileForm";
import BudgetsForm from "../../forms/BudgetsForm/BudgetsForm";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import styles from "./ReportsSettings.module.css";

export default function ReportsSettings() {
  const { state } = useFinance();

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    importStateFromJSON(file, parsed => {
      if (parsed.transactions) parsed.transactions = Array.isArray(parsed.transactions) ? parsed.transactions : [];
      localStorage.setItem("financeData", JSON.stringify(parsed));
      toast.success("Data imported successfully!");
      setTimeout(() => window.location.reload(), 1000);
    });
  };

  const handleClearData = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete all your data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#555",
      confirmButtonText: "Yes, clear it!"
    }).then((result) => {
      if (result.isConfirmed) {
        clearAllData();
        toast.success("All data cleared!");
      }
    });
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Reports Section */}
      <section className={styles.section}>
        <h2>📊 Reports</h2>
        <div className={styles.reportsRow}>
          <div className={styles.reportCard}>
            <h3>Monthly Income vs Expenses</h3>
            <IncomeVsExpenses />
          </div>
          <div className={styles.reportCard}>
            <h3>Top 5 Spending Categories</h3>
            <TopCategories />
          </div>
          <div className={`${styles.reportCard} ${styles.fullWidth}`}>
            <h3>Budget vs Actual (Current Month)</h3>
            <BudgetVsActual />
          </div>
        </div>

        <div className={styles.buttonRow}>
          <button
            onClick={() => {
              exportTransactionsToCSV(state.transactions);
              toast.success("CSV exported successfully!");
            }}
          >
            Export CSV
          </button>
{/* 
          <label className={styles.fileLabel}>
            Import JSON
            <input type="file" accept="application/json" onChange={handleImport} hidden />
          </label> */}
        </div>
      </section>

      {/* Settings Section */}
      <section className={styles.section}>
        <h2>⚙️ Settings</h2>
        <div className={styles.settingsRow}>
          <div className={styles.settingCard}>
            <h3>User Profile</h3>
            <ProfileForm />
          </div>

          <div className={styles.settingCard}>
            <h3>Monthly Budgets</h3>
            <BudgetsForm />
          </div>

          <div className={styles.settingCard}>
            <h3>Theme</h3>
            <ThemeToggle />
          </div>

          <div className={styles.settingCard}>
            <h3>Data Management</h3>
            <button className={styles.clearButton} onClick={handleClearData}>
              Clear All Data
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
