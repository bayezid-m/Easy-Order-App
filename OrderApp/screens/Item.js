/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';
import { useUser } from '../components/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({ route, navigation }) => {
    const { item } = route.params;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { userCart, setUserCart } = useUser();

    useEffect(() => {
        // Load cart items from local storage on component mount
        const loadCartFromStorage = async () => {
            try {
                const cartFromStorage = await AsyncStorage.getItem('userCart');
                if (cartFromStorage !== null) {
                    setUserCart(JSON.parse(cartFromStorage));
                }
            } catch (error) {
                console.error('Error loading cart from storage:', error);
            }
        };

        loadCartFromStorage();
    }, [setUserCart]);

    useEffect(() => {
        // Save cart items to local storage whenever userCart changes
        const saveCartToStorage = async () => {
            try {
                await AsyncStorage.setItem('userCart', JSON.stringify(userCart));
            } catch (error) {
                console.error('Error saving cart to storage:', error);
            }
        };
        saveCartToStorage();
    }, [userCart]);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % item.image.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + item.image.length) % item.image.length);
    };

    const addtoCartHandler = () => {
        setUserCart((prevCart) => [...prevCart, item._id]);
    }

    return (
        <View style={styles.outerContainer}>
            <Navbar navigation={navigation} />
            <View style={styles.container}>
                <TouchableOpacity style={styles.leftArrow} onPress={prevImage}>
                    <Image source={require('../assets/left-arrow.png')} style={styles.arrowImage} />
                </TouchableOpacity>
                <Image source={{ uri: item.image[currentImageIndex] }} style={styles.image} />
                <TouchableOpacity style={styles.rightArrow} onPress={nextImage}>
                    <Image source={require('../assets/right-arrow.png')} style={styles.arrowImage} />
                </TouchableOpacity>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>Price: {item.price}€</Text>
                <Button title="Add to cart" onPress={addtoCartHandler} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '80%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    leftArrow: {
        position: 'absolute',
        top: '50%',
        left: 10,
    },
    rightArrow: {
        position: 'absolute',
        top: '50%',
        right: 10,
    },
    arrowImage: {
        width: 24,
        height: 24,
    },
});

export default Item;