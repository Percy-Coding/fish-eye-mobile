import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { BASE_URL } from "../config";
import ActionButton from "../components/ActionButton";
import AquariumCard from "../components/AquariumCard";

export default function Home({navigation, route}){

    const [index , setIndex] = useState(0);

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
        //alert(json);
    }

    const updateAquariumActive = (item)=>{
        const updatedAquariums = aquariums.map((aquarium) =>
          aquarium._id === item._id
            ? {...aquarium, active: !aquarium.active}
            : aquarium
        );
        setAquariums(updatedAquariums);
    }

    const renderAquarium = ({item, index}) =>{
        return(
            <AquariumCard onPress={()=>updateAquariumActive(item)} item={item}></AquariumCard>
        );
    }

    useEffect(()=>{
        setIndex(0);
    },[])
 
    const addAquarium = () => {
        setIndex(index + 1);
        const newAquarium = {
            _id: index,
            name: 'AQUA' + index,
            owner: '644dc157f15aef162d2e9294',
            active: false  
        }
        setAquariums([...aquariums, newAquarium]);
    }
     
    return(
        <View>
            <View style={styles.container}>
                <Text style={{alignSelf: 'center', marginBottom: 10}}>UserId: {userId}</Text>
                <FlatList 
                    data={aquariums}
                    keyExtractor={(aquarium) => aquarium._id.toString()}
                    renderItem={renderAquarium}>
                </FlatList>
            </View>
            <View style={styles.buttonContainer}>
                <ActionButton 
                onPress={addAquarium} 
                title="Add new aquarium" 
                buttonStyles={styles.addButton} 
                textStyles={styles.buttonText}></ActionButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 70,
        height: '80%',
        width: 'auto',
        marginHorizontal: 20
    },
    buttonContainer:{
        marginVertical: 10
    },
    addButton:{
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignSelf: 'center'
    },
    buttonText:{
        fontSize: 15
    }
});