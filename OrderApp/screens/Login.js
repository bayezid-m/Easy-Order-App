/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('Dashboard');
      }
    };
    checkToken();
  });

  //192.168.54.253
  const loginUser = async () => {
    try {
      const response = await axios.post('http://192.168.54.253:4040/api/v1/user/login', { email, password });
      //console.log(response.data)
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={loginUser} />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '80%',
  },
});

export default LoginScreen;
