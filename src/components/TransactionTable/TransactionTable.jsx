import { useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { format } from "date-fns";

export default function TransactionTable() {
  const { transactions, deleteTransaction } = useTransactions();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginated = transactions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ marginTop: "2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                <button onClick={() => deleteTransaction(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "1rem" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              fontWeight: page === i + 1 ? "bold" : "normal",
              marginRight: "0.5rem",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
