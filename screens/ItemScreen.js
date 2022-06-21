import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import ListReview from "../components/ListReview";

//Functionality to fetch image from the database
//Check if the app works
//Modify the list review function
//Push to github

export const ItemScreen = ( {navigation, route} ) => {
  return (
    <View>
      <Text style={styles.headertext}> {route.params.item_name} </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Review")}>
        <Text> Post a review! </Text>
      </TouchableOpacity>


      <View style={styles.image}>
        <Image
          source={require("../assets/img_test.jpg")}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <ListReview />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headertext: {
    color: "#A7BC5B",
    fontSize: 28,
  },
  innertext: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  image: {
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#8DA242",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
