import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import data from "../../assets/data/profilepage.json";

const ProfilePage: React.FC = () => {
  const staticAvatarUri = "https://www.w3schools.com/w3images/avatar2.png";

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.profilePage}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <Image
            source={{ uri: staticAvatarUri }}
            style={styles.avatarImage}
          />
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>ID:</Text>
            <View style={styles.valueContainer}>
              <View style={styles.valueBox}>
                <Text style={styles.valueText}>{data.profile.netID}</Text>
              </View>
              <TouchableOpacity onPress={() => { /* No action for now */ }}>
                <Ionicons name="pencil" size={20} color="grey" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            <View style={styles.valueContainer}>
              <View style={styles.valueBox}>
                <Text style={styles.valueText}>{data.profile.name}</Text>
              </View>
              <TouchableOpacity onPress={() => { /* No action for now */ }}>
                <Ionicons name="pencil" size={20} color="grey" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Role:</Text>
            <View style={styles.valueContainer}>
              <View style={styles.valueBox}>
                <Text style={styles.valueText}>{data.profile.role}</Text>
              </View>
              <TouchableOpacity onPress={() => { /* No action for now */ }}>
                <Ionicons name="pencil" size={20} color="grey" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <View style={styles.valueContainer}>
              <View style={styles.valueBox}>
                <Text style={styles.valueText}>{data.profile.contact.email}</Text>
              </View>
              <TouchableOpacity onPress={() => { /* No action for now */ }}>
                <Ionicons name="pencil" size={20} color="grey" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 20,
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
    width: 150,
    height: 150,
    borderRadius: 60,
  },
  infoSection: {
    width: "100%",
    marginTop: 25,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333333",
    width: 80,
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
    paddingVertical: 20,
    paddingHorizontal: 12,
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

export default ProfilePage;
