import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import initializeApp from "../../firebase-config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { useIsFocused } from "@react-navigation/native";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;
const EMPTY_IMAGE =
  "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png";

interface Ticket {
  title: string;
  category: string;
  location: string;
  priority: string;
  detail: string;
  images: string[];
  status: string;
}

// Extend Ticket to include the Firestore-generated ID
interface TicketWithID extends Ticket {
  id: string;
}

const splitString = (str: string, delimiter: string) => {
  const index = str.indexOf(delimiter);
  if (index === -1) return str;
  return str.substring(index + 2);
};

const shortenString = (str: string, length: number) => {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
};

export default function Dashboard() {
  const [tickets, setTickets] = useState<TicketWithID[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const firestore = getFirestore(initializeApp);
      const querySnapshot = await getDocs(collection(firestore, "tickets"));

      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TicketWithID[];

      setTickets(docs);
    } catch (error) {
      Alert.alert("Error", "Could not fetch data. Please contact Admin!");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Refresh when this page is focus
  const isFocused = useIsFocused();
  useEffect(() => {
    setLoading(true);
    getData();
  }, [isFocused]);

  // Refresh when the list is pull-and-drop
  const handleRefresh = () => {
    getData();
  };

  const onPressHandle = () => {
    alert("Clicked!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.search}>{"Search"}</Text>
      <Text style={styles.sort}>{"Sort by: Location | Type | Newest\n"}</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          scrollEnabled={true}
          scrollToOverflowEnabled={true}
          removeClippedSubviews={true}
          data={tickets}
          renderItem={({ item }: { item: TicketWithID }) => (
            <TouchableOpacity
              style={styles.ticketView}
              delayPressIn={50}
              activeOpacity={0.4}
              onPress={onPressHandle}
            >
              <Image
                style={styles.images}
                source={
                  !!item.images ? { uri: item.images[0] } : { uri: EMPTY_IMAGE }
                }
              ></Image>
              <View style={styles.textView}>
                <View style={styles.veriTxtView}>
                  <Text style={styles.title}>
                    {shortenString(item.title, 15)}
                  </Text>
                  <Text style={styles.detail}>
                    {shortenString(item.detail, 50)}
                  </Text>
                </View>
                <View style={styles.horiTxtView}>
                  <Text style={styles.location}>
                    {splitString(item.location, ":")}
                  </Text>
                  <Text style={styles.status}>{item.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          refreshing={loading} // Controls the loading indicator for pull-to-refresh
          onRefresh={handleRefresh} // Pull-to-refresh handler
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  ticketView: {
    height: 0.15 * HEIGHT,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "orange",
  },
  images: {
    height: "92%",
    width: "31%",
    marginTop: "1%",
    marginRight: "1%",
  },
  textView: {
    height: "94%",
    width: "68%",
    marginTop: "1%",
    marginBottom: "1%",
    flexDirection: "column",
  },
  veriTxtView: {
    height: "80%",
    width: "100%",
    marginTop: "1%",
    marginBottom: "1%",
    flexDirection: "column",
  },
  search: {
    color: "red",
    fontSize: 17,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  sort: {
    color: "blue",
    fontSize: 17,
    alignSelf: "flex-end",
    marginTop: 5,
  },
  title: {
    color: "purple",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  detail: {
    color: "black",
    fontSize: 14,
    fontWeight: "light",
    textAlign: "left",
    marginLeft: "1%",
  },
  horiTxtView: {
    height: "15%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  location: {
    color: "green",
    fontSize: 14,
    fontWeight: "light",
    textAlign: "left",
    marginLeft: "1%",
  },
  status: {
    color: "red",
    fontSize: 14,
    fontWeight: "light",
    textAlign: "right",
    marginRight: "1%",
  },
});
