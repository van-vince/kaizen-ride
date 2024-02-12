import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import RootNavigator from "./src/navigation/RootNavigator";
import OrderPopup from "./src/components/orderPopup";
import { useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AuthProvider } from "./src/context/contexts";

export default function App() {


  // const [newOrder, setNewOder] = useState(false)
  
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
        <RootNavigator />
        </AuthProvider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
