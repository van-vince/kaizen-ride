import { Alert, BackHandler, Image, Linking, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import MapView, {Marker, PROVIDER_GOOGLE } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { colors } from "../global/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import ConfirmDropoffPopup from "../components/ConfirmDropoffPopup";
import { OrderContext, OrderDetailsContext } from "../context/contexts";
import axios from 'axios';
import { mapStyle } from "../global/mapStyle";
import { navigate } from '../navigation/OutNavigation'
import AsyncStorage from "@react-native-async-storage/async-storage";
import InfoPopup from "../components/InfoPopup";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const ToDropoffScreen = ({route}) => {
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const handleSheetChange = useCallback((index) => {}, []);
  const bottomSheetRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [isloading, setIsloading] =  useState(false)

  const [orderDetails, setOrderDetails] = useState()
  const [locations, setLocations] = useState()

  const params = route.params
  const key = params.key
  const orderNo = params.orderNo
  // console.log(orderNo)

  useEffect(() => {
    const getData = async() => {
     const data = await AsyncStorage.getItem(`${key}`)
      const details = JSON.parse(data)
      setOrderDetails(details)
      const locationData = await AsyncStorage.getItem(`${orderNo}`)
      const location = JSON.parse(locationData)
      setLocations(location)
    }
    getData()
  }, [])


  const storeAddress = orderDetails?.pickup
  const customerAddress = orderDetails?.dropoff
  const orderId = orderDetails?.orderId
  // console.log(orderDetails)


  const { orders } = useContext(OrderContext)
  const order = orders?.orders
  const newOrder = order?.find((e) => e._id === `${orderId}`);
  // console.log(newOrder.storeInfo[0])
  const storeNo = newOrder?.storeInfo[0].contact
  const customerNo = newOrder?.customerInfo[0].contact


  dialCall = (number) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };


    // open navigation in google maps
    function openMap() {
      if(Platform.OS === 'ios'){
        Linking.openURL(`maps://app?saddr=${locations[1]?.lat}+${locations[1]?.lng}&daddr=${parseFloat(locations[1]?.lat)}+${parseFloat(locations[1]?.lng)}`)
      } else{
       Linking.openURL(`google.navigation:q=${parseFloat(locations[1]?.lat)}+${parseFloat(locations[1]?.lng)}`)
    }
  
  }


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
      // await AsyncStorage.removeItem(`${key}`)
      navigate('DeliveryStatusScreen', {key: orderId})
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
      <InfoPopup
      visible={infoModalVisible}
      contactStore={() => dialCall(storeNo)}
      contactCustomer={() => dialCall(customerNo)}
      close={() => setInfoModalVisible(!infoModalVisible)}
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
        >
         {locations != null && (
            <Marker
              coordinate={{
                latitude: locations[1]?.lat,
                longitude: locations[1]?.lng,
              }}
              title="Store location"
            >
              <Image
                source={require("../../assets/maeker.png")}
                style={{ height: 50, width: 50 }}
                // resizeMode = 'cover'
              />
            </Marker>
          )}
        </MapView>
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
            width: 'auto'
          }}
        >
          <Text style={{fontSize: 16, backgroundColor: '#FFBF00', padding:5, borderRadius: 60, width:40, textAlign: 'center', color: 'white', marginRight: 5 }}>
            B
          </Text>
          <Text style={{ color: colors.grey2, fontSize: 16 }}>
            To drop-off point
          </Text>
          <Ionicons
              name="ellipsis-vertical"
              color={colors.grey1}
              size={30}
              style={{right:0, position: 'absolute'}}
              onPress={() => setInfoModalVisible(true)}
            />
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
          <Pressable
            style={{
              borderRadius: 20,
              backgroundColor: colors.grey5,
              padding: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
            }}
            onPress={() => openMap()}
          >
            <Ionicons
              name="person-outline"
              color={colors.grey1}
              size={25}
            />
            <Text
              style={{ fontSize: 16, color: colors.grey2, textAlign: "center" }}
            
            >
              {newOrder?.customerInfo[0].name}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginHorizontal: 5, fontWeight: "bold" }}>1</Text>
              <Ionicons name="chevron-forward" color={colors.grey1} size={20} />
            </View>
          </Pressable>
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
