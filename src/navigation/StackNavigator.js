import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import OrderStatusScreen from '../screens/OrderStatusScreen';
import TopickupScreen from '../screens/TopickupScreen';
import ConfirmPickupScreen from '../components/ConfirmPickupPopup';
import ToDropoffScreen from '../screens/ToDropoffScreen';
import ConfirmDropoffScreen from '../components/ConfirmDropoffPopup';


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


        </Stack.Navigator>
    )
}