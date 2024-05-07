import React, { createContext, useEffect, useReducer, useState } from "react";
import {
  OriginReducer,
  DestinationReducer,
  TravelTimeReducer,
  OrdersReducer,
  OrderDetailsReducer,
} from "../reducers/reducers";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Alert } from "react-native";

// export const OriginContext = createContext();
// export const DestinationContext = createContext();
// export const TravelTimeContext = createContext();
export const AuthContext = createContext();
export const OrderContext = createContext()
export const OrderDetailsContext = createContext()

// export const OriginContextProvider = (props) => {
//   const [origin, dispatchOrigin] = useReducer(OriginReducer, {
//     latitude: null,
//     longitude: null,
//     address: "",
//     name: "",
//   });
//   return (
//     <OriginContext.Provider value={{ origin, dispatchOrigin }}>
//       {props.children}
//     </OriginContext.Provider>
//   );
// };

// export const DestinationContextProvider = (props) => {
//   const [destination, dispatchDestination] = useReducer(DestinationReducer, {
//     latitude: null,
//     longitude: null,
//     address: "",
//     name: "",
//   });
//   return (
//     <DestinationContext.Provider value={{ destination, dispatchDestination }}>
//       {props.children}
//     </DestinationContext.Provider>
//   );
// };

// export const TravelTimeContextProvider = (props) => {
//   const [travelTime, dispatchTravelTime] = useReducer(TravelTimeReducer, {
//     distance: null,
//     duration: null,
//   });
//   return (
//     <TravelTimeContext.Provider value={{ travelTime, dispatchTravelTime }}>
//       {props.children}
//     </TravelTimeContext.Provider>
//   );
// };

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);


  const forgotPassword = async(email)=> {
    setIsLoading(true);
    console.log(email)
    await axios
    .post(`${apiUrl}/couriers/forget-password`, {
      email
    })
    .then(async (res) => {
      // console.log(res.data);
      if(res?.data.success ===true){
       alert(res.data.message)
      }else{
        alert(res.data?.message)
      }
    })
    .catch((err) => {
      alert(err);
    });
    setIsLoading(false);
  }

  const login = async ( email, password) => {
    setIsLoading(true);
    console.log(email)
    await axios
      .post(`${apiUrl}/couriers/login`, {
        email,
        password,
      })
      .then(async (res) => {
        // console.log(res.data);
        if(res?.data.success ===true){
            let userInfo = res?.data;
            setUserInfo(userInfo);
            // console.log(userInfo)
            setUserToken(userInfo?.courierToken);
            await SecureStore.setItemAsync("userInfo", JSON.stringify(userInfo));
            await SecureStore.setItemAsync("userToken", JSON.stringify(userInfo.courierToken));
        }else{
          alert(res.data?.message)
        }
      })
      .catch((err) => {
        alert(err);
      });

    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    await SecureStore.deleteItemAsync("userInfo");
    await SecureStore.deleteItemAsync("userToken");
    setIsLoading(false);
  };

  const isloggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await SecureStore.getItemAsync("userToken");
      let userInfo = await SecureStore.getItemAsync("userInfo");
       userInfo = JSON.parse(userInfo)
       if(userInfo) {
        setUserToken(userToken)
        setUserInfo(userInfo)
       }
      setIsLoading(false);
    } catch (e) {
      alert(`isLoggedIn error ${e}`);
    }
  };

  useEffect(() => {
    isloggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      login, 
      logout,
      forgotPassword, 
      isLoading, 
      userToken, 
      userInfo 
      }}>

      {children}
    </AuthContext.Provider>
  );
};


export const OrderContextProvider = ({children}) => {
  const [orders, dispatchOrders] = useReducer(OrdersReducer, {
    orders: null,
  });

  return (
    <OrderContext.Provider value={{orders, dispatchOrders}} >
      {children}
    </OrderContext.Provider>
  )
}

export const OrderDetailsContextProvider = ({children}) => {
  const [orderDetails, dispatchOrderDetails] = useReducer(OrderDetailsReducer, {
    orderDetails: null,
  });

  return (
    <OrderDetailsContext.Provider value={{orderDetails, dispatchOrderDetails}} >
      {children}
    </OrderDetailsContext.Provider>
  )
}