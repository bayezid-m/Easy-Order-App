/* eslint-disable prettier/prettier */
// Dashboard.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Aler, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/Navbar';
import VenueCard from '../components/VenueCard';
import axios from 'axios';

export default function Dashboard({ navigation }) {
    const [venues, setVenues] = useState([]);
    const [inputText, setInputText] = useState('');

    const fetchVenues = async (searchQuery) => {
        try {
            const response = await axios.get('http://192.168.0.22:4040/api/v1/venue/getVenue', {
                params: {
                    search: searchQuery
                }
            });
            if (response.data.status === 'okay') {
                setVenues(response.data.venue);
            }
        } catch (error) {
            console.error('Error fetching venues:', error);
        }
    };
    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                navigation.navigate('Login');
            }
        };
        checkToken();
        setInputText('');
    }, [navigation]);

    useEffect(() => {
        //
        fetchVenues(inputText);
    }, [inputText]);

    const [isScanning, setScanning] = useState(false);

    // const handleSubmit = () => {
    //     //e.preventDefault();
    //     navigation.navigate('AllRestaurant', { submittedText: inputText })
    // }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust vertical offset if needed
        >
            <View style={styles.container}>
                <Navbar navigation={navigation} />
                <View style={styles.contentContainer}>
                    <TextInput
                        placeholder="Enter text here"
                        value={inputText}
                        onChangeText={(text) => setInputText(text)}
                        style={styles.input}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Scan QR Code" onPress={() => navigation.navigate('Scanner')} />
                        <Button title="Search" onPress={fetchVenues} />
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {venues.map((venue) => (
                        <VenueCard key={venue._id} venue={venue} />
                    ))}
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    scrollViewContent: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
});