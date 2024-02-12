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
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import React, { useState, useRef, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import OrderPopup from "../components/orderPopup";
import { mapStyle } from "../global/mapStyle";
import CustomSwitch from "../components/CustumSwitch";

navigator.geolocation = require("react-native-geolocation-service");
// import { GOOGLE_MAPS_APIKEY } from '@env'

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function OrdersScreen({navigation}) {


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
        option1={'Active orders'}
        option2={'Current location'}
        />
      </View>

      {activeTab === 1 && (

        <ScrollView style={{margin: 10}}>
        
          <Text>Active Orders</Text>

          <Button title="next" onPress={()=> navigation.navigate('OrderDetailsScreen')} /> 
    
        </ScrollView>
      )}

      {activeTab === 2 && (
        <View>
          <MapView
            style={{ height: "100%", width: "100%"}}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fffff",
    paddingBottom: 30,
    paddingTop: getStatusBarHeight(),
  },
});
