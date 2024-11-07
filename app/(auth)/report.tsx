import React, { useState, useEffect } from "react";
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
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  launchImageLibrary,
  launchCamera,
  ImageLibraryOptions,
  CameraOptions,
  MediaType,
  Asset,
} from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";

import { firestore } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

import SearchSelect from "@/components/SearchSelect";
import BoxButton from "@/components/BoxButton";
import { useIsFocused } from "@react-navigation/native";

const OBJ_TYPE = "tickets";
const FONT_SIZE = 18;
const MAX_IMAGES = 5;

const TITLE_DEFAULT = "Enter Title...";
const CATEGORY_DEFAULT = "Select Category";
const LOCATION_DEFAULT = "Select Location";
const PRIORITY_DEFAULT = "Select Priority";
const DETAIL_DEFAULT = "Enter Detail...";
const UID_DEFAULT = "phoang5";

interface Ticket {
  title: string;
  category: string;
  location: string;
  priority: string;
  detail: string;
  images: (string | null)[];
  status: string;
  user_id: string;
  staff_ids: string[];
  manager_ids: string;
}

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
    const docRef = await addDoc(collection(firestore, objType), obj);
    console.log("Document uploaded with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error uploading document: ", error);
    return false;
  }
};

const ReportScreen = () => {
  // Ticket properties
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [images, setImages] = useState<(string | null)[]>([null]);
  const [clearSelections, setClearSelections] = useState(false);
  const [clearSelect, setClearSelect] = useState(0);

  const isFocused = useIsFocused();
  useEffect(() => {
    handleClear();
  }, [isFocused]);

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
    setDetail(detail);
    if (typeof detail === "string" && detail.trim().length > 0) {
      setValid({ ...valid, detail: 1 });
    } else {
      setValid({ ...valid, detail: 0 });
    }
    if (Keyboard.isVisible()) Keyboard.dismiss();
  };

  const handleChooseImages = (index: number) => {
    if (images.filter((img) => img !== null).length >= MAX_IMAGES) {
      Alert.alert(
        "Limit Reached",
        `You can only select up to ${MAX_IMAGES} images.`
      );
      return;
    }

    Alert.alert(
      "Upload Images",
      "Choose the source",
      [
        {
          text: "Take Image",
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
      mediaType: "photo",
      quality: 0.8,
    };

    launchCamera(options, async (response) => {
      if (response.assets && response.assets[0].uri) {
        const uri = response.assets[0].uri;
        const resizedImage = await ImageResizer.createResizedImage(
          uri,
          800,
          600,
          "JPEG",
          80
        );

        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = resizedImage.uri;

          if (newImages.length < MAX_IMAGES) {
            newImages.push(null); // Add new placeholder if limit is not reached
          }
          return newImages;
        });
      }
    });
  };

  const openLibrary = async (index: number) => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      selectionLimit: MAX_IMAGES - images.filter((img) => img !== null).length,
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.assets) {
        const resizedUris = await Promise.all(
          response.assets.map(async (asset: Asset) => {
            if (asset.uri) {
              const resizedImage = await ImageResizer.createResizedImage(
                asset.uri,
                800,
                600,
                "JPEG",
                80
              );
              return resizedImage.uri;
            }
          })
        );

        setImages((prevImages) => {
          const newImages = [...prevImages];
          resizedUris.forEach((uri, i) => {
            if (uri) {
              newImages[index + i] = uri;
            }
          });

          // Add a new placeholder if we haven't reached the limit yet
          if (newImages.filter((img) => img !== null).length < MAX_IMAGES) {
            newImages.push(null);
          }
          return newImages.slice(0, MAX_IMAGES); // Ensure we don't exceed MAX_IMAGES
        });
      }
    });
  };

  const imageItem = ({
    item,
    index,
  }: {
    item: string | null;
    index: number;
  }) => (
    <TouchableOpacity
      onPress={() => handleChooseImages(index)}
      style={styles.imageBox}
    >
      {item ? (
        <Image source={{ uri: item }} style={styles.image} />
      ) : (
        <Text style={styles.imageText}>Add Image</Text>
      )}
    </TouchableOpacity>
  );

  const handleValidation = () => {
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

  const handleClear = () => {
    setTitle("");
    setClearSelect(clearSelect + 1);
    setDetail("");
    setImages([null]);
    setValid({
      title: -1,
      category: -1,
      location: -1,
      priority: -1,
      detail: -1,
      images: -1,
    });
  };

  const handleSubmit = async () => {
    if (Keyboard.isVisible()) Keyboard.dismiss();
    if (!handleValidation()) return;

    const ticket: Ticket = {
      title: title,
      category: category,
      location: location,
      priority: priority,
      detail: detail,
      images: images,
      status: "open",
      user_id: "",
      staff_ids: [""],
      manager_ids: "",
    };

    if (!(await postData(OBJ_TYPE, ticket))) return;
    Alert.alert("Success", "Report has been saved!");
    handleClear();
  };

  return (
    <View style={styles.container} key={clearSelect}>
      {/* Ticket title */}
      <Text style={styles.titleField}>{"Title: "}</Text>
      <TextInput
        placeholder={TITLE_DEFAULT}
        value={title}
        onChangeText={handleTitle}
        onBlur={handleTitleBlur}
        style={[
          styles.titleValue,
          { borderColor: valid.title === 0 ? "red" : "black" },
        ]}
      />

      {/* Ticket Category */}
      <Text style={styles.selectField}>{"Category: "}</Text>
      <SearchSelect
        placeholder={CATEGORY_DEFAULT}
        hasOtherVal={true}
        itemList={categoryList}
        onSelect={handleCategory}
        boxStyle={[
          styles.selectBox,
          { borderColor: valid.category === 0 ? "red" : "black" },
        ]}
        textStyle={styles.selectText}
      />

      {/* Ticket Location */}
      <Text style={styles.selectField}>{"Location: "}</Text>
      <SearchSelect
        placeholder={LOCATION_DEFAULT}
        hasOtherVal={true}
        itemList={locationList}
        onSelect={handleLocation}
        boxStyle={[
          styles.selectBox,
          { borderColor: valid.location === 0 ? "red" : "black" },
        ]}
        textStyle={styles.selectText}
      />

      {/* Ticket Priority */}
      <Text style={styles.selectField}>{"Priority: "}</Text>
      <SearchSelect
        placeholder={PRIORITY_DEFAULT}
        hasOtherVal={false}
        itemList={priorityList}
        onSelect={handlePriority}
        boxStyle={[
          styles.selectBox,
          { borderColor: valid.priority === 0 ? "red" : "black" },
        ]}
        textStyle={styles.selectText}
      />

      {/* Ticket Detail */}
      <Text style={styles.detailField}>{"Detail: "}</Text>
      <TextInput
        placeholder={DETAIL_DEFAULT}
        value={detail}
        onChangeText={handleDetail}
        onBlur={handleDetailBlur}
        multiline={true}
        style={[
          styles.detailValue,
          { borderColor: valid.detail !== 0 ? "black" : "red" },
        ]}
      />

      {/* Ticket Images */}
      <View style={styles.imageContainer}>
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={imageItem}
          horizontal
        />
      </View>

      {/* Submit Button */}
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
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
  },
  titleField: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: FONT_SIZE,
  },
  titleValue: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    fontWeight: "normal",
    fontSize: FONT_SIZE,
  },
  selectField: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: FONT_SIZE,
  },
  selectBox: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
  },
  selectText: {
    fontSize: FONT_SIZE,
  },
  detailField: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: FONT_SIZE,
  },
  detailValue: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    height: 100,
    marginTop: 8,
    fontSize: FONT_SIZE - 2,
  },
  imageContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  imageBox: {
    width: 125,
    height: 125,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  imageText: {
    fontSize: 16,
    color: "#999",
  },
  buttonBox: {
    width: "100%",
    backgroundColor: "#006646",
    alignSelf: "center",
    marginTop: 8,
  },
});

export default ReportScreen;
