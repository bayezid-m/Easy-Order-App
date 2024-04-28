/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';


const QrCoder = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [isScanning, setScanning] = useState(false);
  const navigationHere = useNavigation();

  const onSuccess = e => {
    if (e.data) {
      navigationHere.navigate('Venue', { venueId: e.data });
      setScanning(!isScanning);
    }
    else {
      Alert.alert("No data found");
    }
  };
  return (
    <QRCodeScanner
      onRead={onSuccess}
      topContent={
        <Text style={styles.centerText}>
          Please scan the QR
        </Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      }
    />
  )
}

export default QrCoder;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
