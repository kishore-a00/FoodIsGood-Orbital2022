import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Button, Keyboard } from "react-native";
import { supabase } from "../lib/supabase";

//Try keyboard avoiding view
//data: all_reviews?
//, item_id: route.params.item_id
//fetching user id? do it on homestackscreen?
//getting error when including user_id in the insert section, change to not unll first??
//KIV FIRST

export default function PostReview({ route }) {
  const [taste, setTaste] = useState();
  const [money, setMoney] = useState();
  const [review, setReview] = useState("");

  const addReview = async () => {
    const { data, error } = await supabase
      .from("all_reviews")
      .insert([{ review: review, money: money, taste: taste, item_id: route.params.item_id, id: 'fa08286d-4e09-481f-a8d2-af81f8116622' }]);
    this.textInput.clear();
    Keyboard.dismiss();
    console.log(data);
    console.log(error);
    //Additional stuff
    //Alert.alert("Review has been posted!");
    //navigation.goBack();
  };

  return (
    <View>
        <View>
            {/* First Slider for Taste */}
            <Text style={styles.innerText}>Taste: {taste} </Text> 
            <Slider
            style={{ width: 200, height: 50 }}
            minimumValue={1} //Minimum value of rating
            maximumValue={5} //Maximum value of rating
            minimumTrackTintColor="#000000" //Colour of slider
            maximumTrackTintColor="#000000"
            step={1} //Increment slider by one step
            value={2} //Starting value of slider is 2
            onValueChange={(value) => setTaste(value)} //not sure if needed
            thumbTintColor="green"
            />

            {/* Second Slider for Value for money */}
            <Text style={styles.innerText}>Value for money: {money} </Text>
            <Slider
            style={{ width: 200, height: 50 }}
            minimumValue={1} //Minimum value of rating
            maximumValue={5} //Maximum value of rating
            minimumTrackTintColor="#000000" //Colour of slider
            maximumTrackTintColor="#000000"
            step={1} //Increment slider by one step
            value={2} //Starting value of slider is 2
            onValueChange={(value) => setMoney(value)} //not sure if needed
            thumbTintColor="green"
            />

            {/* Section to write review */}
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
            ref={(input) => {
            this.textInput = input;
            }}
        />
        </View>
        {/* Submit button to submit both the rating and the review to the database */}
        <TouchableOpacity style={styles.button} onPress={() => addReview()}>
            <Text>Submit review!</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  innerText: {
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#8DA242",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  sliderContainer: {
    alignItems: "center",
  },
});