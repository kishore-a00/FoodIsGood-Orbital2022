import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Button, Keyboard, Alert } from "react-native";
import { supabase } from "../lib/supabase";

//Try keyboard avoiding view
//Click out to hide keyboard
//data: all_reviews?
//Implementing RatingSystem component instead of importing the relevant components

export default function ReviewScreen({ navigation, route }) {
    const [taste, setTaste] = useState();
    const [money, setMoney] = useState();
    const [review, setReview] = useState("");
    let user_uuid = supabase.auth.user().id; //not sure

    //This function will be called upon pressing the submit button.
    //It submits the review, the ratings, the user_id and the item id to the database
    const addReview = async () => {
      const { data, error } = await supabase
        .from("all_reviews")
        .insert([{ review: review, money: money, taste: taste, item_id: route.params.item_id, id: user_uuid }]);
      Keyboard.dismiss();

      //Alert + navigation to return back to the item screen
      Alert.alert("Review has been posted!", "Going back to item screen.", [{text: "Ok", onPress: () => navigation.goBack()}]);
    };

    const checkSubmission = () => {
      if (review.length < 3) {
        Alert.alert("Review is too short", "The review should be at least 3 characters long.", [{text: "Ok", onPress: () => console.log("Pressed")}])
      } else {
        addReview()
      }
    };
  
    return (
      <View style={styles.container}>
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
  
              {/* Section to write review, REMOVED TEXT INPUT REF*/}
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
          </View>

          {/* Submit button to submit both the rating and the review to the database */}
          <TouchableOpacity style={styles.button} onPress={() => checkSubmission()}>
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
      paddingHorizontal: 10,
    },
    sliderContainer: {
      alignItems: "center",
    },
  });
