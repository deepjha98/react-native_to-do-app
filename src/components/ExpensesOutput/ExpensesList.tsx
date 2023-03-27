import { FlatList, Text } from "react-native";

import { ExpensesData } from "@src/ts/interface";
import React from "react";

type Props = { expenses: ExpensesData[] };

const ExpensesList = ({ expenses }: Props) => {
  const renderExpenseItem = ({ item }: { item: ExpensesData }) => (
    <Text>{item.description}</Text>
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
