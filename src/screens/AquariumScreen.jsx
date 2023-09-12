import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator } from "react-native";
import ActionButton from "../components/ActionButton";
import { getSensorDataByAquariumId, getAquariumById, startMonitoring } from "../api/aquariumAPI";
import ReadingCard from "../components/ReadingCard";    
import {Ionicons} from '@expo/vector-icons';

export default function Aquarium({navigation, route}){

    const { aquarium } = route.params;

    const [aquariumObj, setAquariumObj] = useState(aquarium);
    const [readings, setReadings] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = async () => {
        const responseData = await startMonitoring(aquariumObj._id);
        if(responseData.success){
            setIsLoading(true);
        }
        console.log(responseData.message);
        
    };

    useEffect(() => {
        let interval;

        if (isLoading) {
            interval = setInterval(async () => {
                const responseData = await getAquariumById(aquarium._id);

                if(responseData.success){
                    if (responseData.aquarium.active) {
                        // Stop the loading and clear the interval
                        setAquariumObj(responseData.aquarium);
                        setIsLoading(false);
                        clearInterval(interval);
                    }
                }
            }, 2000);
        }

        return () => {
        // Clean up the interval when the component unmounts
        clearInterval(interval);
        };
    }, [isLoading]);

    const getSensorData = async ()=>{
        const responseData = await getSensorDataByAquariumId(aquarium._id);

        if(responseData.success){
            setReadings(responseData.sensorData);
        }else console.log(responseData.message);
    }

    const renderReading = ({item, index}) =>{
        return(
            <ReadingCard onPress={()=> alert(`LastReadingTime: ${item.timestamp}`)} item={item}></ReadingCard>
        );
    }

    useEffect(() => {
        setTimeout(() => {
            if (aquarium.active){
                startLoading();
            }
        }, 200);
        getSensorData();

        const intervalId = setInterval(getSensorData, 2000);

        return () => {
            clearInterval(intervalId);
          };
    }, [])

    return(
        <View>
            {isLoading ? ( 
            <>
                <ActivityIndicator size="large"/>
                <Text style={{ height: '100%', textAlign: 'center', textAlignVertical: 'center'}}>Loading...</Text> 
            </>
            ) : (
                <View style={styles.container}>
                    {aquariumObj && <>
                        <ActionButton
                        icon={<Ionicons name="arrow-back" size={24} color="white" />}
                        onPress={() => navigation.navigate('Home')}
                        style={{ left: 10}}
                        ></ActionButton>
                        <Text style={styles.headerText}>Aquarium: {aquariumObj.name}</Text>
                        <View style={styles.statusContainer}>
                            <Text style={styles.statusText}>Status: {aquariumObj.active? 'Active': 'Inactive'}</Text>
                            <ActionButton onPress={startLoading} buttonStyles={styles.buttonStatus} title={aquariumObj.active? "Turn Off":" Turn On"}></ActionButton>
                        </View>
                
                        {readings && <>
                            <FlatList 
                            style={styles.flatList}
                            data={readings}
                            numColumns={2}
                            renderItem={renderReading}>
                            </FlatList>
                            </>
                        }
                    </>}
                    <View style={styles.footer}></View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 100,
        alignItems: 'center'
    },
    headerText:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    flatList:{
        height: '70%',
        marginVertical: 20
    },
    statusText:{
        fontSize: 20,
        fontStyle: 'italic',
        textAlign: 'left',
        marginHorizontal: 30
    },
    statusContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        marginVertical: 40
    },
    buttonStatus:{
        marginLeft: 'auto',
        marginHorizontal: 30
    }
});