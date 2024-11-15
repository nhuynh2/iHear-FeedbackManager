import React, { useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation, StackActions, useFocusEffect } from "@react-navigation/native";

export default function SignOut() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const confirmSignOut = () => {
        Alert.alert(
          "Sign Out",
          "Are you sure you want to sign out?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => navigation.goBack(), // Goes back if canceled
            },
            {
              text: "Yes",
              onPress: async () => {
                setLoading(true); // Start loading when user confirms
                try {
                  await auth().signOut();
                  navigation.dispatch(StackActions.replace("index")); // Navigate to the sign-in screen
                } catch (error) {
                  setLoading(false); // Stop loading if there's an error
                  alert("Error signing out.");
                }
              },
            },
          ],
          { cancelable: false }
        );
      };

      // Show the confirmation dialog each time the screen is focused
      confirmSignOut();
    }, [navigation])
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}
