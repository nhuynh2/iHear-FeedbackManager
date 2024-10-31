import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Drawer } from "expo-router/drawer";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    /* This is the hamburger menu symbol */
    <Drawer
      screenOptions={{
        drawerActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerLeft: () => (
          <View style={{ paddingLeft: 15 }}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Ionicons
                name="menu"
                size={24}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      {/* Changed the Tabs to Drawer Compartments*/}
      <Drawer.Screen
        name="profilepage"
        options={{
          title: "Profile",
          drawerIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => <Ionicons name={"person"} size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="report"
        options={{
          title: "Report",
          drawerIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => <Ionicons name={"warning"} size={24} color={color} />,
        }}
      />

      <Drawer.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          drawerIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => <Ionicons name={"home"} size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="ticketdetails"
        options={{
          title: "Detail",
          drawerIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <Ionicons name={"information-circle"} size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="signout"
        options={{
          title: "Sign Out",
          drawerIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <Ionicons name={"walk"} size={24} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
