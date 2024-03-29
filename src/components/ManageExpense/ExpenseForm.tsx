import {
  Alert,
  StyleSheet,
  View,
  Text,
  GestureResponderEvent,
} from "react-native";
import React, { useState, useContext } from "react";

import Button from "@src/components/UI/Button";
import Input from "./Input";
import { GlobalStyles } from "@src/constants/styles";

type Props = {
  submitButtonLabel: string;
  onCancel: (event: GestureResponderEvent) => void;
  onSubmit: Function;
  initialValues?: { amount: string | number; date: Date; description: string };
};

const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  initialValues,
}: Props) => {
  const [form, setForm] = useState<{
    amount: { value: string; isValid: boolean };
    date: { value: string; isValid: boolean };
    description: { value: string; isValid: boolean };
  }>({
    amount: { value: initialValues?.amount?.toString() || "", isValid: true },
    date: {
      value: initialValues?.date?.toISOString().slice(0, 10) || "",
      isValid: true,
    },
    description: { value: initialValues?.description || "", isValid: true },
  });

  // handle confirm

  const handleConfirm = () => {
    const expenseData = {
      amount: +form.amount.value,
      date: new Date(form.date.value),
      description: form.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const hasDescription = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !hasDescription) {
      setForm((prevState) => {
        return {
          amount: {
            value: prevState.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: prevState.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: prevState.description.value,
            isValid: hasDescription,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  };

  const handleFormChange = (inputIdentifier: string, value: string) => {
    setForm((prevValue) => {
      return { ...prevValue, [inputIdentifier]: { value, isValid: true } };
    });
  };

  const formIsInvalid =
    !form.amount.isValid || !form.date.isValid || !form.description.isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Your Expense</Text>
      <View style={styles.inputGroup}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!form.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            // @ts-ignore
            onChangeText: handleFormChange.bind(this, "amount"),
            value: form.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!form.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: handleFormChange.bind(this, "date"),
            value: form.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!form.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: handleFormChange.bind(this, "description"),
          value: form.description.value,
        }}
      />

      {formIsInvalid && <Text style={styles.errorText}>Input is invalid</Text>}
      <View style={styles.buttonGroup}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleConfirm}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: { minWidth: 120, marginHorizontal: 8 },
  rowInput: {
    flex: 1,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 18,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    marginLeft: 4,
  },
});
