import { GlobalStyles } from "@src/constants/styles";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  ViewStyle,
} from "react-native";

type Props = {
  label: string;
  textInputConfig?: TextInputProps;
  style?: ViewStyle;
  invalid: boolean;
};

const Input = ({ label, style, textInputConfig, invalid }: Props) => {
  const inputStyles: any[] = [
    styles.input,
    textInputConfig && textInputConfig.multiline && styles.inputMultiline,
    invalid && styles.invalidText,
  ].filter(Boolean);

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 8,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidText: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
