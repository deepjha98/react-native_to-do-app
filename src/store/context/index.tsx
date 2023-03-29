import { createContext, useReducer } from "react";

import { ExpensesData } from "@src/ts/interface";

// Iniitial state declaration
type InitialStateType = {
  expenses: ExpensesData[];
};
const initialState = {
  expenses: [
    {
      id: "e1",
      description: "A pair of shoes",
      amount: 699,
      date: new Date("2022-12-14"),
    },
    {
      id: "e2",
      description: "Bought a jeans",
      amount: 599.5,
      date: new Date("2023-02-14"),
    },
    {
      id: "e3",
      description: "Went for lunch",
      amount: 123.99,
      date: new Date("2022-12-04"),
    },
    {
      id: "e4",
      description: "Netflix bill",
      amount: 59.19,
      date: new Date("2023-01-01"),
    },
  ],
};

// Reducer
const expenseReducer = (state: any, action: any) => {
  switch (action.type) {
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
