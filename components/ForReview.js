import React, { useState } from "react";
import { Alert, StyleSheet, View, TextInput, Button } from "react-native";
import { supabase } from "../lib/supabase";

export default function ForReview() {
  const [review, setReview] = useState("");

  const addReview = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .insert([{ id: 2, review: review }]);
    console.log(data);
    console.log(error);
  };

  return (
    <View style={styles.verticallySpaced}>
      <TextInput
        multiline={true}
        numberOfLines={4}
        placeholder="Type Review Here"
        value={review}
        onChangeText={(v) => setReview(v)}
        style={{
          marginBottom: 12,
          height: 70,
          justifyContent: "flex-start",
        }}
      />
      <Button title="Submit" onPress={() => addReview()} />
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
});
