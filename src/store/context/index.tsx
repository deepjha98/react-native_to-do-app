import { createContext, useReducer } from "react";

import { ExpensesData } from "@src/ts/interface";

// Iniitial state declaration
type InitialStateType = {
  expenses: ExpensesData[];
};
const initialState = {
  expenses: [],
};

// Reducer
const expenseReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SYNC_EXPENSE":
      return {
        ...state,
        expenses: [...action.payload].reverse(),
      };

    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [
          ...state.expenses,
          {
            id: new Date().toString() + Math.random().toString(),
            description: action.payload.description,
            amount: action.payload.amount,
            date: action.payload.date,
          },
        ],
      };
    case "REMOVE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense: ExpensesData) => expense.id !== action.payload.id
        ),
      };
    case "EDIT_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense: ExpensesData) =>
          expense.id === action.payload.id
            ? {
                ...expense,
                ...action.payload,
              }
            : expense
        ),
      };
  }
};

// Create a context
const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Provider
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
