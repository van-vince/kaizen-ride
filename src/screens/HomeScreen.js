import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import OrderPopup from "../components/orderPopup";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  // console.log(text)

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={{
            position: "absolute",
            margin: 50,
            textAlign: "center",
            alignItems: "center",
            color:'white',
            fontWeight:'bold',
            fontSize: 45
          }}
        >
          Dispatch {"\n"}on the go!!
        </Text>
        <Image
          style={{
            alignItems: "center",
            justifyContent: "center",
            maxHeight: "100%",
            maxWidth: "100%",
            zIndex: -99,
          }}
          source={require("../../assets/dispth.jpg")}
        />
      </View>

     <TouchableOpacity
     style={{
        backgroundColor:'#7CB9E8',
        position: 'absolute',
        bottom: 50,
        alignItems:'center',
        padding: 15,
        borderRadius: 10,
        width: '60%',
        elevation: 5

     }}
     >
        <Text style={{color: 'white', fontWeight:'bold', fontSize: 20}}>CHECK IN</Text>
     </TouchableOpacity>

      <StatusBar style="light" backgroundColor="#FF8C00" translucent={true} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fffff",
    //   paddingBottom: 30,
    paddingTop: getStatusBarHeight(),
    alignItems: 'center',
    justifyContent: 'center'
  },
});
