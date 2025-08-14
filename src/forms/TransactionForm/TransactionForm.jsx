import { useForm } from "react-hook-form";
import { useTransactions } from "../../hooks/useTransactions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import styles from "./TransactionForm.module.css";

export default function TransactionForm({ initialData = null, onSubmitComplete, isEditing = false }) {
  const { addTransaction, updateTransaction } = useTransactions();
  const [date, setDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      type: "expense",
      category: "",
      description: "",
      amount: "",
    },
  });

  const typeValue = watch("type");

  // Prefill form if editing
  useEffect(() => {
    if (initialData) {
      reset({
        type: initialData.type,
        category: initialData.category,
        description: initialData.description || "",
        amount: initialData.amount,
      });
      setDate(new Date(initialData.date));
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      date: date.toISOString(),
      amount: parseFloat(data.amount),
      id: initialData?.id, // preserve id for editing
    };

    if (isEditing) {
      updateTransaction(payload);
    } else {
      addTransaction(payload);
    }

    reset();
    setDate(new Date());
    if (onSubmitComplete) onSubmitComplete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        type="number"
        placeholder="Amount"
        className={styles.input}
        {...register("amount", { required: true, min: 0.01 })}
      />
      {errors.amount && <span className={styles.error}>Amount must be positive</span>}

      <select className={styles.select} {...register("category", { required: true })}>
        <option value="">Select Category</option>
        <option>Food</option>
        <option>Transport</option>
        <option>Entertainment</option>
        <option>Bills</option>
        <option>Shopping</option>
        <option>Salary</option>
        <option>Freelance</option>
        <option>Other</option>
      </select>
      {errors.category && <span className={styles.error}>Category required</span>}

      <input
        type="text"
        placeholder="Description"
        className={styles.input}
        {...register("description")}
      />

      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        maxDate={typeValue === "expense" ? new Date() : null}
        className={styles.datePicker}
      />

      <select className={styles.select} {...register("type")}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button type="submit" className={styles.button}>
        {isEditing ? "Update" : "Add"}
      </button>
    </form>
  );
}
