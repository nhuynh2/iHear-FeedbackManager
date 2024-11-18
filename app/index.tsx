import React from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Keyboard,
  Dimensions,
  Image,
} from "react-native";

import BoxButton from "@/components/BoxButton";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";

export default function Index() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      setErrorMsg(""); // clear the msg
    } catch (error: any) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setErrorMsg("Invalid email form.");
      } else if (error.code === "auth/invalid-credential") {
        setErrorMsg("Incorrect email or password.");
      } else if (error.code === "auth/email-already-in-use") {
        setErrorMsg("This account is already in use.");
      } else if (error.code === "auth/network-request-failed") {
        setErrorMsg("Please check internet connection.");
      } else {
        setErrorMsg("Unknown error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.img}
          />
          <Text style={styles.title}>Welcome to iHear</Text>
          <TextInput
            placeholder="Email"
            style={[styles.input, loading && styles.greyedOut]}
            value={email}
            onChangeText={setEmail}
            editable={!loading}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            style={[styles.input, loading && styles.greyedOut]}
            value={password}
            onChangeText={setPassword}
            editable={!loading}
            secureTextEntry
          />
          {/* Conditionally render the error message */}
          {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}

          {/* Conditionally render the loading-wheel or button */}
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <BoxButton
              title="Sign-In"
              onPress={handleSignIn}
              boxStyle={[styles.buttonBox, loading && styles.greyedOut]}
              textStyle={[styles.buttonText, loading && styles.greyedOut]}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: "5%",
    backgroundColor: "#FFF5E1",
  },
  img: {
    height: 150,
    width: 150,
    marginTop: "1%",
    marginRight: "1%",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#FF8C00",
    marginBottom: 40,
  },
  input: {
    fontSize: 20,
    width: "95%",
    padding: 15,
    marginBottom: 20,
    borderColor: "#FF8C00",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  // Grey-out text input while loading
  greyedOut: {
    backgroundColor: "#d3d3d3",
    color: "#a9a9a9",
  },
  buttonBox: {
    marginTop: "5%",
    width: "95%",
    borderRadius: 20,
    backgroundColor: "orange",
  },
  buttonText: {
    color: "black",
    fontSize: 25,
    textAlign: "center",
  },
  loadingIndicator: {
    margin: "5%",
  },
  errorMsg: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 20,
  },
});
