import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import auth, {
  FirebaseAuthTypes,
  onAuthStateChanged,
} from "@react-native-firebase/auth";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("onAuthStateChanged", user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    if (initializing) return;
    const inAuthGroup = segments[0] === "(auth)";

    if (user && !inAuthGroup) {
      router.push("/(auth)/home");
    } else if (!user && inAuthGroup) {
      router.replace("/");
    }
    return subscriber;
  }, [user, initializing]);

  if (initializing)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
