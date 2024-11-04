import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import auth from "@react-native-firebase/auth"; // Use Firebase Auth, adjust if you're using another method
import { useNavigation, StackActions } from "@react-navigation/native";

export default function SignOut() {
  const navigation = useNavigation();

  useEffect(() => {
    const signOutUser = async () => {
      try {
        await auth().signOut();
        // Use reset to navigate to the index screen and clear the stack
        navigation.dispatch(StackActions.replace("index"));
      } catch {
        alert("Error signing out:");
      }
    };

    signOutUser();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
