import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import ForReview from "../components/ForReview";
import ListReview from "../components/ListReview";

//Text should show whatever the user selected previously
//Text below should be fetched from database
//unable to get picture from internet
export const ItemScreen = () => {
  return (
    <View>
      <Text style={styles.headertext}> Black Pepper Chicken Chop </Text>
      <ForReview />
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
});
