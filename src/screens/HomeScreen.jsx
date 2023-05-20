import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, FlatList, BackHandler  } from "react-native";
import { BASE_URL } from "../config";
import ActionButton from "../components/ActionButton";
import AquariumCard from "../components/AquariumCard";
import AddAquariumModal from "../components/AddAquariumModal";
import {MaterialIcons, AntDesign} from '@expo/vector-icons';
import { colors } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAquariumsByUserId } from "../api/aquariumAPI";

export default function Home({navigation, route}){

    const [isRegistrationModalVisible, setRegistrationModalVisible] = useState(false); 
    const [aquariums, setAquariums] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleOpenRegistrationModal = () => {
        setRegistrationModalVisible(true);
    };
    
    const handleCloseRegistrationModal = () => {
    setRegistrationModalVisible(false);
    };

    const getAquariums = async (ownerId) =>{
        const responseData = await getAquariumsByUserId(ownerId);
        if(responseData.success){
            setAquariums(responseData.aquariums);
        } else alert(responseData.message);
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

    const renderAquarium = ({item, index}) =>{
        return(
            <AquariumCard onPress={()=>{navigation.navigate('Aquarium', {aquarium: item})}} item={item}></AquariumCard>
        );
    }

    useEffect(()=>{
        async function fetchInitialData(){
            const user = await AsyncStorage.getItem('loggedInUser');
            parsedUser = JSON.parse(user);
            setLoggedInUser(parsedUser);
            getAquariums(parsedUser._id);
        }

        fetchInitialData();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
        return () => backHandler.remove();
    },[])


    const logout = async () => {
        await AsyncStorage.removeItem('loggedInUser');
        navigation.navigate('Login');
    }

     
    return(
        <View>
            <View style={styles.logoutButton}>
                <ActionButton 
                    title='Logout' 
                    icon={<AntDesign name="logout" size={18} color="white"/>} 
                    onPress={logout}></ActionButton>
            </View>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    User: {loggedInUser && loggedInUser.name}{"\n"}
                    My Aquariums
                </Text>
                {aquariums && 
                    <FlatList 
                        data={aquariums}
                        keyExtractor={(aquarium) => aquarium._id.toString()}
                        renderItem={renderAquarium}></FlatList>
                }
                
            </View>
            <View style={styles.buttonContainer}>
                <ActionButton 
                onPress={handleOpenRegistrationModal} 
                title="New aquarium" 
                buttonStyles={styles.addButton} 
                textStyles={styles.buttonText}
                icon={<MaterialIcons name="add-to-queue" size={18} color="white"/>}></ActionButton>
            </View>
            <AddAquariumModal
                isVisible={isRegistrationModalVisible}
                onClose={handleCloseRegistrationModal}
                onSubmit={setAquariums}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        height: '77%',
        width: 'auto',
        marginHorizontal: 20
    },
    titleText:{
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: colors.primary,
        height: 50,
        width: '80%',
        borderRadius: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    logoutButton:{
        width: '30%',
        alignSelf: 'center',
        marginTop: 40
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