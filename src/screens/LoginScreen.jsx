import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import LoginButton from "../components/LoginButton";
import LoginLogo from "../components/LoginLogo";
import { BASE_URL } from "../config";

export default function Login({navigation}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const loginAction = async () => {
        const response = await fetch(`${BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });
        
        const json = await response.json();
        navigation.navigate('Home', { userId: json.userId });
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
            <LoginButton onPress={loginAction} title="Login"></LoginButton>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize: 50,
        color: '#3285FF',
        fontWeight: 'bold',
    },
    subtitle:{
        fontSize: 20,
        color: 'gray'
    },
    textInput:{
        padding: 10,
        width: '80%',
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: '#fff'
    }
});