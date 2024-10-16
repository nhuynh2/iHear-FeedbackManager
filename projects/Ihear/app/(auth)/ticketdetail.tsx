import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Picker, Image } from 'react-native';
import data from "../../assets/data/ticketdetail.json";

const TicketDetailScreen = () => {
  const [status, setStatus] = useState('open'); // You can replace this with your status options

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TICKET DETAIL</Text>

      {/* Topic */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Topic</Text>
        <TextInput style={styles.input} placeholder="Enter topic" />
      </View>

      {/* Category */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <TextInput style={styles.input} placeholder="Enter category" />
      </View>

      {/* Location */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} placeholder="Enter location" />
      </View>

      {/* Description */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.description]}
          placeholder="Enter description"
          multiline={true}
        />
      </View>

      {/* Status (Drop-down) */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Status:</Text>
        <Picker
          selectedValue={status}
          style={styles.picker}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Picker.Item label="Open" value="open" />
          <Picker.Item label="In Progress" value="in-progress" />
          <Picker.Item label="Closed" value="closed" />
        </Picker>
      </View>

      {/* Photos */}
      <View style={styles.photoContainer}>
        <Image
          style={styles.photo}
          source={{ uri: 'https://example.com/photo1.png' }} // Replace with actual photo
        />
        <Image
          style={styles.photo}
          source={{ uri: 'https://example.com/photo2.png' }} // Replace with actual photo
        />
        <Image
          style={styles.photo}
          source={{ uri: 'https://example.com/photo3.png' }} // Replace with actual photo
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#8a2be2', 
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
  },
  description: {
    height: 100, // Make the description box larger
    textAlignVertical: 'top',
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  photo: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd', 
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default TicketDetailScreen;
