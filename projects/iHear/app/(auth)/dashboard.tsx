import React from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

import data from "../../assets/data/tickets.json";

type ItemProps = {
  image: string;
  problem: string;
  detail: string;
  location: string;
  status: string;
};

const Item = ({ image, problem, detail, location, status }: ItemProps) => (
  <View style={styles.ticketView}>
    <Image style={styles.img} source={{ uri: image }}></Image>
    <View style={styles.txtCon}>
      <View style={styles.veriTxtCon}>
        <Text style={styles.problem}>{problem}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
      <View style={styles.horiTxtCon}>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
    </View>
  </View>
);

const Separator = () => {
  return <View style={styles.separator} />;
};

export default function Dashboard() {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.viewContainer}>
        <Text style={styles.title}>{"DASHBOARD"}</Text>
        <Text style={styles.search}>{"Search"}</Text>
        <Text style={styles.sort}>{"Sort by: Location | Type | Newest\n"}</Text>
        <View style={styles.listView}>
          <FlatList
            scrollEnabled={true}
            scrollToOverflowEnabled={true}
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
            ItemSeparatorComponent={Separator}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    //flex: 1,
    height: "99%",
    width: "99%",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "15%",
    //borderWidth: 3,
    //borderColor: "red",
    backgroundColor: "white",
  },
  viewContainer: {
    //flex: 1,
    height: "98%",
    width: "98%",
    //borderWidth: 3,
    //borderColor: "green",
    //backgroundColor: "green",
  },
  listView: {
    flex: 1,
    flexGrow :1,
    height: "80%",
    width: "100%",
    flexDirection: "column",
    //borderWidth: 3,
    //borderColor: "blue",
    //backgroundColor: "blue",
  },
  separator: {
    height: "1%",
    width: "100%",
    //backgroundColor: "pink",
  },
  ticketView: {
    height: 0.15 * Dimensions.get("screen").height,
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "orange",
    //backgroundColor: "purple",
  },
  img: {
    height: "94%",
    width: "31%",
    marginTop: "1%",
    marginRight: "1%",
  },
  txtCon: {
    height: "94%",
    width: "68%",
    marginTop: "1%",
    marginBottom: "1%",
    flexDirection: "column",
  },
  veriTxtCon: {
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
  horiTxtCon: {
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
