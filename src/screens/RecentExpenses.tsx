import { useContext, useEffect, useState } from "react";

import { StyleSheet } from "react-native";

import ExpensesOutput from "@src/components/ExpensesOutput";
import { AppContext } from "@src/store/context";
import { fetchExpense } from "@src/util/http";
import LoadingOverlay from "@src/components/UI/LoadingOverlay";

type Props = {};

const RecentExpenses = (props: Props) => {
  const [isFetching, setIsFetching] = useState<Boolean>(false);

  const {
    state: { expenses },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpense();
      dispatch({ type: "SYNC_EXPENSE", payload: expenses });
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  return (
    <>
      {isFetching ? (
        <LoadingOverlay />
      ) : (
        <ExpensesOutput
          fallBackText="No expense registered for last 7 Days"
          expenses={expenses}
          expensesPeriod="Last 7 Days"
        />
      )}
    </>
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
