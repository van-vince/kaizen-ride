import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useMemo, useRef } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { colors } from '../global/styles';
import moment from "moment";
import { Timeline } from "react-native-just-timeline";
import { OrderContext } from "../context/contexts";

const OrderDetailsScreen = ({ navigation, route }) => {

  const data = [
    // First row in the Timeline
    {
      title: {
        content: "Event One Title",
      },
      description: {
        content: "Event One Description",
      },
      time: {
        content: moment().format("lll"),
      },
    },

    // Second row in the Timeline
    {
      title: {
        content: "Event Two Title",
      },
      description: {
        content: "Event Two Description",
      },
      time: {
        content: moment().format("lll"),
      },
    },

    // You got the idea..
    {
      title: {
        content: "Event Three Title",
      },
      description: {
        content: "Event Three Description",
      },
      time: {
        content: moment().format("lll"),
      },
      icon: {
        content: "pencil",
      },
    },
    {
      title: {
        content: "Event Three Title",
      },
      description: {
        content: "Event Three Description",
      },
      time: {
        content: moment().format("lll"),
      },
      icon: {
        content: "pencil",
      },
    },
    {
      title: {
        content: "Event Three Title",
      },
      description: {
        content: "Event Three Description",
      },
      time: {
        content: moment().format("lll"),
      },
      icon: {
        content: "pencil",
      },
    },
    {
      title: {
        content: "Event Three Title",
      },
      description: {
        content: "Event Three Description",
      },
      time: {
        content: moment().format("lll"),
      },
      icon: {
        content: "pencil",
      },
    },
    {
      title: {
        content: "Event Three Title",
      },
      description: {
        content: "Event Three Description",
      },
      time: {
        content: moment().format("lll"),
      },
      icon: {
        content: "pencil",
      },
    },
  ];


  const { orders } = useContext(OrderContext)
  const order = orders?.orders
  const newOrder = order?.find((e) => e._id === orderId);
  // console.log(newOrder.storeInfo[0])


  return (
    <View style={styles.container}>

      <View style={{marginBottom:20}}>
      <Text style={{alignItems: 'center', padding:10, textAlign: 'center', fontWeight: 'bold', fontSize:20}} >Delivery status</Text>
      </View>

        <Timeline data={data} />

    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    flex: 1,
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: 20
  },
});
