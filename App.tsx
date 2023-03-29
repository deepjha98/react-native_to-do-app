import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ManageExpenses from "@src/screens/ManageExpenses";
import BottomNavigation from "@src/components/BottomNavigation";
import { Screens } from "@src/constants/enums";
import { GlobalStyles } from "@src/constants/styles";
import { AppProvider } from "@src/store/context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={Screens.EXPENSE_OVERVIEW}
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name={Screens.EXPENSE_OVERVIEW}
              component={BottomNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Screens.MANAGE_EXPENSES}
              component={ManageExpenses}
              options={{ presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </>
  );
}

const styles = StyleSheet.create({});
