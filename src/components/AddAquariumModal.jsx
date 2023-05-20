import { View, Modal, TextInput, StyleSheet, Text } from 'react-native';
import React, {useEffect, useState} from 'react';
import { colors } from '../config';
import ActionButton from './ActionButton';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {MaterialCommunityIcons ,Ionicons, MaterialIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAquarium } from '../api/aquariumAPI';

export default AddAquariumModal = ({ isVisible, onClose, onSubmit}) => {

  const [aquariumName, setAquariumName] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  


  useEffect(()=>{
    getCameraPermissions();
  }, []);

  const clearFields = () => {
    setAquariumName('');
    setDeviceId('');
  };

  const addNewAquarium = async (ownerId) => {
    const responseData = await createAquarium(aquariumName, ownerId, deviceId);

    if (responseData.success){
      onSubmit(current => [...current, responseData.aquarium])
    }
  
    alert(responseData.message)
    
  }

  const getCameraPermissions = async () => {
    const {status} = await BarCodeScanner.getPermissionsAsync();
    if (status === 'granted') {
      setHasCameraPermission(true);
    } else{
      requestCameraPermission();
    }
  };

  const requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasCameraPermission(status === 'granted');
  };

  const handleScanQRCode = async () => {
    if (!hasCameraPermission) {
      alert('Camera permission not granted');
      // You can handle the case when camera permission is not granted
      return;
    }
    setIsScanning(true);
  };

  const handleBarCodeScanned = (result) => {
    setDeviceId(result.data);
    setIsScanning(false);
  };

  const handleAquariumRegister = async () => {
    const loggedInUser = await AsyncStorage.getItem('loggedInUser');
    const parsedUser = JSON.parse(loggedInUser);
    console.log(parsedUser);
    addNewAquarium(parsedUser._id);
    clearFields();
    onClose();
  }

  const handleCancel = () => {
    clearFields();
    onClose();
  }

  const handleDismiss = () =>{
    setIsScanning(false);
    clearFields();
    onClose();
  }
  return (
    <Modal 
      visible={isVisible} 
      onRequestClose={handleDismiss}
      onRequestDismiss={handleDismiss}
      animationType='fade'
      transparent
      >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.textInput}
            placeholder="Aquarium Name"
            value={aquariumName}
            onChangeText={setAquariumName}
          />
          <View style={styles.hrLine}></View>
          <TextInput
              style={styles.textInput}
              placeholder="Device ID"
              value={deviceId}
              onChangeText={setDeviceId}
            />
          <Text style={styles.orText}>OR</Text>
          <ActionButton 
            buttonStyles={styles.QRbuttonStyles} 
            title="Scan QR" 
            onPress={handleScanQRCode} 
            icon={<MaterialIcons name="qr-code-scanner" size={24} color="white" />}/>
          <View style={styles.hrLine}></View>
          <View style={styles.buttonsContainer}>
            <ActionButton  
              buttonStyles={styles.buttonStyles} 
              title="Add" 
              onPress={handleAquariumRegister} 
              icon={<Ionicons name="add-circle-outline" size={20} color="white" />}/>
            <ActionButton 
              buttonStyles={styles.buttonStyles} 
              title="Cancel" 
              onPress={handleCancel} 
              icon={<MaterialCommunityIcons name="cancel" size={20} color="white" />}/>
          </View>
        </View>
      </View>
      {isScanning && hasCameraPermission && (
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={handleBarCodeScanned}
        />
      )}
    </Modal>
  )
};

const styles = StyleSheet.create({
  textInput:{
    padding: 10,
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 15
  },
  deviceIdInput: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  hrLine:{
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonStyles:{
    width: '40%',
    margin: 20
  },
  orText:{
    color: 'white',
    alignSelf: 'center'
  },
  QRbuttonStyles:{
    alignSelf: 'center',
    margin: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  }

});