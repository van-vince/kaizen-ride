import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { colors } from "../global/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

const TopickupScreen = ({ navigation, route }) => {
  const snapPoints = useMemo(() => ["45%", "75%"], []);
  const handleSheetChange = useCallback((index) => {}, []);
  const bottomSheetRef = useRef();

  return (
    <View style={styles.container}>
      <View>
        <MapView
          style={{ height: 500 }}
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
                marginBottom: 5,
              }}
            >
              Madina zongo, Adentan municipal - accra Ghana, adenta 
            </Text>
            <Text
              style={{ fontSize: 16, color: colors.grey2, textAlign: "center" }}
            >
               Madina zongo, Adentan municipal - accra Ghana, adenta 
            </Text>
          </View>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: colors.grey5,
              padding: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              width: '90%'
            }}
          >
            <Ionicons
              name="storefront-outline"
              color={colors.grey1}
              size={25}
            />
            <Text
              style={{ fontSize: 16, color: colors.grey2, textAlign: "center" }}
            >
              Mawuli Fusaini
            </Text>
            <View style={{ flexDirection: "row"}}>
              <Text style={{marginHorizontal:5, fontWeight:'bold'}}>1</Text>
              <Ionicons name="chevron-forward" color={colors.grey1} size={20} />
            </View>
          </View>
        </View>
        <Pressable
          style={{
            borderRadius: 20,
            padding: 15,
            // elevation: 2,
            marginVertical: 20,
            marginHorizontal: 20,
            backgroundColor: "#2196F3",
          }}
          onPress={() => navigation.navigate("ConfirmPickupScreen")}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            I have arived at drop-off point
          </Text>
        </Pressable>
      </BottomSheet>
    </View>
  );
};

export default TopickupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
  },
});
