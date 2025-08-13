import { useForm } from "react-hook-form";
import { useFinance } from "../context/FinanceProvider";

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
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <input placeholder="Name" {...register("name", { required: true })} />
      <select {...register("currency", { required: true })}>
        <option>USD</option><option>INR</option><option>EUR</option><option>GBP</option>
      </select>
      <button type="submit">Save Profile</button>
    </form>
  );
}
