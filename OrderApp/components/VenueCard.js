/* eslint-disable prettier/prettier */
import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VenueCard = ({ venue }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    // Navigate to the Venue screen with the venue.id parameter
    navigation.navigate('Venue', { venueId: venue.name });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image source={{ uri: venue.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{venue.name}</Text>
        <Text style={styles.location}>{venue.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: '#888',
  },
});

export default VenueCard;
