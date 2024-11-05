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
import {
  launchImageLibrary,
  launchCamera,
  CameraOptions,
  MediaType,
} from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import firebaseConfig from "../../firebase-config";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import Category from "@/components/Category";

const FIREBASE_CONFIG = initializeApp(firebaseConfig);
const FIRESTORE = getFirestore(FIREBASE_CONFIG);
const OBJ_TYPE = "tickets";

const TITLE_DEFAULT = "Enter Title...";
const CATEGORY_DEFAULT = "Selec Category";
const PRIORITY_DEFAULT = "Select Priority";
const LOCATION_DEFAULT = "Select Location";
const DETAIL_DEFAULT = "Enter Detail...";
const UID_DEFAULT = "phoang5";

const ticket = {
  title: "",
  category: "",
  priority: "",
  location: "",
  detail: "",
  image: [""],
  status: "open",
  user_id: "",
  staff_ids: [""],
  manager_ids: "",
};

const categoryList = [
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

const priorityList = ["High", "Normal", "Low"];

const locationList = [
  "MKB-Outside",
  "MKB-622",
  "MKB-524",
  "MKB-419",
  "DOU-Outside",
  "DOU-416",
  "ZEC-Outside",
  "ZEC-271",
  "ZEC-373",
  "STR-Outside",
  "STR-102",
  "STR-203",
  "Other",
];

const postData = async (objType: string, obj: object) => {
  try {
    const docRef = await addDoc(collection(FIRESTORE, objType), obj);
    //console.log("Document uploaded with ID: ", docRef.id);
    return true;
  } catch (error) {
    //console.error("Error uploading document: ", error);
    return false;
  }
};

const ReportScreen = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [location, setLocation] = useState("");
  const [detail, setDetail] = useState("");
  const [images, setImages] = useState([""]);

  const handleCategory = (value: string) => {
    setCategory(value);
  };

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
    const options: CameraOptions = {
      mediaType: "photo", // Use a specific value instead of string
      quality: 0.8,
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
    const options: CameraOptions = {
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
    if (title === TITLE_DEFAULT) {
      Alert.alert("Error", "Please enter title.");
      return;
    }

    if (category === CATEGORY_DEFAULT) {
      Alert.alert("Error", "Please select a category.");
      return;
    }

    if (priority === PRIORITY_DEFAULT) {
      Alert.alert("Error", "Please select a priority.");
      return;
    }

    if (location === LOCATION_DEFAULT) {
      Alert.alert("Error", "Please select a location.");
      return;
    }

    if (detail === DETAIL_DEFAULT) {
      Alert.alert("Error", "Please enter detail.");
      return;
    }

    // Check if there is at least one photo uploaded
    const hasPhoto = images.some((image) => image !== null);
    if (!hasPhoto) {
      Alert.alert("Error", "Please upload at least one photo.");
      return;
    }

    postData(OBJ_TYPE, ticket);

    setTitle(TITLE_DEFAULT);
    setCategory(CATEGORY_DEFAULT);
    setPriority(PRIORITY_DEFAULT);
    setLocation(LOCATION_DEFAULT);
    setDetail(DETAIL_DEFAULT);
    setImages([""]);

    Alert.alert("Success", "Report has been saved!");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={TITLE_DEFAULT}
          value={title}
          onChangeText={setTitle}
        />

        <Category
          categoryList={categoryList}
          onSelect={handleCategory}
          customStyle={styles.input}
        />

        <TextInput
          style={styles.textInput}
          placeholder={DETAIL_DEFAULT}
          value={detail}
          onChangeText={setDetail}
          multiline={true}
        />

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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#fff",
  },
  emergenceLabel: {
    padding: 10,
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
  textInput: {
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
