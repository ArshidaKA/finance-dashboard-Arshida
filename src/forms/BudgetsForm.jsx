import { useForm } from "react-hook-form";
import { useFinance } from "../context/FinanceProvider";
import { CATEGORIES } from "../constants/categories";

export default function BudgetsForm() {
  const { state, dispatch } = useFinance();
  const defaultValues = CATEGORIES.reduce((acc, c) => {
    acc[c] = state.budgets?.[c] ?? 0;
    return acc;
  }, {});
  const { register, handleSubmit } = useForm({ defaultValues });

  const onSubmit = (data) => {
    const parsed = Object.fromEntries(Object.entries(data).map(([k,v]) => [k, Number(v) || 0]));
    dispatch({ type: "SET_BUDGETS", payload: parsed });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))" }}>
      {CATEGORIES.map(cat => (
        <label key={cat} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ minWidth: 90 }}>{cat}</span>
          <input type="number" step="0.01" min="0" {...register(cat)} />
        </label>
      ))}
      <div style={{ gridColumn: "1 / -1" }}>
        <button type="submit">Save Budgets</button>
      </div>
    </form>
  );
}
