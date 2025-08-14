import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { format } from "date-fns";
import styles from "./TransactionTable.module.css";

export default function TransactionTable() {
  const { transactions, deleteTransaction } = useTransactions();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginated = transactions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className={styles.tableWrapper}>
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
              <td>${t.amount}</td>
              <td>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show pagination only if there are multiple pages */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`${styles.pageBtn} ${
                page === i + 1 ? styles.activePage : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
