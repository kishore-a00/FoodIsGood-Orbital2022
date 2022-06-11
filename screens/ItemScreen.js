import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import ForReview from "../components/ForReview";
import ListReview from "../components/ListReview";
import { RatingSystem } from "../components/RatingSystem";

//Text should show whatever the user selected previously
//Text below should be fetched from database
//unable to get picture from internet
export const ItemScreen = ( {navigation} ) => {
  return (
    <View>
      <Text style={styles.headertext}> Black Pepper Chicken Chop </Text>
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
