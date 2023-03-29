import { FlatList, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "@src/constants/styles";
import { ExpensesData } from "@src/ts/interface";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

type Props = { expenses: ExpensesData[]; expensesPeriod: string };

const DUMMY_EXPENSES = [
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
  {
    id: "e5",
    description: "Bought a book",
    amount: 19,
    date: new Date("2023-03-27"),
  },
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
  {
    id: "e5",
    description: "Bought a book",
    amount: 19,
    date: new Date("2023-03-27"),
  },
];

const ExpensesOutput = ({ expenses, expensesPeriod }: Props) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} timePeriod={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
});
