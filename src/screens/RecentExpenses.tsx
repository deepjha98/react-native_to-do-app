import { useContext, useEffect } from "react";

import { StyleSheet } from "react-native";

import ExpensesOutput from "@src/components/ExpensesOutput";
import { AppContext } from "@src/store/context";
import { fetchExpense } from "@src/util/http";
import { ExpensesData } from "@src/ts/interface";

type Props = {};

const RecentExpenses = (props: Props) => {
  const {
    state: { expenses },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpense();
      dispatch({ type: "SYNC_EXPENSE", payload: expenses });
    }
    getExpenses();
  }, []);

  return (
    <ExpensesOutput
      fallBackText="No expense registered for last 7 Days"
      expenses={expenses}
      expensesPeriod="Last 7 Days"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
