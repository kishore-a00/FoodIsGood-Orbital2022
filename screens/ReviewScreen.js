import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { supabase } from "../lib/supabase";

//Try keyboard avoiding view
//data: all_reviews?
//Implementing RatingSystem component instead of importing the relevant components

export default function ReviewScreen({ navigation, route }) {
  //Storing the rating value for taste
  const [taste, setTaste] = useState(2); //Setting the numeric value for taste
  const [taste_desc, setTaste_desc] = useState("okay"); //Setting the description for how tasty the food is
  const arrayTaste = ["", "meh", "okay", "good", "very nice", "fantastic!"]; //Rating starts from 1 whereas index starts from 0
  var today;
  //Storing the rating value for value
  const [money, setMoney] = useState(2); //Setting the numeric value for value
  const [money_desc, setMoney_desc] = useState("quite ex"); //Setting the description for how value for money the food is
  const arrayMoney = [
    "",
    "not worth",
    "quite ex",
    "good value",
    "great value",
    "fantastic value!",
  ]; //Rating starts from 1 whereas index starts from 0
  const [review, setReview] = useState("");

  //const[modalVisible, setModalVisible] = useState(false);
  let user_uuid = supabase.auth.user().id;

  // Solution adapted from https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  const currDate = () => {
    today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() =>
            Alert.alert(
              "Welcome to the review section!",
              "Place your finger on the knob of the slider and slide horizontally to your desired rating. \n\n" +
                'Click the "Type a review" area and type out your review! \n\n' +
                "Satisfied with your review? \n\n" +
                'Click the "Submit review!" button to submit your review!',
              [{ text: "Ok", onPress: () => console.log("pressed") }]
            )
          }
          title="?"
        />
      ),
    });
  });

  //This function will be called upon pressing the submit button.
  //It submits the review, the ratings, the user_id and the item id to the database
  const addReview = async () => {
    const { data, error } = await supabase.from("all_reviews").insert([
      {
        review: review,
        money: money,
        taste: taste,
        item_id: route.params.item_id,
        id: user_uuid,
        date_time: today
      },
    ]);
    console.log(error)
    Keyboard.dismiss();

    //Alert + navigation to return back to the item screen
    Alert.alert("Review has been posted!", "Going back to item screen.", [
      { text: "Ok", onPress: () => navigation.goBack() },
    ]);
  };

  const checkSubmission = () => {
    currDate();
    if (review.length < 3) {
      Alert.alert(
        "Review is too short",
        "The review should be at least 3 characters long.",
        [{ text: "Ok", onPress: () => console.log("Pressed") }]
      );
    } else {
      addReview();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <Text style={styles.headerText}>Currently reviewing:</Text>
            <Text style={styles.itemNameText}>{route.params.item_name}</Text>
          </View>
          <View style={styles.sliderContainer}>
            {/* First Slider for Taste */}
            <Text style={styles.innerText}>
              Taste: {taste} ({taste_desc})
            </Text>
            <Slider
              style={{ width: 200, height: 50 }}
              minimumValue={1} //Minimum value of rating
              maximumValue={5} //Maximum value of rating
              minimumTrackTintColor="#000000" //Colour of slider
              maximumTrackTintColor="#000000"
              step={1} //Increment slider by one step
              value={2} //Starting value of slider is 2
              onValueChange={(value) => {
                setTaste(value), setTaste_desc(arrayTaste[value]);
              }} //not sure if needed
              thumbTintColor="#ade8f4"
            />
          </View>

          {/* Second Slider for Value for money */}
          <View style={styles.sliderContainer}>
            <Text style={styles.innerText}>
              Value for money: {money} ({money_desc}){" "}
            </Text>
            <Slider
              style={{ width: 200, height: 50 }}
              minimumValue={1} //Minimum value of rating
              maximumValue={5} //Maximum value of rating
              minimumTrackTintColor="#000000" //Colour of slider
              maximumTrackTintColor="#000000"
              step={1} //Increment slider by one step
              value={2} //Starting value of slider is 2
              onValueChange={(value) => {
                setMoney(value), setMoney_desc(arrayMoney[value]);
              }} //not sure if needed
              thumbTintColor="#ade8f4"
            />
          </View>

          {/* Section to write review, REMOVED TEXT INPUT REF*/}
          <View>
            <TextInput
              multiline={true}
              numberOfLines={5}
              placeholder="Type Review Here"
              value={review}
              onChangeText={(v) => setReview(v)}
              style={styles.input}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Submit button to submit both the rating and the review to the database */}
      <TouchableOpacity style={styles.button} onPress={() => checkSubmission()}>
        <Text style={styles.submitText}>Submit review!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  innerText: {
    fontSize: 20,
    fontWeight: "200",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ADD8E6",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sliderContainer: {
    alignItems: "center",
    paddingVertical: 0,
  },
  input: {
    height: 100,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    marginTop: 0,
  },
  submitText: {
    fontSize: 20,
    fontWeight: "700",
  },
  headerText: {
    fontSize: 17,
    fontWeight: "100",
    textAlign: "center",
  },
  itemNameText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});
