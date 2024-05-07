import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OrdersScreen from '../screens/OrdersScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "react-native-vector-icons/Entypo";
import { HomeStack } from './StackNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'red',
      tabBarShowLabel: true,
      headerShown:false,
      tabBarStyle: {backgroundColor: '#FF8C00', borderTopLeftRadius: 15, borderTopRightRadius: 15 },
      tabBarInactiveTintColor: 'white'
    }}
    >
    <Tab.Screen 
      name="HomeStack" 
      component={HomeStack} 
      options = {{
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen 
      name="Orders" 
      component={OrdersScreen}
      options = {{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="cart-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen 
      name="History" 
      component={HistoryScreen} 
      options = {{
        tabBarIcon: ({ color, size }) => (
          <Octicons name="history" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options = {{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" color={color} size={size} />
        ),
      }}
      />
    <Tab.Screen 
      name="Settings" 
      component={SettingsScreen}
      options = {{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})