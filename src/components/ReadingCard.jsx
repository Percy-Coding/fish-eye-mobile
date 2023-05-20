import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../config';

export default function ReadingCard(props) {
  const { onPress, item } = props;
  return(
    <Pressable style={styles.readingContainer} onPress={onPress}>
        <Text style={styles.readingTitle}>{item.name}</Text>
        <Text style={styles.valueText}>
            {item.value ?? 'Parameter Inactive'} {item.value? item.unit : null} {'\n'}
        </Text>
    </Pressable>
);
}

const styles = StyleSheet.create({
    readingContainer: {
        width: '40%',
        height: 120,
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 15,
        borderWidth: 1,
        borderRadius: 8,
        elevation: 4,
        marginHorizontal: 20
    },
    readingTitle:{
        color: 'white',
        fontWeight: 'bold'
    },
    valueText:{
        marginVertical: 5,
        color: colors.secondary
    }
});