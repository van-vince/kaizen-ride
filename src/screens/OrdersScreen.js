import {
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import React, { useState, useRef, useEffect, useContext } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import CustomSwitch from "../components/CustumSwitch";
import { OrderContext } from "../context/contexts";
import OrderItem from "../components/OrderItems";
import * as Notifications from "expo-notifications";

navigator.geolocation = require("react-native-geolocation-service");
// import { GOOGLE_MAPS_APIKEY } from '@env'

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function OrdersScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const { orders } = useContext(OrderContext);
  const order = orders?.orders || [];
  // sorting into descending order
  const newOrders = [...order].sort((a, b) => b.id - a.id) || [];
  // console.log(newOrders)

  // filtering orders based on status
  const activeOrders = newOrders?.filter(
    (e) =>
      e.status.text === "pending" ||
      e.status.text === "Assigned" ||
      e.status.text === "On the way"
  );
  // console.log(activeOrders)
  

  const [activeTab, setActiveTab] = useState(1);

  const onSelectSwitch = (value) => {
    setActiveTab(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <CustomSwitch
          selectionMode={1}
          onSelectSwitch={onSelectSwitch}
          option1={"Active orders"}
          option2={"Current location"}
        />
      </View>

      {activeTab === 1 && (
        <SafeAreaView>
          <View style={{}}></View>
          <ScrollView
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={() => onRefresh()}
          //   />
          // }
          >
            {activeOrders?.map((item, index) => {
              // const pending = item?.status.text === "Pending"
              const assigned = item?.status.text === "Assigned"
              const onTheWay = item?.status.text === "On the way"
              const delivered = item?.status.text === "Delivered"

              return (
              <OrderItem
                key={item.id}
                title={item.customerInfo[0].name}
                dropOff={item.customerInfo[0].location}
                subTitle={item.createdAt.replace("T", "  ").substring(0, 17)}
                photo={require("../../assets/package33.png")}
                onPress={() => {
                     assigned
                    ? navigation.navigate("TopickupScreen", {key: item._id, orderNo: item.id})
                    : onTheWay
                    ? navigation.navigate("ToDropoffScreen", {key: item._id, orderNo: item.id})
                    : delivered
                    ? navigation.navigate("DeliveryStatusScreen", {key: item._id, orderNo: item.id})
                    : navigation.navigate("DeliveryStatusScreen", {key: item._id, orderNo: item.id});
                }}
              />
              )})}
            {isLoading && <ActivityIndicator size={"large"} />}
            <Button
              title="Press to schedule a notification"
              onPress={async () => {
                await schedulePushNotification();
              }}
            />
          </ScrollView>
        </SafeAreaView>
      )}

      {activeTab === 2 && (
        <View>
          <MapView
            style={{ height: "100%", width: "100%" }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            followsUserLocation={true}
            // customMapStyle={mapStyle}
            initialRegion={{
              latitude: 5.614818,
              longitude: -0.186964,
              latitudeDelta: 0.05,
              longitudeDelta: 0.021,
            }}
          />
        </View>
      )}
      <StatusBar style="light" backgroundColor="#FF8C00" translucent={true} />
    </SafeAreaView>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got order! 📬",
      body: "order detalils will be shown here",
      sound: "call-to-attention.mp3",
      data: { data: { name: "vincent", sur: "amanor" } },
    },
    trigger: null,
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fffff",
    paddingBottom: 30,
    paddingTop: getStatusBarHeight(),
  },
});


// onPress={() => {
//   item?.status.text === "pending"
//     ? navigation.navigate("OrderDetailsScreen")
//     : item?.status.text === "Asigned"
//     ? navigation.navigate("TopickupScreen")
//     : item?.status.text === "One the way"
//     ? navigation.navigate("ToDropoffScreen")
//     : navigation.navigate("OrderStatusScreen");
// }}