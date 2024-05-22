import { StyleSheet, Text, View } from "react-native";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Timeline } from "react-native-just-timeline";
import { OrderContext } from "../context/contexts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderDetailsScreen = ({route }) => {
  const [orderDetails, setOrderDetails] = useState();

  const keys = route.params;
  const key = keys.key
  // console.log(key)

  useEffect(() => {
    const getData = async () => {
      const data = await AsyncStorage.getItem(`${key}`);
      const details = JSON.parse(data);
      setOrderDetails(details);
    };
    getData();
  }, []);

  const orderId = orderDetails?.orderId || key;
  // console.log(orderDetails)

  const { orders } = useContext(OrderContext);
  const order = orders?.orders;
  const newOrder = order?.find((e) => e._id === orderId);
  const newData = newOrder?.events[0].events

  const data = [];
    newData?.map((items) =>
      data.push({
        title: {content: `${items?.status}`},
        description: {content:`${items?.desc || "Events description"}`},
        time: {content: `${items?.date?.replace("T", "  ").substring(0, 17)}` },
      })
    );


  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            alignItems: "center",
            padding: 10,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
            backgroundColor:'white',
            width: '100%'
          }}
        >
          Delivery status
        </Text>
      </View>
      <Timeline data={data} style={{paddingHorizontal: 20}}/>
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
