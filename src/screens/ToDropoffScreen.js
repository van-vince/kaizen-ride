import { Alert, BackHandler, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { colors } from "../global/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import ConfirmDropoffPopup from "../components/ConfirmDropoffPopup";
import { OrderContext, OrderDetailsContext } from "../context/contexts";
import axios from 'axios';
import { mapStyle } from "../global/mapStyle";
import { navigate } from '../navigation/OutNavigation'
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const ToDropoffScreen = () => {
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const handleSheetChange = useCallback((index) => {}, []);
  const bottomSheetRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [isloading, setIsloading] =  useState(false)

  const [orderDetails, setOrderDetails] = useState()

  useEffect(() => {
    const getData = async() => {
     const data = await AsyncStorage.getItem('orderDetails')
      const details = JSON.parse(data)
      setOrderDetails(details)
    }
    getData()
  }, [])


  const storeAddress = orderDetails?.pickup
  const customerAddress = orderDetails?.dropoff
  const orderId = orderDetails?.orderId
  // console.log(orderDetails)


  const { orders } = useContext(OrderContext)
  const order = orders?.orders
  const newOrder = order?.find((e) => e._id === orderId);
  // console.log(newOrder.storeInfo[0])

  const confirmDropoff = async() => {
    setIsloading(true)
    await axios
    .patch(`${apiUrl}/orders/${orderId}`,
    { updates:{
      id: orderId,
      text: "Delivered",
    }}
    )
    .then(async (res) => {
      console.log(res.data)
      navigate('DeliveryStatusScreen')
    })
    .catch((err) => {
      console.log("delivered", err);
    });
    setIsloading(false)
  }


    // Prevent back navigation
    useEffect(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => navigate('HomeScreen')},
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
  
      return () => backHandler.remove();
    }, []);


  return (
    <View style={styles.container}>
      <ConfirmDropoffPopup
        onPress={confirmDropoff}
        orderId={newOrder?.id}
        customerName={newOrder?.customerInfo[0].name}
        customerAddress={customerAddress}
        isloading={isloading}
        visible={modalVisible}
        close={() => setModalVisible(!modalVisible)}
      />
      <View>
        <MapView
          style={{ height: 700 }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          followsUserLocation={true}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: 5.614818,
            longitude: -0.186964,
            latitudeDelta: 0.05,
            longitudeDelta: 0.021,
          }}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        // index={route.params.state}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <View
          style={{
            marginHorizontal: 25,
            marginBottom: 25,
            flexDirection: "row",
            // justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{fontSize: 16, backgroundColor: 'green', padding:5, borderRadius: 60, width:40, textAlign: 'center', color: 'white', marginRight: 5 }}>
            D
          </Text>
          <Text style={{ color: colors.grey2, fontSize: 16 }}>
            To drop-off point
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
               {customerAddress}
            </Text>
            <Text
              style={{ fontSize: 16,  marginBottom: 20, color: colors.grey2, textAlign: "center" }}
            >
                {customerAddress}
            </Text>
          </View>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: colors.grey5,
              padding: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <Ionicons
              name="person-outline"
              color={colors.grey1}
              size={25}
            />
            <Text
              style={{ fontSize: 16, color: colors.grey2, textAlign: "center" }}
              onPress={() => setModalVisible(true)}
            >
              {newOrder?.customerInfo[0].name}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginHorizontal: 5, fontWeight: "bold" }}>1</Text>
              <Ionicons name="chevron-forward" color={colors.grey1} size={20} />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            padding: 15,
            marginVertical: 20,
            marginHorizontal: 20,
            backgroundColor: "#2196F3",
          }}
          // onPress={() => navigation.navigate("ConfirmDropoffScreen")}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            I have arived at Drop-off point
          </Text>
        </TouchableOpacity>
      </BottomSheet>
    </View>
  );
};

export default ToDropoffScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
  },
});
