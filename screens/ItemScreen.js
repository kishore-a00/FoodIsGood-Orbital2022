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

  //Filtering the review database based on the item the user selected in StallScreen
  const ShowReview = async () => {
    let { data: all_reviews, error } = await supabase
      .from("all_reviews")
      .select('*, profiles(*)') //Query profiles table to fetch username based on uuid of each review
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
  const DeleteAlert = () => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => DeleteReview() },
      ],
      { cancelable: false }
    );
  };
  // Function to delete the review from the database
  const DeleteReview = async () => {
    const { data, error } = await supabase
      .from("all_reviews")
      .delete()
      .eq("review_id", update_id);
  };

//Info button
React.useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () =>
    <Button 
    onPress={() => 
      Alert.alert("Welcome to the " + route.params.item_name + " section!", 
      "This page lists all the reviews of this item.\n\n" +
      "These reviews were written by your fellow schoolmates!\n\n" +
      "See a review you agree with? Click the \"Thumbs up\" upvote button!\n\n" +
      "Want to write your own review? Click the \"Post a review\!\" button!\n\n" + 
      "Written a review and wish to edit or delete it? Locate your review and select the corresponding button.\n\n" +
      "To navigate back to the stall page, press the left arrow on the top left hand corner of your screen.", 
      [{text: "Ok", onPress: () => console.log("pressed")}])} 
    title="?" />,
    })
  })

  return (
    <View>
      {/* Post a review button */}
      <Text style={styles.headertext}> {route.params.item_name} </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Review", { item_id: route.params.item_id, item_name: route.params.item_name })
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
            <View style={styles.reviewbuttons}>
              {/* Edit button for user to edit their specific review */}
              <View>
                <TouchableOpacity
                  style={
                    item.id == supabase.auth.user().id
                      ? styles.editbutton
                      : styles.cannoteditbutton
                  }
                  onPress={() => {
                    update_id = item.review_id;
                    navigation.navigate("Edit Review", {
                      review_id: item.review_id,
                      item_name: route.params.item_name
                    });
                  }}
                >
                  <Text> Edit </Text>
                </TouchableOpacity>
              </View>
              {/* Delete button for user to delete their specific review */}
              <View>
                <TouchableOpacity
                  style={
                    item.id == supabase.auth.user().id
                      ? styles.editbutton
                      : styles.cannoteditbutton
                  }
                  onPress={() => {
                    update_id = item.review_id;
                    DeleteAlert();
                  }}
                >
                  <Text> Delete </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={
                  pressed ? styles.pressedupvotebutton : styles.upvotebutton
                }
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

                {/* Minor bug with flex on image,caused it to stretch the whole screen */}
                <ImageBackground
                  style={styles.upvoteimage}
                  source={require("../assets/images/thumbsup.png")}
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
            </View>
            <Text style={styles.reviewtext}>
              Username: {item.profiles.username} {"\n"}
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
    marginVertical: 10,
    marginHorizontal: 10,
  },
  pressedupvotebutton: {
    alignSelf: "flex-end",
    marginVertical: 10,
    marginHorizontal: 10,
    opacity: 0.2,
  },
  upvoteimage: {
    justifyContent: "center",
  },
  reviewbuttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  editbutton: {
    flex: 1,
    marginBottom: 5,
    marginHorizontal: 5,
    borderRadius: 4,
    backgroundColor: "aquamarine",
    justifyContent: "center",
  },
  cannoteditbutton: {
    opacity: 0,
  },
});
