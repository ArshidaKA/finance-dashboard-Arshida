import { useFinance } from "../context/FinanceProvider";
import { v4 as uuidv4 } from "uuid";

export const useTransactions = () => {
  const { state, dispatch } = useFinance();

  const addTransaction = (transaction) => {
    const newTx = { ...transaction, id: uuidv4() };
    dispatch({ type: "ADD_TRANSACTION", payload: newTx });
  };

  const updateTransaction = (updated) => {
    dispatch({ type: "UPDATE_TRANSACTION", payload: updated });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const getTransactionsByFilter = ({ type, category, startDate, endDate, search }) => {
    return state.transactions.filter((t) => {
      const matchesType = type ? t.type === type : true;
      const matchesCategory = category ? t.category === category : true;
      const matchesDate =
        (!startDate || new Date(t.date) >= startDate) &&
        (!endDate || new Date(t.date) <= endDate);
      const matchesSearch = search
        ? t.description?.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesType && matchesCategory && matchesDate && matchesSearch;
    });
  };

  return {
    transactions: state.transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByFilter,
  };
};
