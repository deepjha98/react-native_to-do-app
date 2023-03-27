import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ExpensesData } from "@src/ts/interface";

type Props = { expenses: ExpensesData[]; timePeriod: string };

const ExpensesSummary = ({ expenses, timePeriod }: Props) => {
  const expensesTotal = expenses.reduce(
    (accumulator: number, current: ExpensesData) =>
      (accumulator += +current.amount),
    0
  );
  return (
    <View>
      <Text>{timePeriod}</Text>
      <Text>₹{expensesTotal.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({});
