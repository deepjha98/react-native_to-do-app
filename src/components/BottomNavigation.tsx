import { StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RecentExpenses from "@src/screens/RecentExpenses";
import AllExpenses from "@src/screens/AllExpenses";
import { GlobalStyles } from "@src/constants/styles";
import IconButton from "@src/components/UI/IconButton";
import { Screens } from "@src/constants/enums";

const BottomTabs = createBottomTabNavigator();

type Props = {};

const BottomNavigation = (props: NativeStackScreenProps<any>) => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate(Screens.MANAGE_EXPENSES);
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name={Screens.RECENT_EXPENSES}
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent Expenses",
          tabBarIcon: (color: string, size: number) => (
            <MaterialCommunityIcons name="hours-24" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name={Screens.ALL_EXPENSES}
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: (color: string, size: number) => (
            <Feather name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
