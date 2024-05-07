import { StyleSheet } from "react-native";
import RootNavigator from "./src/navigation/RootNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider,OrderContextProvider, OrderDetailsContextProvider } from "./src/context/contexts";



export default function App() {

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <OrderContextProvider >
            <OrderDetailsContextProvider>
              <RootNavigator />
            </OrderDetailsContextProvider>
          </OrderContextProvider>
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
