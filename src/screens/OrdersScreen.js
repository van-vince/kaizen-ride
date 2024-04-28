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
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import OrderPopup from "../components/orderPopup";
import { mapStyle } from "../global/mapStyle";
import CustomSwitch from "../components/CustumSwitch";
import { AuthContext, OrderContext } from "../context/contexts";
import axios from "axios";
import OrderItem from "../components/OrderItems";
import * as Notifications from 'expo-notifications';

navigator.geolocation = require("react-native-geolocation-service");
// import { GOOGLE_MAPS_APIKEY } from '@env'

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function OrdersScreen({ navigation }) {

  const [isLoading, setIsLoading] = useState(false);


  // const { userInfo } = useContext(AuthContext);
  // const courier = userInfo?.courier;
  // console.log(courier)
  // const id = courier?._id;

  const { orders } = useContext(OrderContext);
  const order = orders?.orders || []
  // console.log(order)
  const newOrders = [...order].sort((a, b) => b.id - a.id) || []
  // console.log(newOrders)

  

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
          <View style={{}}>
            {/* <CustomSwitch
            selectionMode={1}
            option1={"Active Orders"}
            option2={"Completed Orders"}
            onSelectSwitch={onSelectSwitch}
          /> */}
          </View>
          <ScrollView
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refreshing}
            //     onRefresh={() => onRefresh()}
            //   />
            // }
          >
            {/* {activeTab === 1 && */}
            {newOrders?.map((item, index) => (
              <OrderItem
                key={item.id}
                title={item.customerInfo[0].name}
                dropOff={item.customerInfo[0].location}
                subTitle={item.createdAt.replace("T", "  ").substring(0, 17)}
                // photo={require("../../../assets/package3.png")}
                onPress={() => {
                  navigation.navigate("DetailsScreen", { id: item._id });
                }}
              />
            ))}
            {isLoading && <ActivityIndicator size={"large"} />}
            {/* {activeTab === 2 && <Text>Completed Orders</Text>} */}
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
      body: 'order detalils will be shown here',
      sound: 'call-to-attention.mp3',
      data: { data: {name: 'vincent', sur: 'amanor'}},
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
