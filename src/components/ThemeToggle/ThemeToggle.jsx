import { useFinance } from "../../context/FinanceProvider";

export default function ThemeToggle() {
  const { state, dispatch } = useFinance();
  const next = state.theme === "light" ? "dark" : "light";
  return (
    <button onClick={() => dispatch({ type: "SET_THEME", payload: next })}>
      Toggle Theme (current: {state.theme})
    </button>
  );
}
