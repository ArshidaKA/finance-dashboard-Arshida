import { useForm } from "react-hook-form";
import { useFinance } from "../../context/FinanceProvider";
import styles from "./ProfileForm.module.css";

export default function ProfileForm() {
  const { state, dispatch } = useFinance();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: state.user?.name || "", currency: state.user?.currency || "USD" },
  });

  const onSubmit = (data) => {
    dispatch({ type: "SET_USER", payload: data });
    reset(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        placeholder="Name"
        {...register("name", { required: true })}
        className={styles.input}
      />
      <select {...register("currency", { required: true })} className={styles.select}>
        <option>USD</option>
        <option>INR</option>
        <option>EUR</option>
        <option>GBP</option>
      </select>
      <button type="submit" className={styles.button}>
        Save Profile
      </button>
    </form>
  );
}
