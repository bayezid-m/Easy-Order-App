/* eslint-disable prettier/prettier */
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.get("http://192.168.162.89:4040/api/v1/user/getUser", {
            headers: {
              'access-token': token
            }
          });
          if (response.data.status === "okay") {
            setUser(response.data.userInfo);
          }
        }
      } catch (error) {
        console.error('Error getting user:', error);
      }
    };

    getUser();
  }, []);


  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  return (
    <UserContext.Provider value={{ user, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
