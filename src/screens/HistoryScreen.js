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

export default function HistoryScreen({ navigation }) {

  const [isLoading, setIsLoading] = useState(false);


  const { orders } = useContext(OrderContext);
  const order = orders?.orders || []
  // sorting into descending order
  const newOrders = [...order].sort((a, b) => b.id - a.id) || []
  // console.log(newOrders)

  // filtering orders based on status
  const activeOrders = newOrders?.filter((e) => e.status.text === 'Delivered' ||  e.status.text === 'Cancelled')
  // console.log(activeOrders)


  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Text style={{alignItems: 'center', padding:10, textAlign: 'center', fontWeight: 'bold', fontSize:20}}>Delivery History</Text>
      </View>
      <ScrollView>
      {activeOrders?.map((item, index) => (
          <OrderItem
            key={item.id}
            title={item.customerInfo[0].name}
            dropOff={item.customerInfo[0].location}
            subTitle={item.createdAt.replace("T", "  ").substring(0, 17)}
            photo={require("../../assets/package33.png")}
            onPress={() => {
              navigation.navigate("DeliveryStatusScreen", { key: item._id });
            }}
          />
        ))}
      </ScrollView>
      <StatusBar style="light" backgroundColor="#FF8C00" translucent={true} />
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "fffff",
    paddingBottom: 30,
    paddingTop: getStatusBarHeight(),
  },
});
