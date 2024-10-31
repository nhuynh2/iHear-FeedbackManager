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
  Modal,
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

    const handleAnonymousSignIn = async () => {
        setLoading(true);
      try {
        const userCredential = await auth().signInAnonymously();
        alert("Continue anonymously");
        console.log('User signed in anonymously:', userCredential.user.uid);
        return userCredential.user;
      } catch (error) {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Anonymous sign-in is not enabled in your Firebase project.');
        } else {
          console.error('Anonymous sign-in error:', error);
        }
        throw error;
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
            <TouchableOpacity style={styles.button} onPress={handleAnonymousSignIn}>
                  <Text style={styles.buttonText}>Anonymous</Text>
            </TouchableOpacity>
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
  button: {
      backgroundColor: '#2196F3',
      padding: 8,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      margin: "1%",
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 22,
      textAlign: 'center',
    },
});
