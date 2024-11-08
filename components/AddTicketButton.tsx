import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { ROUTES } from './navigation/routes';

const AddTicketButton = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push(ROUTES.REPORT); // Navigate to the Profile page
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <FontAwesome name="plus" size={16} color="white" />
      </View>
      <Text style={styles.buttonText}>Add Ticket</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    zIndex: 10
  },
  iconContainer: {
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTicketButton;