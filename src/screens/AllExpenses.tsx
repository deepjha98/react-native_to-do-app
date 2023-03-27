import { StyleSheet, Text, View } from "react-native";

import ExpensesOutput from "@src/components/ExpensesOutput";

type Props = {};

const AllExpenses = (props: Props) => {
  return <ExpensesOutput expensesPeriod="Total" />;
};

export default AllExpenses;

const styles = StyleSheet.create({});
