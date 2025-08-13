import TransactionForm from "../forms/TransactionForm";
import TransactionTable from "../components/TransactionTable/TransactionTable";

export default function Transactions() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Manage Transactions</h2>
      <TransactionForm />
      <TransactionTable />
    </div>
  );
}
