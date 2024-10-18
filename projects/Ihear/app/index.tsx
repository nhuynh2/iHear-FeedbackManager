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
  Platform,
  Keyboard,
  Dimensions,
  Image,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import BoxButton from "@/components/BoxButton";

export default function Index() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      alert("Check your email");
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      alert("Check your email");
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("Sign in failed: " + err.message);
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
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <BoxButton
              text="Sign In"
              textColor="white"
              textSize={22}
              boxColor="#078a48"
              onPress={signIn}
            />
            <BoxButton
              text="Sign Up"
              textColor="white"
              textSize={22}
              boxColor="#0cb9f7"
              onPress={signUp}
            />
          </View>
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
    padding: "5%",
    backgroundColor: "#FFF5E1",
  },
  img: {
    height: 200,
    width: 200,
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
    width: "90%",
    padding: 15,
    marginBottom: 20,
    borderColor: "#FF8C00",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    width: "90%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  loadingIndicator: {
    margin: "5%",
  },
});
