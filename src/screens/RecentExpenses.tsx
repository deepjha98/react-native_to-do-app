import ExpensesOutput from "@src/components/ExpensesOutput";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

const RecentExpenses = (props: Props) => {
  return <ExpensesOutput expensesPeriod="Last 7 Days" />;
};

export default RecentExpenses;

const styles = StyleSheet.create({});
