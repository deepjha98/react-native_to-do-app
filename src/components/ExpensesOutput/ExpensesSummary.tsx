import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { GlobalStyles } from "@src/constants/styles";
import { ExpensesData } from "@src/ts/interface";

type Props = { expenses: ExpensesData[]; timePeriod: string };

const ExpensesSummary = ({ expenses, timePeriod }: Props) => {
  const expensesTotal = expenses.reduce(
    (accumulator: number, current: ExpensesData) =>
      (accumulator += current.amount),
    0
  );
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{timePeriod}</Text>
      <Text style={styles.sum}>₹{expensesTotal.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
