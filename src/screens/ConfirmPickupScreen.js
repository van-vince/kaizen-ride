import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { colors } from "../global/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

const ConfirmPickupScreen = ({ navigation, route }) => {


  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 20, alignItems:'center', justifyContent:'center', paddingTop:10}}>
        <Text style={{fontSize:50, fontWeight:'bold'}}>Confirm pick-up</Text>
      </View>
    </View>
  );
};

export default ConfirmPickupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
  },
});
