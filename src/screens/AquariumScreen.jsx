import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { BASE_URL } from "../config";
import ActionButton from "../components/ActionButton";

export default function Aquarium({navigation, route}){

    const {aquarium} = route.params;

    const startMonitoring = async (aquariumId) => {
        const response = await fetch(`${BASE_URL}/api/aquarium/${aquariumId}/start-device`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        
        const json = await response.json();
    }

    const mockStartMonitoring = () =>{

    }

    return(
        <View style={styles.container}>
            <Text>Aquarium: {aquarium.name}</Text>
            <Text>Id: {aquarium._id}</Text>
            <FlatList 
                data={aquarium}
                keyExtractor={(aquarium) => aquarium._id.toString()}
                renderItem={renderItem}>
            </FlatList>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});