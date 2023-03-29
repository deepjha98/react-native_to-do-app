import { FlatList, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "@src/constants/styles";
import { ExpensesData } from "@src/ts/interface";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

type Props = {
  expenses: ExpensesData[];
  expensesPeriod: string;
  fallBackText: string;
};

const ExpensesOutput = ({ expenses, expensesPeriod, fallBackText }: Props) => {
  const Content = <Text style={styles.infoText}>{fallBackText}</Text>;
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} timePeriod={expensesPeriod} />

      {expenses.length > 0 ? <ExpensesList expenses={expenses} /> : Content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
