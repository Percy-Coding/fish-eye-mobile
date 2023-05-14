import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from  '../../screens/LoginScreen';
import HomeScreen from '../../screens/HomeScreen';
import NavigationWrapper from "./NavigationWrapper";

const Stack = createNativeStackNavigator();

const Navigation = () =>{
    return(
        <NavigationWrapper>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        </NavigationWrapper>
    );  
};


export default Navigation;