import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const OrderPopup = ({ newOrder, onAccept, onDecline, duration, distance }) => {
  // const navigation = useNavigation()

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.root}>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
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
  popupContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    height: "90%",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#40B5AD",
    zIndex: 99,
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 10,
    backgroundColor: "#00BFFF",
    height: "100%",
    borderRadius: 10,
    padding: 35,
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
