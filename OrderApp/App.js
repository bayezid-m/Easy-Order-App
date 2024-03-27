/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './screens/Dashboard';
import Register from './screens/Register';
import Login from './screens/Login';
import QrCoder from './screens/QrCoder';
import AllRestaurant from './screens/AllRestaurant';
import { UserProvider } from './components/UserProvider';
import ProfileScreen from './screens/Profile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Scaner" component={QrCoder} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="AllRestaurant" component={AllRestaurant} />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
}

//npx react-native run-android