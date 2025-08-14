import { useForm } from "react-hook-form";
import { useFinance } from "../../context/FinanceProvider";
import { CATEGORIES } from "../../constants/categories";
import styles from "./BudgetsForm.module.css";

export default function BudgetsForm() {
  const { state, dispatch } = useFinance();
  const defaultValues = CATEGORIES.reduce((acc, c) => {
    acc[c] = state.budgets?.[c] ?? 0;
    return acc;
  }, {});
  const { register, handleSubmit } = useForm({ defaultValues });

  const onSubmit = (data) => {
    const parsed = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, Number(v) || 0])
    );
    dispatch({ type: "SET_BUDGETS", payload: parsed });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {CATEGORIES.map((cat) => (
        <label key={cat} className={styles.label}>
          <span>{cat}</span>
          <input type="number" step="0.01" min="0" {...register(cat)} />
        </label>
      ))}
      <div className={styles.fullWidth}>
        <button type="submit">Save Budgets</button>
      </div>
    </form>
  );
}
