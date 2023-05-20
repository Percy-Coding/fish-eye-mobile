import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import ActionButton from "../components/ActionButton";
import LoginLogo from "../components/LoginLogo";
import { colors } from "../config";
import { loginUser } from "../api/usersAPI";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login({navigation}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const loginAction = async () => {

        if(username && password) {
            const responseData = await loginUser(username, password);
            if(responseData.success) {
                await AsyncStorage.setItem('loggedInUser', JSON.stringify(responseData.user));
                navigation.navigate('Home');
                setPassword(null);
                setUsername(null);
            }else alert(responseData.message);
            
        }else alert('Username and pasword must be filled in');
    }

    
    
    return(
        <View style={styles.container}>
            <LoginLogo></LoginLogo>
            <Text style={styles.title}>FishEye</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Username"
                value={username}
                onChangeText={text => setUsername(text)}>
            </TextInput>
            <TextInput
                style={styles.textInput}
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry>
            </TextInput>
            <ActionButton 
            onPress={() => loginAction()} 
            title="Login"
            buttonStyles={styles.loginButton}></ActionButton>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize: 48,
        color: colors.primary,
        fontWeight: 'bold',
    },
    subtitle:{
        fontSize: 15,
        color: 'gray'
    },
    textInput:{
        padding: 10,
        width: '80%',
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    loginButton:{
        marginTop: 20,
        width: '80%'
    }
});