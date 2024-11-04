import React, { useState } from 'react';
import { View, Alert, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from "react-native-image-picker";
import data from "../../assets/data/profilepage.json";
import ImageResizer from 'react-native-image-resizer';

const ProfilePage: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Handles the user choosing a photo for their profile pic
  const handleChoosePhoto = () => {
    Alert.alert(
      "Upload Photo",
      "Choose a photo source",
      [
        {
          text: "Take Photo",
          onPress: () => openCamera(),
        },
        {
          text: "Choose from Library",
          onPress: () => openLibrary(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // If user wants to take a photo 
  const openCamera = async () => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    ImagePicker.launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("Image Picker Error: ", response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        const uri = response.assets[0].uri;
        const resizedImage = await ImageResizer.createResizedImage(
          uri,
          800,
          600,
          "JPEG",
          80
        );

        setProfileImage(resizedImage.uri);
      }
    });
  };

  // If user wants to choose a photo from library
  const openLibrary = async () => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("Image Picker Error: ", response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        const uri = response.assets[0].uri;
        const resizedImage = await ImageResizer.createResizedImage(
          uri,
          800,
          600,
          "JPEG",
          80
        );

        setProfileImage(resizedImage.uri);
      }
    });
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.profilePage}>
        {/* Profile Title */}
        <Text style={styles.profileHeader}>PROFILE</Text>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          {/* Press the profile pic to choose a new one! */}
          <TouchableOpacity onPress={handleChoosePhoto}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>Add photo</Text>
              </View>
            )}
          </TouchableOpacity>
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
            placeholder="Enter your name"
            placeholderTextColor="#A9A9A9" // Aluminum (grey)
          />

          <Text style={styles.label}>NetID:</Text>
          <TextInput
            style={styles.input}
            value={data.profile.netID}
            onChangeText={(text) => {
              // Update state if needed
            }}
            placeholder="Enter your NetID"
            placeholderTextColor="#A9A9A9"
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
            placeholder="Enter your role"
            placeholderTextColor="#A9A9A9"
          />

          <Text style={styles.label}>Contact (phone):</Text>
          <TextInput
            style={styles.input}
            value={data.profile.contact.phone}
            onChangeText={(text) => {
              // Update state if needed
            }}
            placeholder="Enter your email"
            placeholderTextColor="#A9A9A9"
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
    color: "#0000FF",
    marginBottom: 20,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#D9E3F0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Adds shadow on Android
  },
  avatarText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "600",
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  infoSection: {
    width: "100%", // Ensure the inputs take the full width
    marginTop: 20, // Space above the info section
  },
  label: {
    fontWeight: "bold",
    marginTop: 10, // Space above each label
    fontSize: 14,
    marginBottom: 5,
    color: "#333333",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 12,
    marginVertical: 10, // Space between each input field
    width: "100%", // Full width of the container
    maxWidth: 400, // Limit the width
    marginBottom: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Adds shadow on Android
  },
});

export default ProfilePage;
