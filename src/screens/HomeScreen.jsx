import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { BASE_URL } from "../config";
import LoginButton from "../components/LoginButton";

export default function Home({navigation, route}){

    const [aquariums, setAquariums] = useState([]);
    const {userId} = route.params;

    const getAquariums = async () =>{
        const response = await fetch(`${BASE_URL}/api/aquariums/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        
        const json = await response.json();
        setAquariums(json.aquariums);
    }

    const startMonitoring = async (aquariumId) => {
        const response = await fetch(`${BASE_URL}/api/aquarium/${aquariumId}/start-device`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        
        const json = await response.json();
        alert(json);
    }

    const renderItem = ({item, index}) =>{
        return(
            <View style={styles.aquariumContainer}>
                <Text>{item.name}</Text>
                <Text>{item.active ? "activated" : "disconnected"}</Text>
                <LoginButton onPress={()=>startMonitoring(item._id)} title="startMonitoring"></LoginButton>
            </View>
        );
    }
     
    return(
        <View style={styles.container}>
            <Text>UserId: {userId}</Text>
            <FlatList 
                data={aquariums}
                keyExtractor={(aquarium) => aquarium._id.toString()}
                renderItem={renderItem}>
            </FlatList>
            <LoginButton onPress={getAquariums} title="getAquariums"></LoginButton>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 100,
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    aquariumContainer: {
        marginTop: 100,
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#101010',
        borderWidth: 3,
        padding: 10,
        borderRadius: 15
    }
});