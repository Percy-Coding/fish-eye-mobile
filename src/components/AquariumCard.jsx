import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../config';

export default function AquariumCard(props) {
  const { onPress, item } = props;
  return(
    <Pressable style={styles.aquariumContainer} onPress={onPress}>
        <Text style={styles.aquariumTitle}>{item.name}</Text>
        <View style={{
            ...styles.activeIndicator, 
            backgroundColor: item.active? 'green' : 'red'
        }}  
        ></View>
    </Pressable>
);
}

const styles = StyleSheet.create({
    aquariumContainer: {
        width: '100%',
        height: 120,
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 8,
        elevation: 4
    },
    activeIndicator:{
        width: 20,
        height: 20,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#ccc',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 6,
        position: 'absolute',
        top: 2,
        right: 2
    },
    aquariumTitle:{
        color: 'white',
        fontWeight: 'bold'
    }
});