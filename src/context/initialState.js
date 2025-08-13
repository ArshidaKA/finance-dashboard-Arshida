export const initialState = {
  transactions: [],
  user: {
    name: "John Doe",
    currency: "USD",
  },
  theme: "light",
  budgets: {}, // per category
   transactions: [],
  income: 0,
  expenses: 0,
  filters: {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    type: "all", // income | expense | all
  },
};

