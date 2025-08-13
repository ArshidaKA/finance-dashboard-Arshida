import Papa from "papaparse";

export const exportTransactionsToCSV = (transactions, filename = "transactions.csv") => {
  const csv = Papa.unparse(
    transactions.map(t => ({
      id: t.id,
      date: t.date,
      type: t.type,
      category: t.category,
      description: t.description || "",
      amount: t.amount,
    }))
  );
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
