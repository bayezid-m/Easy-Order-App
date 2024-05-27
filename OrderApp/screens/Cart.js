/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { useUser } from '../components/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ navigation }) => {
  const { userCart, setUserCart } = useUser();
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const fetchedDetails = await Promise.all(
          userCart.map(async (itemId) => {
            const response = await axios.get(`http://192.168.54.253:4040/api/v1/item/getSingleItem/${itemId}`);
            return response.data.itemInfo;
          })
        );
        setItemDetails(fetchedDetails);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [userCart]);

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
  
  const navigateToOrderScreen = (item) => {
    navigation.navigate('OrderScreen', { item });
  };

  const handleDeleteItem = (index) => {
    const updatedCart = [...userCart];
    updatedCart.splice(index, 1);
    setUserCart(updatedCart);
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>Error loading items: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {itemDetails?.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Image source={{ uri: item.image[0] }} style={styles.image} />
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Price: {item.price}€</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={() => navigateToOrderScreen(item)}
            >
              <Text style={styles.orderButtonText}>Place Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteItem(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  orderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 10,
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});

export default Cart;
