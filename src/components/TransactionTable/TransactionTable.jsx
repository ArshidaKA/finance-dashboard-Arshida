import { useState, useMemo } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { format } from "date-fns";
import styles from "./TransactionTable.module.css";
import TransactionForm from "../../forms/TransactionForm/TransactionForm";

export default function TransactionTable() {
  const { transactions, deleteTransaction } = useTransactions();
  const [page, setPage] = useState(1);
  const [editData, setEditData] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    type: "",
    search: "",
  });
  const [sort, setSort] = useState({ key: "date", order: "desc" });
  const itemsPerPage = 10;

  const dummyTransactions = [
    { id: "d1", date: "2025-08-01", type: "income", category: "Salary", description: "Monthly Salary", amount: 5000 },
    { id: "d2", date: "2025-08-02", type: "expense", category: "Groceries", description: "Walmart", amount: 120 },
    { id: "d3", date: "2025-08-03", type: "expense", category: "Transport", description: "Uber rides", amount: 50 },
    { id: "d4", date: "2025-08-04", type: "income", category: "Freelance", description: "Web project", amount: 800 },
    { id: "d5", date: "2025-08-05", type: "expense", category: "Dining", description: "Restaurant", amount: 60 },
    { id: "d6", date: "2025-08-06", type: "expense", category: "Bills", description: "Electricity", amount: 100 },
    { id: "d7", date: "2025-08-07", type: "expense", category: "Shopping", description: "Clothes", amount: 150 },
    { id: "d8", date: "2025-08-08", type: "income", category: "Bonus", description: "Performance bonus", amount: 400 },
    { id: "d9", date: "2025-08-09", type: "expense", category: "Entertainment", description: "Movie night", amount: 30 },
    { id: "d10", date: "2025-08-10", type: "expense", category: "Groceries", description: "Costco", amount: 90 },
    { id: "d11", date: "2025-08-11", type: "expense", category: "Transport", description: "Gas refill", amount: 70 },
    { id: "d12", date: "2025-08-12", type: "expense", category: "Bills", description: "Water bill", amount: 40 },
    { id: "d13", date: "2025-08-13", type: "expense", category: "Dining", description: "Pizza", amount: 25 },
  ];

  const allTransactions = [...dummyTransactions, ...transactions];

  const filteredTx = useMemo(() => {
    return allTransactions
      .filter((t) => {
        const matchesType = filters.type ? t.type === filters.type : true;
        const matchesCategory = filters.category ? t.category === filters.category : true;
        const matchesSearch = filters.search
          ? t.description?.toLowerCase().includes(filters.search.toLowerCase())
          : true;
        const date = new Date(t.date);
        const matchesStart = filters.startDate ? date >= new Date(filters.startDate) : true;
        const matchesEnd = filters.endDate ? date <= new Date(filters.endDate) : true;
        return matchesType && matchesCategory && matchesSearch && matchesStart && matchesEnd;
      })
      .sort((a, b) => {
        if (sort.key === "amount") {
          return sort.order === "asc" ? a.amount - b.amount : b.amount - a.amount;
        }
        const dateA = new Date(a.date), dateB = new Date(b.date);
        return sort.order === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [allTransactions, filters, sort]);

  const totalPages = Math.ceil(filteredTx.length / itemsPerPage);
  const paginated = filteredTx.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const currentMonth = format(new Date(), "yyyy-MM");
  const categoryTotals = useMemo(() => {
    return allTransactions
      .filter((t) => t.type === "expense" && format(new Date(t.date), "yyyy-MM") === currentMonth)
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
  }, [allTransactions, currentMonth]);

  return (
    <div className={styles.tableWrapper}>
      {/* Filters */}
      <div className={styles.filters}>
        <input type="date" value={filters.startDate} onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value }))} />
        <input type="date" value={filters.endDate} onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))} />
        <select value={filters.category} onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}>
          <option value="">All Categories</option>
          {Object.keys(categoryTotals).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={filters.type} onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input type="text" placeholder="Search description" value={filters.search} onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))} />
        <select value={`${sort.key}-${sort.order}`} onChange={(e) => {
          const [key, order] = e.target.value.split("-");
          setSort({ key, order });
        }}>
          <option value="date-desc">Date Desc</option>
          <option value="date-asc">Date Asc</option>
          <option value="amount-desc">Amount Desc</option>
          <option value="amount-asc">Amount Asc</option>
        </select>
      </div>

      {/* Table */}
      {paginated.length === 0 ? (
        <div className={styles.noTransactions}>No transactions found</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((t) => (
              <tr key={t.id}>
                <td>{format(new Date(t.date), "dd MMM yyyy")}</td>
                <td>{t.type}</td>
                <td>{t.category}</td>
                <td>{t.description || "-"}</td>
                <td className={t.type === "expense" ? styles.expense : styles.income}>
                  ${t.amount}
                </td>
                <td className={styles.actions}>
                  <button className={styles.editBtn} onClick={() => setEditData(t)}>Edit</button>
                  <button className={styles.deleteBtn} onClick={() => setDeleteTarget(t)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {deleteTarget && (
        <div className={styles.modalBackdrop} onClick={() => setDeleteTarget(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this transaction?</p>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className={styles.confirmDeleteBtn} onClick={() => {
                deleteTransaction(deleteTarget.id);
                setDeleteTarget(null);
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`${styles.pageBtn} ${page === i + 1 ? styles.activePage : ""}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {editData && (
        <div className={styles.modalBackdrop} onClick={() => setEditData(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Edit Transaction</h3>
            <TransactionForm initialData={editData} isEditing onSubmitComplete={() => setEditData(null)} />
            <button className={styles.closeBtn} onClick={() => setEditData(null)}>Close</button>
          </div>
        </div>
      )}

      <div className={styles.categoryTotals}>
        <h4>Current Month Expenses by Category</h4>
        <ul>
          {Object.entries(categoryTotals).map(([cat, amt]) => (
            <li key={cat}>
              {cat}: ${amt.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
