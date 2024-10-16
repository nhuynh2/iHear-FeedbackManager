import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";

const ReportScreen = () => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);

  // Category state and modal visibility
  const [category, setCategory] = useState("Select Category");
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

  // Location state and modal visibility
  const [location, setLocation] = useState("Select Location");
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);

  // Star rating state
  const [emergenceRating, setEmergenceRating] = useState(0); // 1-5 star rating for emergence level

  const categoryItems = ["Plumbing", "Electrical", "HVAC", "Paint", "Flooring", "Appliance", "Landscaping", "Security", "Windows/Doors", "Safety", "Exterior", "Parking Lot/Garage", "Other"];
  const locationItems = ["Hodges", "Hess", "Massey", "Reese", "Fred Brown", "Clement", "Student Union", "Rockytop", "TRECS", "Thompson-Bowling", "Neyland Stadium", "Min Kao", "Ayres", "G10 Parking"];

  // Function to choose a photo or take a photo
  const handleChoosePhoto = (index: number) => {
    Alert.alert(
      "Upload Photo",
      "Choose a photo source",
      [
        {
          text: "Take Photo",
          onPress: () => openCamera(index),
        },
        {
          text: "Choose from Library",
          onPress: () => openLibrary(index),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const openCamera = async (index: number) => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    launchCamera(options, async (response) => {
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

        const newImages = [...images];
        newImages[index] = resizedImage.uri;
        setImages(newImages);
      }
    });
  };

  const openLibrary = async (index: number) => {
    const options = {
      mediaType: "photo",
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
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

        const newImages = [...images];
        newImages[index] = resizedImage.uri;
        setImages(newImages);
      }
    });
  };

  // Validation before submitting the form
  const validateForm = () => {
    if (!topic) {
      Alert.alert("Validation Error", "Topic is required.");
      return false;
    }
    if (topic.length > 60) {
      Alert.alert("Validation Error", "Topic cannot exceed 60 characters.");
      return false;
    }
    if (!description) {
      Alert.alert("Validation Error", "Description is required.");
      return false;
    }
    if (description.length > 500) {
      Alert.alert(
        "Validation Error",
        "Description cannot exceed 500 characters."
      );
      return false;
    }
    if (category === "Select Category") {
      Alert.alert("Validation Error", "Please select a category.");
      return false;
    }
    if (location === "Select Location") {
      Alert.alert("Validation Error", "Please select a location.");
      return false;
    }
    const hasAtLeastOneImage = images.some((image) => image !== null);
    if (!hasAtLeastOneImage) {
      Alert.alert("Validation Error", "At least one photo is required.");
      return false;
    }
    if (emergenceRating === 0) {
      Alert.alert("Validation Error", "Please rate the emergence level.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // Submit the form (placeholder logic for now)
      console.log("Form submitted successfully with the following data:");
      console.log({
        topic,
        description,
        images,
        category,
        location,
        emergenceRating,
      });
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setCategory(item);
        setIsCategoryModalVisible(false);
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const renderLocationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setLocation(item);
        setIsLocationModalVisible(false);
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  // Function to render stars
  const renderStars = (): JSX.Element[] => {
    let stars: JSX.Element[] = []; // Explicitly define the type as an array of JSX elements

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setEmergenceRating(i)}>
          <Text style={styles.star}>
            {i <= emergenceRating ? "★" : "☆"}{" "}
            {/* Filled star if rating >= i, else empty star */}
          </Text>
        </TouchableOpacity>
      );
    }

    return stars;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>REPORT</Text>
      <TextInput
        style={styles.input}
        placeholder="Topic"
        value={topic}
        onChangeText={setTopic}
        maxLength={60} // Limit the topic to 60 characters
      />
      <Text style={styles.charCounter}>{topic.length}/60</Text>{" "}
      {/* Display character counter */}
      {/* Category Dropdown */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsCategoryModalVisible(true)}
      >
        <Text>{category}</Text>
      </TouchableOpacity>
      {/* Category Modal */}
      <Modal
        visible={isCategoryModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={categoryItems}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item}
            />
            <Button
              title="Close"
              onPress={() => setIsCategoryModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
      {/* Location Dropdown */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsLocationModalVisible(true)}
      >
        <Text>{location}</Text>
      </TouchableOpacity>
      {/* Location Modal */}
      <Modal
        visible={isLocationModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={locationItems}
              renderItem={renderLocationItem}
              keyExtractor={(item) => item}
            />
            <Button
              title="Close"
              onPress={() => setIsLocationModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <TextInput
        style={styles.textArea}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        maxLength={500} // Limit the description to 500 characters
        multiline={true}
      />
      <Text style={styles.charCounter}>{description.length}/500</Text>{" "}
      {/* Display character counter */}
      {/* Emergence Rating */}
      <Text style={styles.emergenceLabel}>Emergence Level:</Text>
      <View style={styles.starContainer}>{renderStars()}</View>
      <View style={styles.photoContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={styles.photoBox}
            onPress={() => handleChoosePhoto(index)}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.photo} />
            ) : (
              <Text>Photo {index + 1}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  charCounter: {
    textAlign: "right",
    fontSize: 12,
    color: "#999",
    marginBottom: 15,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: "center",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    height: 100,
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  star: {
    fontSize: 30,
    color: "#FFD700", // Gold color for the stars
    marginHorizontal: 5,
  },
  emergenceLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  photoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  photoBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
});

export default ReportScreen;
