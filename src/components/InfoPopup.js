import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { colors } from "../global/styles";
import { AntDesign,  Ionicons, FontAwesome5 } from "@expo/vector-icons";

const InfoPopup = ({ onPress, visible, close, contactStore, contactCustomer }) => {
  return (
    <View style={styles.centeredView}>
      <Modal visible={visible} animationType="fade" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "yellow",
                marginBottom: 30,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ padding: 5, fontWeight: "bold", fontSize: 20 }}>
                Do you heed any help?
              </Text>
              <Ionicons name="close" size={30} style={{}} onPress={close} />
            </View>
            <Text
              style={{
                padding: 5,
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              {" "}
              Order Isues
            </Text>
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: colors.grey5,
                  borderRadius: 5,
                  gap: 10,
                  padding: 10,
                  alignItems: 'center',
                  marginBottom: 10,
                }}
                onPress={contactStore}
              >
                <AntDesign name="home" size={25}/>
                <Text style={{fontSize:16}}>Contact Store</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: colors.grey5,
                  borderRadius: 5,
                  gap: 10,
                  padding: 10,
                  alignItems: 'center',
                  marginBottom: 10,
                }}
                onPress={contactCustomer}
              >
                <Ionicons name="person-outline" size={25}/>
                <Text style={{fontSize:16}}>Contact Customer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: colors.grey5,
                  borderRadius: 5,
                  gap: 10,
                  padding: 10,
                  alignItems: 'center',
                  marginBottom: 10,
                }}
                onPress={() => Linking.openURL('mailto:info@kaizendeliveries.com') }
              >
                <Ionicons name="location-outline" size={25}/>
                <Text style={{fontSize:16}}>Issues at pickup</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: colors.grey5,
                  borderRadius: 5,
                  gap: 10,
                  padding: 10,
                  alignItems: 'center',
                  marginBottom: 10,
                }}
                onPress={() => Linking.openURL('mailto:info@kaizendeliveries.com') }
              >
                <Ionicons name="warning-outline" size={25}/>
                <Text style={{fontSize:16}}>Accident and Offences</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: colors.grey5,
                  borderRadius: 5,
                  gap: 10,
                  padding: 10,
                  alignItems: 'center',
                  marginBottom: 10,
                }}
                onPress={() => Linking.openURL('mailto:info@kaizendeliveries.com') }
              >
                <AntDesign name="swap" size={25}/>
                <Text style={{fontSize:16}}>Reasign Order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: colors.grey5,
                  borderRadius: 5,
                  gap: 10,
                  padding: 10,
                  alignItems: 'center',
                  marginBottom: 10,
                }}
                onPress={() => Linking.openURL('mailto:info@kaizendeliveries.com') }
              >
                <Ionicons name="home-outline" size={25}/>
                <Text style={{fontSize:16}}>Issues at drop-off</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: colors.grey5,
                  borderRadius: 5,
                  gap: 10,
                  padding: 10,
                  alignItems: 'center',
                  marginBottom: 10,
                }}
                onPress={() => Linking.openURL('mailto:info@kaizendeliveries.com') }
              >
                <FontAwesome5 name="app-store" size={25}/>
                <Text style={{fontSize:16}}>App issues</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: colors.grey5,
                  borderRadius: 5,
                  gap: 10,
                  padding: 10,
                  alignItems: 'center',
                  marginBottom: 10,
                }}
                onPress={() => Linking.openURL('mailto:info@kaizendeliveries.com') }
              >
                <Ionicons name="rainy-outline" size={25}/>
                <Text style={{fontSize:16}}>Report bad weather</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InfoPopup;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#00000080",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    width: "90%",
    height: "auto",
    padding: 20,
    // alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
