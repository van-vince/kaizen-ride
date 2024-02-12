import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/authScreens/SignInScreen";
import ForgotPassword from "../screens/authScreens/forgotPassword";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}
