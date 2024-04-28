import { Image, Pressable, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useCallback, useMemo, useRef, useContext, useEffect, useState } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { colors } from '../global/styles';
import axios from 'axios';
import { AuthContext } from '../context/contexts';

const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY;

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const OrderDetailsScreen = ({navigation, route}) => {

  const snapPoints = useMemo(() => [ "45%", "75%"], []);
  const handleSheetChange = useCallback((index) => {}, []);
  const bottomSheetRef = useRef();

  const [storeLocation, setStoreLocation] = useState()
  const [customerLocation, setCustomerLocation] = useState()
  const [isLoading, setIsLoading] =  useState(false)
  const [isloading, setIsloading] =  useState(false)

  const {orderDetails } = route.params
  // console.log(locations)

  const storeAddress = orderDetails?.pickup
  const customerAddress = orderDetails?.dropoff
  const id = orderDetails.orderId || '660151b857ae1a9042d2ab1f'
  console.log(storeLocation)
  console.log(customerLocation)

    useEffect(()=> {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${storeAddress}&key=${GOOGLE_MAPS_APIKEY}`, 
          ).then(res => res.json())
          .then(data => {
          // console.log(data)
          setStoreLocation(data?.results[0]?.geometry.location)
          }).catch((err)=> console.log(err))
     },[orderDetails])

  useEffect(()=> {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${customerAddress}&key=${GOOGLE_MAPS_APIKEY}`, 
          ).then(res => res.json())
          .then(data => {
          // console.log(data)
          setCustomerLocation(data?.results[0]?.geometry.location)
          }).catch((err)=> console.log(err))
    },[orderDetails])


  const acceptOrder = async() => {
    setIsloading(true)
    await axios
    .patch(`${apiUrl}/orders/${id}`,
    { updates:{
      id: id,
      text: "accepted",
    }}
    )
    .then(async (res) => {
      console.log(res.data)
      navigation.navigate('TopickupScreen')
    })
    .catch((err) => {
      console.log("acceptOrder", err);
    });
    setIsloading(false)
  }

  const declineOrder = async() => {
    setIsLoading(true)
    await axios
    .patch(`${apiUrl}/orders/${id}`,
    {updates:{
      id: id,
      reason: "decline",
    }}
    )
    .then(async (res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log("decline", err);
    });
    setIsLoading(false)
  }


  return (
    <View style={styles.container}>
          <View>
          <MapView
            style={{ height: 500}}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            followsUserLocation={true}
            // customMapStyle={mapStyle}
            initialRegion={{
              ...storeLocation,
              latitudeDelta: 0.05,
              longitudeDelta: 0.021,
            }}
          >
          {storeLocation === null &&
           <MapView.Marker coordinate={{latitude: storeLocation?.lat, longitude: storeLocation?.lng}} >
                <Image
                  source={require("../../assets/marker2.png")}
                  style={{height: 50, width: 50}}
                  // resizeMode = 'cover'
                />
              </MapView.Marker>
          }
          {customerLocation === null &&
              <Marker coordinate={{latitude: customerLocation?.lat, longitude: customerLocation?.lng}} >
                <Image
                  source={require("../../assets/maeker.png")}
                  style={{height: 50, width: 50}}
                  // resizeMode = 'cover'
                />
              </Marker>
          }
          </MapView>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          // index={route.params.state}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
        >
          <View style={{marginHorizontal:25, marginBottom: 15, flexDirection: 'row', justifyContent:"space-between", alignItems:'center'}} >
            <Text style={{fontWeight:'bold', fontSize: 16}}>Total Distance: 24.24km</Text> 
            <TouchableOpacity 
            style={{backgroundColor:'red', height: 35, borderRadius: 10, padding:5, width: 80}}
            onPress={()=> declineOrder()}
            >
              <Text style={{color:'white', textAlign:'center'}}>{isLoading && <ActivityIndicator size={"small"} /> || 'Decline'}  </Text>
            </TouchableOpacity>
          </View>
       
          <Image
          style={{
            position: 'absolute',
            height: 95,
            top: 50,
            left: 10,
            maxWidth: 'auto',
          }}
          source={require("../../assets/dots.png")}
        />
          <View style={{marginHorizontal:25, height: 120, flexDirection: 'collumn', justifyContent: "space-between"}}>
            <View>
             <Text style={{fontWeight:'bold', fontSize: 12}}>FROM (PICK UP POINT)</Text>
             <Text style={{fontSize: 16, color: colors.grey2}}>{orderDetails?.pickup}</Text>
            </View>
            <View>
             <Text style={{fontWeight:'bold',fontSize: 12}}>TO (DROP OFF POINT)</Text>
             <Text style={{fontSize: 16, color: colors.grey2}}>{orderDetails?.dropoff}</Text>
            </View>
          </View>
            <TouchableOpacity
            style={{ 
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderRadius: 20,
              padding: 15,
              // elevation: 2,
              marginVertical: 50,
              marginHorizontal: 20,
              backgroundColor:  "#2196F3"
            }}
            onPress={()=> acceptOrder() }
            >
              <Text style={{color:'white', fontWeight:'bold', textAlign: 'center' }}>Accept and start</Text>
              {isloading && <ActivityIndicator size={"small"} />}
            </TouchableOpacity>
        </BottomSheet>

    </View>
  )
}

export default OrderDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight()
  }
})