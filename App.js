import React from 'react';
import Navigation from './src/components/navigation/Navigation';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Navigation/>
      <StatusBar style='auto'></StatusBar>
    </View> 
  );
}