/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useUser } from './UserProvider';
const Navbar = () => {
    const { user, logoutUser } = useUser();
    const navigation = useNavigation();

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };
    const handleNavigateCart = ()=>{
        navigation.navigate('Cart');
    }
    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={handleProfilePress}>
                <Text style={styles.username}>{user ? `Welcome, ${user.first_name}` : 'Welcome, Guest'}</Text>
            </TouchableOpacity>
            {/* <Button title="Logout" onPress={logoutUser} /> */}
            <Button title="Cart" onPress={handleNavigateCart} />
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ccc',
        padding: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue', // Change color to indicate it's clickable
      },
});

export default Navbar;