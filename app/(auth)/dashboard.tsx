import React from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import data from "../../assets/data/tickets.json";
import AddTicketButton from "../../components/AddTicketButton.tsx";
import { useRouter } from 'expo-router';
import { ROUTES } from "../../components/navigation/routes";
import Animated, {
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
    withTiming,
    } from 'react-native-reanimated';

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const Dashboard = () => {
  const router = useRouter(); // Move useRouter hook here
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollHandler = useScrollViewOffset(scrollRef);
    const buttonStyle = useAnimatedStyle(() => {
        return {
            opacity: scrollHandler.value < 60 ? withTiming(1) : withTiming(0),
            }
        });
  const onPressHandle = (status) => {
      router.push(ROUTES.TICKET_DETAILS); // Navigate to the Ticket Details page
  };

  type ItemProps = {
    image: string;
    problem: string;
    detail: string;
    location: string;
    status: string;
  };

  const Item = ({ image, problem, detail, location, status }: ItemProps) => (
    <TouchableOpacity
      style={styles.ticketView}
      delayPressIn={50}
      activeOpacity={0.4}
      onPress={() => onPressHandle(status)} // Use the onPressHandle function here
    >
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.textView}>
        <View style={styles.veriTxtView}>
          <Text style={styles.problem}>{problem}</Text>
          <Text style={styles.detail}>{detail}</Text>
        </View>
        <View style={styles.horiTxtView}>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.status}>{status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screenView}>
      <Text style={styles.title}>{"DASHBOARD"}</Text>
      <Text style={styles.search}>{"Search"}</Text>
      <Text style={styles.sort}>{"Sort by: Location | Type | Newest\n"}</Text>
      <FlatList
        ref={scrollRef}
        scrollEnabled={true}
        scrollToOverflowEnabled={true}
        removeClippedSubviews={true}
        data={data}
        renderItem={({ item }) => (
          <Item
            image={item.image}
            problem={item.problem}
            detail={item.detail}
            location={item.location}
            status={item.status}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <Animated.View style ={[buttonStyle, { position: 'absolute', right: 10, bottom: 10 } ]}>
          <AddTicketButton />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "15%",
    backgroundColor: "white",
  },
  ticketView: {
    height: 0.15 * HEIGHT,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "orange",
  },
  image: {
    height: "94%",
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
  title: {
    color: "green",
    fontSize: 35,
    fontWeight: "bold",
    alignSelf: "center",
  },
  search: {
    color: "red",
    fontSize: 17,
    alignSelf: "flex-end",
  },
  sort: {
    color: "blue",
    fontSize: 17,
    alignSelf: "flex-end",
  },
  problem: {
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

export default Dashboard;
