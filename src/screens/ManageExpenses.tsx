import { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import IconButton from "@src/components/UI/IconButton";
import { GlobalStyles } from "@src/constants/styles";
import { AppContext } from "@src/store/context";
import { deleteExpense, storeExpense, updateExpense } from "@src/util/http";
import ExpenseForm from "@src/components/ManageExpense/ExpenseForm";
import LoadingOverlay from "@src/components/UI/LoadingOverlay";

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

  const [isLoading, setIsLoading] = useState<Boolean>(false);

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
  const handleDelete = async () => {
    setIsLoading(true);
    await deleteExpense(editedExpenseId!)
      .then((response) => {
        console.log({ response });
        dispatch({
          type: "REMOVE_EXPENSE",
          payload: {
            id: editedExpenseId,
          },
        });

        navigation.goBack();
      })
      .catch((error) => {
        console.error({ error });
      });
    setIsLoading(false);
  };

  // Handle cancel
  const handleCancel = () => {
    navigation.goBack();
  };

  // handle confirm
  const handleConfirm = async (formData: {
    description: string;
    amount: number;
    date: Date;
  }) => {
    setIsLoading(true);
    if (isEditing) {
      await updateExpense(editedExpenseId, formData)
        .then(() => {
          dispatch({
            type: "EDIT_EXPENSE",
            payload: {
              id: editedExpenseId,
              ...formData,
            },
          });
          navigation.goBack();
        })
        .catch((error) => {
          console.error({ error });
        });
    } else {
      await storeExpense(formData)
        .then(({ data }) => {
          dispatch({
            type: isEditing ? "EDIT_EXPENSE" : "ADD_EXPENSE",
            payload: { id: data.name, ...formData },
          });
          navigation.goBack();
        })
        .catch((error) => {
          console.error({ error });
        });
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingOverlay />
      ) : (
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
      )}
    </>
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
