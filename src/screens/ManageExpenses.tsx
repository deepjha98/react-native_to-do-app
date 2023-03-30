import { useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import IconButton from "@src/components/UI/IconButton";
import { GlobalStyles } from "@src/constants/styles";

import { AppContext } from "@src/store/context";
import ExpenseForm from "@src/components/ManageExpense/ExpenseForm";

type RootStackParamList = {
  Profile: { expenseId: string | undefined };
};

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ManageExpenses = ({ navigation, route }: Props) => {
  const {
    state,
    state: { expenses },
    dispatch,
  } = useContext(AppContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find((expense) => {
    return expense.id === editedExpenseId;
  });

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  // Used to delete an expense
  const handleDelete = () => {
    dispatch({
      type: "REMOVE_EXPENSE",
      payload: {
        id: editedExpenseId,
      },
    });
    navigation.goBack();
  };

  // Handle cancel
  const handleCancel = () => {
    navigation.goBack();
  };

  // handle confirm
  const handleConfirm = (formData: {
    description: string;
    amount: number;
    data: Date;
  }) => {
    if (isEditing) {
      dispatch({
        type: "EDIT_EXPENSE",
        payload: {
          id: editedExpenseId,
          ...formData,
        },
      });
    } else {
      dispatch({
        type: isEditing ? "EDIT_EXPENSE" : "ADD_EXPENSE",
        payload: formData,
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={handleCancel}
        onSubmit={handleConfirm}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        initialValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={24}
            onPress={handleDelete}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
