export function financeReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };

    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case "SET_USER":
      return { ...state, user: { ...state.user, ...action.payload } };

    case "SET_THEME":
      return { ...state, theme: action.payload };

    case "SET_BUDGETS":
      return { ...state, budgets: action.payload };
       case "SET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
      };

    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (t) => t.id !== action.payload
        ),
      };

    case "UPDATE_INCOME_EXPENSES":
      return {
        ...state,
        income: action.payload.income,
        expenses: action.payload.expenses,
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };



    default:
      return state;
      
  }
}
