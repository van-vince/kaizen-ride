import React, {useContext} from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'
import { AuthContext } from "../context/contexts";
import { AuthStack } from "./AuthStack";
import OrderPopup from '../components/orderPopup'


const RootNavigator = () => {

  const {isLoading, userToken} = useContext(AuthContext)

  if (isLoading)
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} />
    </View>
  );


  return (
   < NavigationContainer>
     {userToken ?  <TabNavigator/> : <AuthStack />}
   </ NavigationContainer>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})