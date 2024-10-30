import React from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import auth from "@react-native-firebase/auth";

import data from "../../assets/data/ticketdetail.json";

export default function SignOut() {
  const user = auth().currentUser;

  return (
    <View style={styles.container}>
      <Text> Welcome {user?.email} </Text>
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "2%",
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: "1%",
    height: "15%",
    borderWidth: 1,
    borderRadius: 5,
    padding: "2%",
    backgroundColor: "white",
    fontSize: 20,
  },
  loadingIndicator: {
    margin: "5%",
  },
});
