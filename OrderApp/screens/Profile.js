/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useUser } from '../components/UserProvider';

const ProfileScreen = () => {
    const { user } = useUser(); // Access user state

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
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
        borderRadius: 60, // half of width and height to make it circular
      },
    userInfo: {
        padding: 20,
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
});

export default ProfileScreen;