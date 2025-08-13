import { createContext, useReducer, useContext, useEffect } from "react";
import { initialState } from "./initialState";
import { financeReducer } from "./financeReducer";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState, (init) => {
    // Load from localStorage if available
    const stored = localStorage.getItem("financeData");
    return stored ? JSON.parse(stored) : init;
  });

  useEffect(() => {
    localStorage.setItem("financeData", JSON.stringify(state));
  }, [state]);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
