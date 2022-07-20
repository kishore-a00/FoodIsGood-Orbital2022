import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  Touchable,
  ImageBackground,
} from "react-native";
import { supabase } from "../lib/supabase";

//Functionality to fetch image from the database
//{item_id: route.params.item_id} in review section. Be able to pass the data to the ReviewScreen
//Unable to add image inside

export const ItemScreen = ({ navigation, route }) => {
  const [review, setReview] = useState("");
  const [pressed, setPressed] = useState(false);
  var value_to_update = 0;
  var update_id = 0;

  //Filtering the database based on the item the user selected in StallScreen
  const ShowReview = async () => {
    let { data: all_reviews, error } = await supabase
      .from("all_reviews")
      .select("*")
      .order("votes", { ascending: false })
      .eq("item_id", route.params.item_id);
    return { all_reviews, error };
  };
  const LoadReview = async () => {
    const { all_reviews, error } = await ShowReview();
    setReview(all_reviews);
  };
  useEffect(() => {
    LoadReview();
  });
  // Function updates the database with the review's new votecount
  const updateVote = async () => {
    setPressed(true);
    const { data, error } = await supabase
      .from("all_reviews")
      .update({ votes: value_to_update })
      .eq("review_id", update_id);
  };

  return (
    <View>
      {/* Post a review button */}
      <Text style={styles.headertext}> {route.params.item_name} </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Review", { item_id: route.params.item_id })
        }
      >
        <Text style={styles.buttontext}> Post a review! </Text>
      </TouchableOpacity>

      {/* 
      <View style={styles.image}>
        <Image
          source={require("../assets/img_test.jpg")}
          style={{ width: 200, height: 200 }}
        />
      </View>
      Image of food item. Unable to implement this at the moment*/}

      {/* Header for reviews section */}
      <Text style={styles.subheadertext}>Reviews:</Text>

      {/* Listing of reviews and ratings */}
      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        keyExtractor={(item) => item.review_id}
        data={review}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={pressed ? styles.pressedupvotebutton : styles.upvotebutton}
              onPress={() => {
                value_to_update = item.votes + 1;
                update_id = item.review_id;
                updateVote();
              }}
              disabled={pressed}
            >
              <Text style={{ color: "white", backgroundColor: "#000000c0" }}>
                Upvote!
              </Text>
              <ImageBackground
                style={styles.upvoteimage}
                source={require("../assets/thumbsup.png")}
                resizeMode="contain"
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 28,
                  }}
                >
                  {item.votes}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <Text style={styles.reviewtext}>
              Review: {item.review} {"\n"}
              Taste: {item.taste} {"\n"}
              Value for money: {item.money}
            </Text>
          </View>
        )}
      />
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
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ADD8E6",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttontext: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subheadertext: {
    fontSize: 25,
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: "#A7BC5B",
  },
  image: {
    alignSelf: "center",
  },
  reviewtext: {
    alignItems: "center",
    backgroundColor: "#8DA242",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  upvotebutton: {
    alignSelf: "flex-end",
    padding: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  pressedupvotebutton: {
    alignSelf: "flex-end",
    padding: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    opacity: 0.2,
  },
  upvoteimage: {
    flex: 1,
    justifyContent: "center",
  },
});
