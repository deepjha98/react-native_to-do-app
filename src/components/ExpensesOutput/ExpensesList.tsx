import { FlatList, Text } from "react-native";

import { ExpensesData } from "@src/ts/interface";
import ExpenseItem from "./ExpenseItem";

type Props = { expenses: ExpensesData[] };

const ExpensesList = ({ expenses }: Props) => {
  const renderExpenseItem = ({ item }: { item: ExpensesData }) => (
    <ExpenseItem {...item} />
  );

  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
