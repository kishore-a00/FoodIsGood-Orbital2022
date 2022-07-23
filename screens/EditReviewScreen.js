import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Button, Keyboard, Alert, TouchableWithoutFeedback } from "react-native";
import { supabase } from "../lib/supabase";

//Try keyboard avoiding view
//data: all_reviews?
//Implementing RatingSystem component instead of importing the relevant components

export default function ReviewScreen({ navigation, route }) {
  //Storing the rating value for taste
  const [taste, setTaste] = useState(2); //Setting the numeric value for taste
  const [taste_desc, setTaste_desc] = useState("okay"); //Setting the description for how tasty the food is
  const arrayTaste = ["", "meh", "okay", "good", "very nice", "fantastic!"]; //Rating starts from 1 whereas index starts from 0

  //Storing the rating value for value
  const [money, setMoney] = useState(2); //Setting the numeric value for value
  const [money_desc, setMoney_desc] = useState("quite ex"); //Setting the description for how value for money the food is
  const arrayMoney = ["", "not worth", "quite ex", "good value", "great value", "fantastic value!"]; //Rating starts from 1 whereas index starts from 0
  const [review, setReview] = useState("");

  //const[modalVisible, setModalVisible] = useState(false);
  let user_uuid = supabase.auth.user().id; 

  //This function will be called upon pressing the submit button.
  //It submits the review, the ratings, the user_id and the item id to the database
  const UpdateReview = async () => {
    const { data, error } = await supabase
      .from("all_reviews")
      .update({
        review: review,
        money: money,
        taste: taste,
        item_id: route.params.item_id,
        id: user_uuid,
      })
      .eq("review_id", route.params.review_id);
    Keyboard.dismiss();
    console.log(route.params.review_id);
    console.log(data);
    console.log(error);
    //Alert + navigation to return back to the item screen
    Alert.alert("Review has been updated!", "Going back to item screen.", [
      { text: "Ok", onPress: () => navigation.goBack() },
    ]);
  };

React.useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () =>
    <Button 
    onPress={() => 
    Alert.alert("Welcome to the edit review section!", 
    "Place your finger on the knob of the slider and slide horizontally to your desired rating. \n\n" +
    "Click the \"Write your new review here!\" area and type out your new review! \n\n" +
    "Satisfied with your review? \n\n" +
    "Click the \"Update review!\" button to submit your updated review!",
    [{text: "Ok", onPress: () => console.log("pressed")}])} 
  title="?" />,
  })
})

return (
  <View style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <View style={{marginTop: 10, marginBottom: 20}}>
          <Text style={styles.headerText}>Currently reviewing:</Text>
          <Text style={styles.itemNameText}>{route.params.item_name}</Text>
        </View>
        <View style={styles.sliderContainer}>
          {/* First Slider for Taste */}
          <Text style={styles.innerText}>Taste: {taste} ({taste_desc})</Text> 
          <Slider
          style={{ width: 200, height: 50 }}
          minimumValue={1} //Minimum value of rating
          maximumValue={5} //Maximum value of rating
          minimumTrackTintColor="#000000" //Colour of slider
          maximumTrackTintColor="#000000"
          step={1} //Increment slider by one step
          value={2} //Starting value of slider is 2
          onValueChange={(value) => { setTaste(value), setTaste_desc(arrayTaste[value]) }} //not sure if needed
          thumbTintColor="#ade8f4"
          />
        </View>

          {/* Second Slider for Value for money */}
        <View style={styles.sliderContainer}>  
          <Text style={styles.innerText}>Value for money: {money} ({money_desc}) </Text>
          <Slider
          style={{ width: 200, height: 50 }}
          minimumValue={1} //Minimum value of rating
          maximumValue={5} //Maximum value of rating
          minimumTrackTintColor="#000000" //Colour of slider
          maximumTrackTintColor="#000000"
          step={1} //Increment slider by one step
          value={2} //Starting value of slider is 2
          onValueChange={(value) => { setMoney(value), setMoney_desc(arrayMoney[value]) }} //not sure if needed
          thumbTintColor="#ade8f4"
          />
        </View>

          {/* Section to write review, REMOVED TEXT INPUT REF*/}
          <View>
          <TextInput
          multiline={true}
          numberOfLines={5}
          placeholder="Write your new review here!"
          value={review}
          onChangeText={(v) => setReview(v)}
          style={styles.input}
          />
          </View>
      </View>
    </TouchableWithoutFeedback>

      {/* Submit button to submit both the rating and the review to the database */}
      <TouchableOpacity style={styles.button} onPress={() => checkSubmission()}>
          <Text style={styles.submitText}>Update review!</Text>
      </TouchableOpacity>

  </View>
);
};

const styles = StyleSheet.create({
innerText: {
  fontSize: 20,
  fontWeight: "200"
},
button: {
  alignItems: "center",
  backgroundColor: "#90e0ef",
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
  paddingVertical: 0
},
input: {
  height: 100,
  margin: 10,
  borderWidth: 1,
  padding: 10,
  marginTop: 0
},
submitText: {
  fontSize: 20,
  fontWeight: "700"
},
headerText: {
  fontSize: 17,
  fontWeight: "100",
  textAlign: "center"
},
itemNameText: {
  fontSize: 25,
  fontWeight: "bold",
  textAlign: "center"
},
});
