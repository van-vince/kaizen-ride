import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import OrderStatusScreen from '../screens/DeliveryStatusScreen';
import TopickupScreen from '../screens/TopickupScreen';
import ToDropoffScreen from '../screens/ToDropoffScreen';
import DeliveryStatusScreen from '../screens/DeliveryStatusScreen';


const Stack = createNativeStackNavigator();

export function HomeStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name = 'HomeScreen'
                component = {HomeScreen}
                options = {{headerShown:false}}
            />
            <Stack.Screen 
                name = 'OrderDetailsScreen'
                component = {OrderDetailsScreen}
                options = {{headerShown:false}}
            />
            <Stack.Screen 
                name = 'OrderStatusScreen'
                component = {OrderStatusScreen}
                options = {{headerShown:false}}
            />
            <Stack.Screen 
                name = 'TopickupScreen'
                component = {TopickupScreen}
                options = {{headerShown:false}}
            />
            <Stack.Screen 
                name = 'ToDropoffScreen'
                component = {ToDropoffScreen}
                options = {{headerShown:false}}
            />
            <Stack.Screen 
                name = 'DeliveryStatusScreen'
                component = {DeliveryStatusScreen}
                options = {{headerShown:false}}
            />
        </Stack.Navigator>
    )
}