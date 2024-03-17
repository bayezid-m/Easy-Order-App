/* eslint-disable prettier/prettier */
// Dashboard.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default function Dashboard({ navigation }) {
    // useEffect(() => {
    //     const checkToken = async () => {
    //       try {
    //         const token = await AsyncStorage.getItem('token');
    //         if (!token) {
    //           // If no token found, navigate to Login screen
    //           navigation.replace('Login');
    //         }
    //       } catch (error) {
    //         console.error('Error checking token:', error);
    //         // Handle error if needed
    //       }
    //     };

    //     checkToken();
    //   }, [navigation]);
    useEffect(() => {
        setInputText('')
    }, [])
    const [inputText, setInputText] = useState('');
    const [isScanning, setScanning] = useState(false);
    const handleSubmit = () => {
        //e.preventDefault();
        navigation.navigate('AllRestaurant', { submittedText: inputText })
    }
    return (
        <View>
            <Text>Dashboard Screen</Text>
            <TextInput
                placeholder="Enter text here"
                value={inputText}
                onChangeText={(text) => setInputText(text)}
                style={styles.input}
            />
            {/* <Button title="Submit" onPress={() => navigation.navigate('AllRestaurant', { submittedText: inputText })} /> */}
            <Button title="Submit" onPress={ handleSubmit} /> 
            <Button title="Scan Qr code" onPress={()=> navigation.navigate('scaner')} /> 
        </View>
    );
}
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
