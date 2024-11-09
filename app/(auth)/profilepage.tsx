import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import data from "../../assets/data/profilepage.json";

const staticAvatarUri = "https://www.w3schools.com/w3images/avatar2.png";

export default function ProfilePage() {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.profilePage}>
        {/* Avatar Section */}
        <TouchableOpacity style={styles.avatarSection} onPress={() => {}}>
          <Image source={{ uri: staticAvatarUri }} style={styles.avatarImage} />
        </TouchableOpacity>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>ID:</Text>
            <View style={styles.valueContainer}>
              <TextInput
                style={[styles.valueBox, styles.valueText]}
                value={data.profile.netID}
                editable={false}
              />
              <TouchableOpacity
                onPress={() => {
                  /* No action for now */
                }}
              >
                <Ionicons
                  name="pencil"
                  size={27}
                  color="grey"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            <View style={styles.valueContainer}>
              <TextInput
                style={[styles.valueBox, styles.valueText]}
                value={data.profile.name}
                editable={false}
              />
              <TouchableOpacity
                onPress={() => {
                  /* No action for now */
                }}
              >
                <Ionicons
                  name="pencil"
                  size={27}
                  color="grey"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Role:</Text>
            <View style={styles.valueContainer}>
              <TextInput
                style={[styles.valueBox, styles.valueText]}
                value={data.profile.role}
                editable={false}
              />
              <TouchableOpacity
                onPress={() => {
                  /* No action for now */
                }}
              >
                <Ionicons
                  name="pencil"
                  size={27}
                  color="grey"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <View style={styles.valueContainer}>
              <TextInput
                style={[styles.valueBox, styles.valueText]}
                value={data.profile.contact.email}
                editable={false}
              />
              <TouchableOpacity
                onPress={() => {
                  /* No action for now */
                }}
              >
                <Ionicons
                  name="pencil"
                  size={27}
                  color="grey"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  profilePage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "white",
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },
  avatarImage: {
    width: 200,
    height: 200,
    borderRadius: 60,
  },
  infoSection: {
    width: "100%",
    marginTop: 25,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333333",
    width: "17%",
  },
  valueContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  valueBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  valueText: {
    fontSize: 18,
    color: "#333",
  },
  icon: {
    marginLeft: 10,
  },
});
