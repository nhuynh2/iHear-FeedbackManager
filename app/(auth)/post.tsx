import React from "react";
import { Button, View } from "react-native";
import firebaseConfig from "../../firebase-config"; // Import Firestore instance
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore"; // Import Firestore methods

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const App: React.FC = () => {
  const postData = async () => {
    try {
      // Reference a collection in Firestore (replace "your-collection-name" with your collection name)
      const docRef = await addDoc(
        collection(firestore, "your-collection-name"),
        {
          name: "John Doe", // String
          age: 30, // Number
          city: "New York", // String
        }
      );

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View>
      <Button title="Post Data to Firestore" onPress={postData} />
    </View>
  );
};

export default App;
