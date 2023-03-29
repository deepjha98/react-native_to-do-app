import { useContext } from "react";

import { StyleSheet, Text, View } from "react-native";

import ExpensesOutput from "@src/components/ExpensesOutput";
import { AppContext } from "@src/store/context";

type Props = {};

const AllExpenses = (props: Props) => {
  const {
    state: { expenses },
  } = useContext(AppContext);

  console.log({ expenses });

  return (
    <ExpensesOutput
      fallBackText="No expense available"
      expenses={expenses}
      expensesPeriod="Total"
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
