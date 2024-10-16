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

  const categoryItems = ["Technology", "Health", "Education"];
  const locationItems = ["New York", "Los Angeles", "Chicago"];

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

  const handleSubmit = () => {
    images.forEach((image) => {
      if (image) {
        console.log("Uploading compressed image:", image);
      }
    });
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>REPORT</Text>

      <TextInput
        style={styles.input}
        placeholder="Topic"
        value={topic}
        onChangeText={setTopic}
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
