/* eslint-disable prettier/prettier */
// Login.js
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Login({ navigation }) {
    return (
        <View>
            <Text>Login Screen</Text>
            <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}
