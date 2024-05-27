/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Navbar from '../components/Navbar';
import {useUser} from '../components/UserProvider';

const Venue = ({ navigation }) => {
    const route = useRoute();
    const venueId = route.params?.venueId;
    const [venueItems, setVenueItems] = useState();
    const [venueInfo, setVenueInfo] = useState();
    const {setUserVenueId} = useUser();

    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const response = await axios.get(`http://192.168.54.253:4040/api/v1/item/getItem?venue=${venueId}`);
                setVenueItems(response.data.items);
            } catch (error) {
                console.error('Error fetching venue information:', error.message);
            }
        };
        const fetchVenueData = async () => {
            try {
                const response = await axios.get(`http://192.168.54.253:4040/api/v1/item/getItem?venue=${venueId}`);
                setVenueInfo(response.data.venue);
                setUserVenueId(response.data.venue._id);
            } catch (error) {
                console.error('Error fetching venue information:', error.message);
            }
        };

        fetchItemsData();
        fetchVenueData();
    }, [venueId, setUserVenueId]);

    const navigateToItemScreen = (item) => {
        navigation.navigate('Item', { item });
    };

    return (
        <View >
            <Navbar navigation={navigation} />
            <View style={styles.card}>
                <Image source={{ uri: venueInfo?.image }} style={styles.image} />
                <View style={styles.cardContent}>
                    <Text style={styles.name}>{venueInfo?.name}</Text>
                    <Text style={styles.location}>{venueInfo?.location}</Text>
                </View>
            </View>
            {venueItems?.map(item => (
                <TouchableOpacity key={item._id} style={styles.card2} onPress={() => navigateToItemScreen(item)}>
                    <Image source={{ uri: item.image[0] }} style={styles.image2} />
                    <Text style={styles.name2}>{item.name}</Text>
                    <Text style={styles.price2}>Price: {item.price}€</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingLeft: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    cardContent: {
        flex: 1,
        padding: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    location: {
        fontSize: 16,
        color: '#888',
    },
    card2: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    image2: {
        width: '100%',
        height: 150,
        borderRadius: 5,
        marginBottom: 10,
    },
    name2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price2: {
        fontSize: 16,
    },
});
export default Venue;
