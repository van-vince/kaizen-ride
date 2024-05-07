import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Alert,
} from "react-native";
import React, {
  useCallback,
  useMemo,
  useRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { colors } from "../global/styles";
import axios from "axios";
import { AuthContext } from "../context/contexts";
import { mapStyle } from "../global/mapStyle";
import { navigate } from "../navigation/OutNavigation";

const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY;

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const OrderDetailsScreen = ({ navigation, route }) => {
  const snapPoints = useMemo(() => ["45%", "75%"], []);
  const handleSheetChange = useCallback((index) => {}, []);
  const bottomSheetRef = useRef();

  const [storeLocation, setStoreLocation] = useState();
  const [customerLocation, setCustomerLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isloading, setIsloading] = useState(false);

  const { userInfo } = useContext(AuthContext);
  const courier = userInfo?.courier;
  const courierId = courier?._id;

  const { orderDetails } = route.params;
  const storeAddress = orderDetails?.pickup;
  const customerAddress = orderDetails?.dropoff;
  const orderId = orderDetails.orderId || "660151b857ae1a9042d2ab1f";
  // console.log(storeLocation)
  // console.log(customerLocation)

  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${storeAddress}&key=${GOOGLE_MAPS_APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setStoreLocation(data?.results[0]?.geometry.location);
      })
      .catch((err) => console.log(err));
  }, [orderDetails]);

  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${customerAddress}&key=${GOOGLE_MAPS_APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setCustomerLocation(data?.results[0]?.geometry.location);
      })
      .catch((err) => console.log(err));
  }, [orderDetails]);

  const acceptOrder = async () => {
    setIsloading(true);
    await axios
      .patch(`${apiUrl}/orders/${orderId}`, {
        updates: {
          id: orderId,
          text: "assign",
          courier: courierId,
        },
      })
      .then(async (res) => {
        // console.log(res.data)
        alert(res.data.message);
        navigation.navigate("TopickupScreen");
      })
      .catch((err) => {
        console.log("acceptOrder", err);
      });
    setIsloading(false);
  };

  const declineOrder = async () => {
    setIsLoading(true);
    await axios
      .patch(`${apiUrl}/orders/${orderId}`, {
        updates: {
          id: orderId,
          reason: "decline",
        },
      })
      .then(async (res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("decline", err);
      });
    setIsLoading(false);
  };

  // Prevent back navigation
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => navigation.navigate("HomeScreen") },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <MapView
          style={{ height: 500 }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          followsUserLocation={true}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: 5.614818,
            longitude: -0.205874,
            latitudeDelta: 0.05,
            longitudeDelta: 0.021,
          }}
        >
          {storeLocation != null && (
            <Marker
              coordinate={{
                latitude: storeLocation?.lat,
                longitude: storeLocation?.lng,
              }}
            >
              <Image
                source={require("../../assets/marker2.png")}
                style={{ height: 50, width: 50 }}
                // resizeMode = 'cover'
              />
            </Marker>
          )}
          {customerLocation != null && (
            <Marker
              coordinate={{
                latitude: customerLocation?.lat,
                longitude: customerLocation?.lng,
              }}
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
            marginBottom: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Total Distance: 24.24km
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              height: 35,
              borderRadius: 10,
              padding: 5,
              width: 80,
            }}
            onPress={() => declineOrder()}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              {(isLoading && <ActivityIndicator size={"small"} />) || "Decline"}{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          style={{
            position: "absolute",
            height: 95,
            top: 50,
            left: 10,
            maxWidth: "auto",
          }}
          source={require("../../assets/dots.png")}
        />
        <View
          style={{
            marginHorizontal: 25,
            height: 120,
            flexDirection: "collumn",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>
              FROM (PICK UP POINT)
            </Text>
            <Text style={{ fontSize: 16, color: colors.grey2 }}>
              {storeAddress}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>
              TO (DROP OFF POINT)
            </Text>
            <Text style={{ fontSize: 16, color: colors.grey2 }}>
              {customerAddress}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            borderRadius: 20,
            padding: 15,
            // elevation: 2,
            marginVertical: 50,
            marginHorizontal: 20,
            backgroundColor: "#2196F3",
          }}
          onPress={() => acceptOrder()}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            Accept and start
          </Text>
          {isloading && <ActivityIndicator size={"small"} />}
        </TouchableOpacity>
      </BottomSheet>
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
  },
});
