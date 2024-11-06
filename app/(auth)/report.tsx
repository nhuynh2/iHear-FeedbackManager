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
  FlatList,
  ScrollView,
  Keyboard,
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
import SearchSelect from "@/components/SearchSelect";
import BoxButton from "@/components/BoxButton";

const FIREBASE_CONFIG = initializeApp(firebaseConfig);
const FIRESTORE = getFirestore(FIREBASE_CONFIG);
const OBJ_TYPE = "tickets";

const TITLE_DEFAULT = "Enter Title...";
const CATEGORY_DEFAULT = "Select Category";
const LOCATION_DEFAULT = "Select Location";
const PRIORITY_DEFAULT = "Select Priority";
const DETAIL_DEFAULT = "Enter Detail...";
const UID_DEFAULT = "phoang5";

const ticket = {
  title: "",
  category: "",
  location: "",
  priority: "",
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
  "Other (Specify in Detail)",
];

const locationList = [
  "Min H. Kao: MKB-Outside",
  "Min H. Kao: MKB-622",
  "Min H. Kao: MKB-524",
  "Min H. Kao: MKB-419",
  "Dougherty Engineering: DOU-Outside",
  "Dougherty Engineering: DOU-416",
  "Zeanah Engineering: ZEC-Outside",
  "Zeanah Engineering: ZEC-271",
  "Zeanah Engineering: ZEC-373",
  "Strong Hall: STR-Outside",
  "Strong Hall: STR-102",
  "Strong Hall: STR-203",
  "Strong Hall: Other",
  "Other (Specify in Detail)",
];

const priorityList = ["High", "Normal", "Low"];

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
  // Ticket properties
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("");
  const [detail, setDetail] = useState("");
  const [images, setImages] = useState([""]);

  // Ticket validation
  // -1: Not input
  // 0: Invalid
  // 1: Valid
  const [valid, setValid] = useState({
    title: -1,
    category: -1,
    location: -1,
    priority: -1,
    detail: -1,
    images: -1,
  });

  const handleTitle = (value: string) => {
    setTitle(value);
    if (typeof value === "string" && value.trim().length > 0) {
      setValid({ ...valid, title: 1 });
    } else {
      setValid({ ...valid, title: 0 });
    }
  };

  const handleTitleBlur = () => {
    setTitle(title);
    if (typeof title === "string" && title.trim().length > 0) {
      setValid({ ...valid, title: 1 });
    } else {
      setValid({ ...valid, title: 0 });
    }
    if (Keyboard.isVisible()) Keyboard.dismiss();
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    if (categoryList.includes(category)) {
      setValid({ ...valid, category: 1 });
    } else {
      setValid({ ...valid, category: 0 });
    }
  };

  const handleLocation = (value: string) => {
    setLocation(value);
    if (locationList.includes(location)) {
      setValid({ ...valid, location: 1 });
    } else setValid({ ...valid, location: 0 });
  };

  const handlePriority = (value: string) => {
    setPriority(value);
    if (priorityList.includes(priority)) {
      setValid({ ...valid, priority: 1 });
    } else setValid({ ...valid, priority: 0 });
  };

  const handleDetail = (value: string) => {
    setDetail(value);
    if (typeof value === "string" && value.trim().length > 0) {
      setValid({ ...valid, detail: 1 });
    } else {
      setValid({ ...valid, detail: 0 });
    }
  };

  const handleDetailBlur = () => {
    setTitle(detail);
    if (typeof detail === "string" && detail.trim().length > 0) {
      setValid({ ...valid, detail: 1 });
    } else {
      setValid({ ...valid, detail: 0 });
    }
    if (Keyboard.isVisible()) Keyboard.dismiss();
  };

  const inputValidating = () => {
    if (valid.title !== 1) {
      alert("Invalid title");
      return false;
    }

    if (valid.category !== 1) {
      alert("Invalid category");
      return false;
    }

    if (valid.location !== 1) {
      alert("Invalid location");
      return false;
    }

    if (valid.priority !== 1) {
      alert("Invalid priority");
      return false;
    }

    if (valid.detail !== 1) {
      alert("Invalid detail");
      return false;
    }

    return true;
  };

  const handleChooseImages = (index: number) => {
    Alert.alert(
      "Upload Images",
      "Choose a images source",
      [
        {
          text: "Take Images",
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

  const handleSubmit = async () => {
    if (Keyboard.isVisible()) Keyboard.dismiss();
    if (!inputValidating()) return;

    // Check if there is at least one images uploaded
    const hasImages = images.some((image) => image !== null);
    if (!hasImages) {
      Alert.alert("Error", "Please upload at least one images.");
      return;
    }

    //await postData(OBJ_TYPE, ticket);

    Alert.alert("Success", "Report has been saved!");
  };
  return (
    <View style={styles.container}>
      {/* Ticket title */}
      <TextInput
        placeholder={TITLE_DEFAULT}
        value={title}
        onChangeText={handleTitle}
        onBlur={handleTitleBlur}
        style={[
          styles.ticketTitle,
          { borderColor: valid.title === 0 ? "red" : "black" },
        ]}
      />

      {/* Ticket Category */}
      <SearchSelect
        placeholder={CATEGORY_DEFAULT}
        allowDefault={true}
        itemList={categoryList}
        onSelect={handleCategory}
        customStyle={[
          styles.ticketSelectText,
          { borderColor: valid.category === 0 ? "red" : "black" },
        ]}
      />

      {/* Ticket Location */}
      <SearchSelect
        placeholder={LOCATION_DEFAULT}
        allowDefault={true}
        itemList={locationList}
        onSelect={handleLocation}
        customStyle={[
          styles.ticketSelectText,
          { borderColor: valid.location === 0 ? "red" : "black" },
        ]}
      />

      {/* Ticket Priority */}
      <SearchSelect
        placeholder={PRIORITY_DEFAULT}
        allowDefault={false}
        itemList={priorityList}
        onSelect={handlePriority}
        customStyle={[
          styles.ticketSelectText,
          { borderColor: valid.priority === 0 ? "red" : "black" },
        ]}
      />

      {/* Ticket Detail */}
      <TextInput
        placeholder={DETAIL_DEFAULT}
        value={detail}
        onChangeText={handleDetail}
        onBlur={handleDetailBlur}
        multiline={true}
        style={[
          styles.ticketDetail,
          { borderColor: valid.detail !== 0 ? "black" : "red" },
        ]}
      />

      {/* Ticket Images */}
      <View style={styles.imagesContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imagesBox}
            onPress={() => handleChooseImages(index)}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.images} />
            ) : (
              <Text>Images {index + 1}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <BoxButton
        title="Submit"
        onPress={handleSubmit}
        boxStyle={styles.buttonBox}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
  },
  ticketTitle: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  ticketSelectText: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 18,
  },
  ticketDetail: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    height: 100,
    marginBottom: 10,
    fontSize: 18,
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  imagesBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  images: {
    width: "100%",
    height: "100%",
  },
  buttonBox: {
    width: "80%",
    backgroundColor: "#006646",
    alignSelf: "center",
  },
});

export default ReportScreen;
