import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import ListReview from "../components/ListReview";
import { supabase } from "../lib/supabase";

//Functionality to fetch image from the database
//{item_id: route.params.item_id} in review section. Be able to pass the data to the ReviewScreen

export const ItemScreen = ( {navigation, route} ) => {
  const [review, setReview] = useState("");

  //Filtering the database based on the item the user selected in StallScreen
  const ShowReview = async () => {
    let { data: all_reviews, error } = await supabase
      .from("all_reviews")
      .select("*")
      .eq("item_id", route.params.item_id);
    return { all_reviews, error };
  };
  const LoadReview = async () => {
    const { all_reviews, error } = await ShowReview();
    setReview(all_reviews);
    // console.log(all_reviews);
    // console.log(error);
  };

  useEffect(() => {
    LoadReview();
  });
  return (
    <View>
      {/* Post a review button */}
      <Text style={styles.headertext}> {route.params.item_name} </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Review")}>
        <Text style={styles.buttontext}> Post a review! </Text>
      </TouchableOpacity>

      {/* Image of food item */}
      <View style={styles.image}>
        <Image
          source={require("../assets/img_test.jpg")}
          style={{ width: 200, height: 200 }}
        />
      </View>

      {/* From ListReview component */}
      <FlatList
        keyExtractor={(item) => item.review_id}
        data={review}
        renderItem={({ item }) => (
            <Text style={styles.item}> 
              Review: {item.review} {'\n'} 
              Taste: {item.taste} {'\n'}
              Value for money: {item.money} 
            </Text>
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
  },
  innertext: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  image: {
    alignSelf: "center",
  },
  item: {
    alignItems: "center",
    backgroundColor: "#8DA242",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ADD8E6",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttontext: {
    fontSize: 20
  }
});
