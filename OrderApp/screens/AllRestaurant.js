/* eslint-disable prettier/prettier */
import React from 'react'
import {View, Text, StyleSheet} from 'react-native';

const AllRestaurant = ({route}) => {
    const {submittedText} = route.params;
 
    return (
        <View style={styles.container}>
          <Text>Submitted Text: {submittedText}</Text>
        </View>
      );
}

export default AllRestaurant;

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
    },
  });