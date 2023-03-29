import { useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import IconButton from "@src/components/UI/IconButton";
import { GlobalStyles } from "@src/constants/styles";
import Button from "@src/components/UI/Button";
import { AppContext } from "@src/store/context";

type RootStackParamList = {
  Profile: { expenseId: string | undefined };
};

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ManageExpenses = ({ navigation, route }: Props) => {
  const { dispatch } = useContext(AppContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

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
  const handleConfirm = () => {
    dispatch({
      type: isEditing ? "EDIT_EXPENSE" : "ADD_EXPENSE",
      payload: {
        id: "e1",
        description: "An earphone",
        amount: 1699,
        date: new Date("2022-11-14"),
      },
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Button style={styles.button} mode="flat" onPress={handleCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleConfirm}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: { minWidth: 120, marginHorizontal: 8 },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
