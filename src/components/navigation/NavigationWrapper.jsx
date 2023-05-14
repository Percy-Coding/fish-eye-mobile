import React from "react";
import {StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from "../../config";

const Stack = createNativeStackNavigator();

const NavigationWrapper = ({children }) =>{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{contentStyle: styles.wrapperContainer}}>
                {children}
            </Stack.Navigator>
        </NavigationContainer>
    );  
};

const styles = StyleSheet.create({
    wrapperContainer:{
        flex: 1,
        backgroundColor: colors.secondary
    }
});


export default NavigationWrapper;