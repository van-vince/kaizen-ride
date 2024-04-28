import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { colors } from "../global/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { navigate } from "../navigation/OutNavigation";

const ConfirmPickupPopup = ({ onPress, visible, close, }) => {
  return (
    <View style={styles.centeredView}>
      <Modal visible={visible} animationType="fade" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="close"
              size={30}
              style={{ position: "absolute", right: 10, top: 10,}}
              onPress={close}
            />
            <View style={{  alignItems: "center",paddingVertical:20 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 40,
                  fontWeight: "bold",
                  paddingBottom: 10,
                }}
              >
                3454
              </Text>
              <MaterialCommunityIcons
                name="arrow-collapse-all"
                size={40}
                color={colors.grey2}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                width: "90%",
                paddingVertical: 20,
              }}
            >
              <Ionicons
                name="storefront-outline"
                color={colors.grey1}
                size={25}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: colors.grey2,
                  textAlign: "center",
                }}
              >
                Graceland Shito
              </Text>
            </View>
            <View
              style={{
                backgroundColor: colors.grey5,
                paddingVertical: 20,
                paddingHorizontal: 5,
                textAlign: "left",
                borderRadius: 5,
                marginVertical: 20,
              }}
            >
              <Text> Adoem public toilet, teshie adoemli accra, Ghana</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                width: "90%",
                paddingVertical: 20,
              }}
            >
              <Ionicons name="person-outline" color={colors.grey1} size={25} />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Gabriel Ansah
              </Text>
            </View>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                padding: 15,
                marginVertical: 20,
                marginHorizontal: 20,
                backgroundColor: "black",
              }}
              // onPress={() => navigation.navigate("ConfirmPickupScreen")}
              onPress={() => navigate('ToDropoffScreen')}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Confirm Pick-up
              </Text>
            </TouchableOpacity>
            <View>
              <Text>Payment Details</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmPickupPopup;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
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
