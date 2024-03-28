import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { colors } from '../global/styles';

const OrderDetailsScreen = ({navigation, route}) => {

  const snapPoints = useMemo(() => [ "45%", "75%"], []);
  const handleSheetChange = useCallback((index) => {}, []);
  const bottomSheetRef = useRef();


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
          <View style={{marginHorizontal:25, marginBottom: 15, flexDirection: 'row', justifyContent:"space-between", alignItems:'center'}} >
            <Text style={{fontWeight:'bold', fontSize: 16}}>Total Distance: 24.24km</Text> 
            <Pressable style={{backgroundColor:'red', height: 35, borderRadius: 10, padding:5}}>
              <Text style={{color:'white'}}>Decline</Text>
            </Pressable>
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
             <Text style={{fontSize: 16, color: colors.grey2}}>Adoem public toilet</Text>
            </View>
            <View>
             <Text style={{fontWeight:'bold',fontSize: 12}}>TO (DROP OFF POINT)</Text>
             <Text style={{fontSize: 16, color: colors.grey2}}>Nunguah secondary school</Text>
            </View>
          </View>
            <Pressable
            style={{ 
              borderRadius: 20,
              padding: 15,
              // elevation: 2,
              marginVertical: 50,
              marginHorizontal: 20,
              backgroundColor:  "#2196F3"
            }}
            onPress={()=> navigation.navigate('TopickupScreen')}
            >
              <Text style={{color:'white', fontWeight:'bold', textAlign: 'center' }}>Accept and start</Text>
            </Pressable>
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