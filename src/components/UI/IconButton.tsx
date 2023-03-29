import {
  Pressable,
  StyleSheet,
  View,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
  color: string;
  onPress: (event: GestureResponderEvent) => void;
};

const IconButton = ({ icon, size, color, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
