import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../config';

export default function ActionButton(props) {
  const { onPress, title, textStyles, buttonStyles, icon } = props;

  return (
    <Pressable style={{...styles.button, ...buttonStyles}} onPress={onPress}>
      {icon}
      <Text style={{...styles.text, ...textStyles}}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: colors.action,
  },
  text: {
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  },
});