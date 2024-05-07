import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";



const OrderPopup = ({ onPress, visible }) => {
  return (
    <View style={styles.root}>
      <Modal visible={visible} animationType="fade" transparent={true}>
        <View>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: "white",
                marginBottom: 10,
                height: 60,
                width: "100%",
              }}
            >
              <Text
                style={{
                  margin: 10,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                You've got a new order
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "white",
                items: 'center',
                alignItems: "center",
                justifyContent: "center",
                height: 200,
                width: 200,
                marginLeft: '20%',
                borderRadius: 200,
              }}
            >
              <Feather
                type="material-community"
                name="alert-triangle" 
                color='orange'
                size={100}
                onPress={onPress}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onPress}
            >
              <Text style={styles.textStyle}>Tap for details</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderPopup;

const styles = StyleSheet.create({
  root: {
    // position: 'absolute',
    bottom: 0,
    // paddingTop: getStatusBarHeight(),
    width: "100%",
    // padding: 10,
    height: Dimensions.get("window").height,
    justifyContent: "space-between",
    backgroundColor: "#00000010",
    zIndex: 99,
  },
  modalView: {
    backgroundColor: "50C878",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    // padding: 10,
  },
  button: {
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    marginVertical: 50,
    marginHorizontal: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
