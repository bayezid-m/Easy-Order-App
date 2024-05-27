/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../components/UserProvider';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = ({ route }) => {
    const { item } = route.params;
    const { userVenueId } = useUser();
    const [price, setPrice] = useState(item.price);
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [csvNumber, setCSVNumber] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const navigation = useNavigation();

    const handleQuantityChange = (change) => {
        setQuantity((prevQuantity) => {
            const newQuantity = Math.max(prevQuantity + change, 1);
            setPrice(item.price * newQuantity);
            return newQuantity;
        });
    };

    const handleConfirmOrder = async () => {
        const orderData = {
            item_id: item._id,
            quantity: quantity,
            note: note,
            price: price,
            venue_id: userVenueId,
        };

        const token = await AsyncStorage.getItem('token');
        const headers = {
            'access-token': token,
        };
        try {
            const response = await axios.post('http://192.168.54.253:4040/api/v1/order/addOrder', orderData, { headers });

            if (response.status === 201) {
                navigation.navigate('Profile');
                setConfirmed(true);
            } else {
                console.error('Error placing order:', response.data.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 150}
        >
            <View style={styles.inner}>
                <Text style={styles.title}>Order Details</Text>
                <Image source={{ uri: item.image[0] }} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>Total Price: {price}€</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleQuantityChange(-1)}
                    >
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleQuantityChange(1)}
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Add note (optional)"
                    value={note}
                    onChangeText={setNote}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Card Number"
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Expiration Date (MM/YY)"
                    keyboardType="string"
                    value={expireDate}
                    onChangeText={setExpireDate}
                />
                <TextInput
                    style={styles.input}
                    placeholder="CSV"
                    keyboardType="numeric"
                    secureTextEntry={true}
                    value={csvNumber}
                    onChangeText={setCSVNumber}
                />
                {!confirmed && cardNumber && expireDate && csvNumber ? (
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={handleConfirmOrder}
                    >
                        <Text style={styles.confirmButtonText}>Confirm Order</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 16,
        color: '#888',
        marginBottom: 20,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 15,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 18,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});



export default OrderScreen;
