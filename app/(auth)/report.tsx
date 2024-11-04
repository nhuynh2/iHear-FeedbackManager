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
import { SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import firebaseConfig from "../../firebase-config";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const FIREBASE_CONFIG = initializeApp(firebaseConfig);
const FIRESTORE = getFirestore(FIREBASE_CONFIG);
const OBJ_TYPE = "tickets";
const ID_LENGTH = 10;

// Mock data for campus areas and buildings
const campusAreas = {
  "Residential": ["Clement", "Fred Brown", "Reese", "Massey"],
  "Parking": ["G10", "11th Street", "White Ave"],
  "The Hill": ["Ayres", "Perkins", "SERF"],
  "Recreation/Sports": ["Neyland Stadium","TRECS", "Thompson-Bowling"],
  "Other": ["Hodges Library", "Student Union"]
};

const campusAreaNames = Object.keys(campusAreas); // Extract area names

const postData = async (objType: string, obj: object) => {
  try {
    const docRef = await addDoc(collection(FIRESTORE, objType), obj);
    console.log("Document uploaded with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error uploading document: ", error);
    return false;
  }
};

const genID = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < ID_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const ReportScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);

  // Area and building state and modal visibility
  const [area, setArea] = useState("Select Area");
  const [building, setBuilding] = useState("Select Building");
  const [isAreaModalVisible, setIsAreaModalVisible] = useState(false);
  const [isBuildingModalVisible, setIsBuildingModalVisible] = useState(false);

  // Category state and modal visibility
  const [category, setCategory] = useState("Select Category");
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

  // Emergence rating state
  const [emergenceRating, setEmergenceRating] = useState(0); // 1 to 5 rating

  const categoryItems = [
    "Plumbing",
    "Electrical",
    "HVAC",
    "Paint",
    "Flooring",
    "Appliance",
    "Landscaping",
    "Security",
    "Windows/Doors",
    "Safety",
    "Exterior",
    "Parking Lot/Garage",
    "Other",
  ];

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

  const handleSubmit = () => {
    // Validate fields
    if (!title) {
      Alert.alert("Error", "Please enter a title.");
      return;
    }

    if (category === "Select Category") {
      Alert.alert("Error", "Please select a category.");
      return;
    }

    if (area === "Select Area") {
      Alert.alert("Error", "Please select an area.");
      return;
    }

    if (building === "Select Building") {
      Alert.alert("Error", "Please select a building.");
      return;
    }

    if (!description) {
      Alert.alert("Error", "Please enter a description.");
      return;
    }

    if (emergenceRating === 0) {
      Alert.alert("Error", "Please select an emergence level.");
      return;
    }

    // Check if there is at least one photo uploaded
    const hasPhoto = images.some((image) => image !== null);
    if (!hasPhoto) {
      Alert.alert("Error", "Please upload at least one photo.");
      return;
    }

    // Create an object with the input data
    const ticket = {
      ID: genID(),
      title: title,
      description: description,
      category: category,
      area: area,
      building: building,
      emergenceRating: emergenceRating,
      image: images.filter((img) => img !== null),
    };

    postData(OBJ_TYPE, ticket);

    setTitle("");
    setCategory("Select Category");
    setArea("Select Area");
    setBuilding("Select Building");
    setDescription("");
    setEmergenceRating(0);
    setImages([null, null, null]);

    Alert.alert("Success", "Report has been saved!");
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

  const renderAreaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setArea(item);
        setBuilding("Select Building"); // Reset building when area changes
        setIsAreaModalVisible(false);
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const renderBuildingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setBuilding(item);
        setIsBuildingModalVisible(false);
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  // Function to render 1-5 bubble rating system
  const renderBubbles = () => {
    let bubbles = [];
    for (let i = 1; i <= 5; i++) {
      bubbles.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.bubble,
            emergenceRating === i && styles.selectedBubble, // Highlight selected bubble
          ]}
          onPress={() => setEmergenceRating(i)}
        >
          <Text style={styles.bubbleText}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return bubbles;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>REPORT</Text>

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

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

        {/* Area Dropdown */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setIsAreaModalVisible(true)}
        >
          <Text>{area}</Text>
        </TouchableOpacity>

        <Modal
          visible={isAreaModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={campusAreaNames}
                renderItem={renderAreaItem}
                keyExtractor={(item) => item}
              />
              <Button
                title="Close"
                onPress={() => setIsAreaModalVisible(false)}
              />
            </View>
          </View>
        </Modal>

        {/* Building Dropdown */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => {
            if (area !== "Select Area") {
              setIsBuildingModalVisible(true);
            } else {
              Alert.alert("Select Area", "Please select an area first.");
            }
          }}
        >
          <Text>{building}</Text>
        </TouchableOpacity>

        <Modal
          visible={isBuildingModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={campusAreas[area] || []} // Filter buildings by selected area
                renderItem={renderBuildingItem}
                keyExtractor={(item) => item}
              />
              <Button
                title="Close"
                onPress={() => setIsBuildingModalVisible(false)}
              />
            </View>
          </View>
        </Modal>

        <TextInput
          style={styles.textArea}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />

        {/* Emergence Rating */}
        <Text style={styles.emergenceLabel}>Emergence Level:</Text>
        <View style={styles.bubbleContainer}>{renderBubbles()}</View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#fff",
  },
  emergenceLabel: {
    padding: 10,
  },
  header: {
    fontSize: 30,
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
    marginBottom: 15,
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
  bubbleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  bubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedBubble: {
    backgroundColor: "#FFD700", // Highlight selected bubble with gold color
  },
  bubbleText: {
    fontSize: 18,
    color: "#fff", // Text color inside the bubble
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
