/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, FlatList } from 'react-native';
import axios from 'axios';
import { useUser } from '../components/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';



const ProfileScreen = () => {
    const { user, logoutUser } = useUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await axios.get('http://192.168.54.253:4040/api/v1/order/getOrder', {
                headers: {
                    'access-token': token
                }
            });
            setOrders(response.data.orders.reverse()); // Reverse to show the latest orders first
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const socket = io('http://192.168.54.253:4040');

    useEffect(() => {
        fetchOrders();

        socket.on('updateOrder', (updatedOrder) => {
            setOrders((prevOrders) =>
              prevOrders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
            );
          });
      
          return () => {
            socket.off('updateOrder');
          };
    }, [user.token]);


    useEffect(() => {
        const interval = setInterval(() => {
            fetchOrders();
        }, 3000);
        return () => clearInterval(interval);
      }, []);


    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error loading orders: {error.message}</Text>;

    const renderItem = ({ item }) => (
        <View style={styles.orderContainer}>
            <View style={styles.orderDetails}>
                <Text style={styles.orderText}>Name: {item.item_id.name}</Text>
                <Text style={styles.orderText}>Price: {item.price}€</Text>
                <Text style={styles.orderText}>Quantity: {item.quantity}</Text>
            </View>
            <View style={styles.orderStatus}>
                <Text style={[styles.orderText, { color: item.status ? 'green' : 'blue' }]}>
                    {item.status ? 'Ready' : 'Pending'}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: user ? user.image : '' }} style={styles.image} />
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{user ? `${user.first_name} ${user.last_name}` : '-'}</Text>
                    <Text style={styles.email}>Email: {user ? user.email : '-'}</Text>
                </View>
            </View>
            <Button title="Logout" onPress={logoutUser} />
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.ordersList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    card: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 20,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        overflow: 'hidden',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 10,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    userInfo: {
        padding: 20,
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        marginBottom: 10,
    },
    ordersList: {
        paddingBottom: 20,
        width: '100%',
    },
    orderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 15,
        alignSelf: 'center',
    },
    orderDetails: {
        flex: 3,
    },
    orderStatus: {
        flex: 1,
        alignItems: 'flex-end',
    },
    orderText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default ProfileScreen;