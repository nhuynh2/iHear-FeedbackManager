import { Stack, Tabs } from "expo-router";
import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import auth, {
  FirebaseAuthTypes,
  onAuthStateChanged,
} from "@react-native-firebase/auth";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="profilepage"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "Report",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "send" : "send-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "list" : "list-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ticketdetails"
        options={{
          title: "Detail",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "information" : "information-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "Post",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "arrow-up" : "arrow-up-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="signout"
        options={{
          title: "Sign Out",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "eye-off" : "eye-off-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
