import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";

const OrderDetailsScreen = ({navigation, route}) => {

  const snapPoints = useMemo(() => [ "45%", "75%"], []);
  const handleSheetChange = useCallback((index) => {}, []);
  const bottomSheetRef = useRef();


  return (
    <View style={styles.container}>
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

        <BottomSheet
          ref={bottomSheetRef}
          // index={route.params.state}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
        >


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