import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import data from "../../assets/data/profilepage.json";

const ProfilePage: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.profilePage}>
        {/* Profile Title */}
        <Text style={styles.profileHeader}>PROFILE</Text>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarPlaceholder}>
            <Text>Avatar Photo</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={data.profile.name} // Display the existing value
            onChangeText={(text) => {
              // Update state if needed
            }}
          />

          <Text style={styles.label}>NetID:</Text>
          <TextInput
            style={styles.input}
            value={data.profile.netID}
            onChangeText={(text) => {
              // Update state if needed
            }}
          />

          <Text style={styles.label}>Role:</Text>
          <TextInput
            style={styles.input}
            value={data.profile.role}
            onChangeText={(text) => {
              // Update state if needed
            }}
          />

          <Text style={styles.label}>Contact (email):</Text>
          <TextInput
            style={styles.input}
            value={data.profile.contact.email}
            onChangeText={(text) => {
              // Update state if needed
            }}
          />

          <Text style={styles.label}>Contact (phone):</Text>
          <TextInput
            style={styles.input}
            value={data.profile.contact.phone}
            onChangeText={(text) => {
              // Update state if needed
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 20,
  },
  profilePage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "white",
  },
  profileHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0000FF",
    marginBottom: 20,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },
  avatarPlaceholder: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  infoSection: {
    width: "100%", // Ensure the inputs take the full width
    marginTop: 20, // Space above the info section
  },
  label: {
    fontWeight: "bold",
    marginTop: 10, // Space above each label
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10, // Space between each input field
    width: "100%", // Full width of the container
    maxWidth: 400, // Limit the width
  },
});

export default ProfilePage;
