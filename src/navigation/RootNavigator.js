import React, {useContext, useEffect, useState, useRef} from 'react'
import { ActivityIndicator, StyleSheet, Text, View, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'
import { AuthContext, OrderContext } from "../context/contexts";
import { AuthStack } from "./AuthStack";
import OrderPopup from '../components/orderPopup'
import  axios from "axios";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { io } from "socket.io-client";
import { navigationRef, navigate } from './OutNavigation';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const RootNavigator = () => {
  const {isLoading, userToken} = useContext(AuthContext)

  if (isLoading)
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} />
    </View>
  );

  const [modalVisible, setModalVisible] = useState(true);
  const [newOrder, setNewOder] = useState('');
  const [currentOrders, setCurrentOrders] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const socket = useRef();

  const { userInfo } = useContext(AuthContext);
  const courier = userInfo?.courier
  const id = courier?._id;
  // console.log('orders', currentOrders)

  const { dispatchOrders } = useContext(OrderContext);

  const orders = async () => {
    await axios
      .get(`${apiUrl}/couriers/${id}`)
      .then(async (res) => {
        // console.log(res.data)
        setCurrentOrders(res.data.allOrders);
        dispatchOrders({ type: "ADD_ORDERS", payload: { orders: res.data.allOrders } });
      })
      .catch((err) => {
        console.log('orders', err);
      });
  };

  useEffect(() => {
  orders()
  }, [currentOrders])
  

  // Expo notifications
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification?.request?.content.data);
      // console.log( 'note', notification?.request?.content.data)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      setNotification(notification);
      // console.log(response);
    });

    return () => {
      if(notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if(responseListener.current){
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

const registerPushToken = async ()=> {
  if (expoPushToken) {
    await axios
      .patch(`${apiUrl}/couriers/${id}`,
      {expoPushToken}
      )
      .then(async (res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log("Pushtoken", err);
      });
  }
  return
}
  
  useEffect(() => {
  registerPushToken()
  }, [expoPushToken])


  // Connect to Socket.io
  // const socket = io();
  // const [message, setMessage] = useState()

  // socket.current = io('https://e457-102-176-65-192.ngrok-free.app');
    
  // useEffect(() => {
  //     socket.current.emit("new-user-add", id);
  //     socket.current.on("get-users", (activeUsers) => {
  //       setOnlineUsers(activeUsers);
  //       console.log('socket-users',onlineUsers)
  //     });
  //   }, )
    

  //   socket.current.on('new-order', (data)=> {
  //     setNotification(data)
  //     console.log('message', data)
  //   });



  return (
   < NavigationContainer ref={navigationRef}>
     {userToken ?  <TabNavigator/> : <AuthStack />}
     {notification && (
       <OrderPopup
          onPress={() => {
            !setModalVisible(); 
            setNotification(undefined); 
            navigate("OrderDetailsScreen", {orderDetails: notification}) 
          }}
          visible={modalVisible}
        />
      )}
   </ NavigationContainer>
  )
}


async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data;
    // console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default RootNavigator

const styles = StyleSheet.create({})