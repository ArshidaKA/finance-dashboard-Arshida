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

  // Filter & search
  const filteredTx = useMemo(() => {
    return transactions
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
  }, [transactions, filters, sort]);

  const totalPages = Math.ceil(filteredTx.length / itemsPerPage);
  const paginated = filteredTx.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Category-wise totals for current month
  const currentMonth = format(new Date(), "yyyy-MM");
  const categoryTotals = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense" && format(new Date(t.date), "yyyy-MM") === currentMonth)
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
  }, [transactions, currentMonth]);

  return (
    <div className={styles.tableWrapper}>
      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value }))}
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))}
        />
        <select
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
        >
          <option value="">All Categories</option>
          {Object.keys(categoryTotals).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={filters.type}
          onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Search description"
          value={filters.search}
          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
        />
        <select
          value={`${sort.key}-${sort.order}`}
          onChange={(e) => {
            const [key, order] = e.target.value.split("-");
            setSort({ key, order });
          }}
        >
          <option value="date-desc">Date Desc</option>
          <option value="date-asc">Date Asc</option>
          <option value="amount-desc">Amount Desc</option>
          <option value="amount-asc">Amount Asc</option>
        </select>
      </div>

      {/* Table */}
     <div className={styles.tableWrapper}>
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
                <td className={t.type === "Expense" ? styles.expense : styles.income}>
                  ${t.amount}
                </td>
                <td className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => setEditData(t)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => setDeleteTarget(t)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className={styles.modalBackdrop} onClick={() => setDeleteTarget(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this transaction?</p>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className={styles.confirmDeleteBtn}
                onClick={() => {
                  deleteTransaction(deleteTarget.id);
                  setDeleteTarget(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  
      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`${styles.pageBtn} ${page === i + 1 ? styles.activePage : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editData && (
        <div className={styles.modalBackdrop} onClick={() => setEditData(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>Edit Transaction</h3>
            <TransactionForm
              initialData={editData}
              isEditing
              onSubmitComplete={() => setEditData(null)}
            />
            <button className={styles.closeBtn} onClick={() => setEditData(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Category-wise totals */}
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
