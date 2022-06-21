import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";

export default function ListReview() {
  const [review, setReview] = useState("");

  const ShowReview = async () => {
    let { data: Teststall1, error } = await supabase
      .from("Teststall1")
      .select("*");
    return { Teststall1, error };
  };
  const LoadReview = async () => {
    const { Teststall1, error } = await ShowReview();
    setReview(Teststall1);
    // console.log(Teststall1);
    // console.log(error);
  };

  useEffect(() => {
    LoadReview();
  });
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={review}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.review}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  item: {
    padding: 30,
    backgroundColor: "#8DA242",
    fontSize: 16,
  },
});
