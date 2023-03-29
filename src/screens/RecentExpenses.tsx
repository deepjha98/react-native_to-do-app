import { useContext } from "react";

import { StyleSheet, Text, View } from "react-native";

import ExpensesOutput from "@src/components/ExpensesOutput";
import { AppContext } from "@src/store/context";

type Props = {};

const RecentExpenses = (props: Props) => {
  const {
    state: { expenses },
  } = useContext(AppContext);

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
