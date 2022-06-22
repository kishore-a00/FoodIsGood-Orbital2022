//NOT IN USE
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";
/**
 * Sliding the rating stores the rating in a local variable first - done
 * Export this function and import in another page - 8/6/2022 - done
 * Then clicking the submit review button pushes both the ratings to Supabase - 8/6/2022 - done
 * Integrating the submit review button with the actual review
 */

//Implementation of a single slider first
export const RatingSystem = () => {
  const [taste, setTaste] = useState();
  const [money, setMoney] = useState();

  const addRatings = async () => {
    const { data, error } = await supabase
      .from("ratings_test")
      .insert([{ money: money, taste: taste }]);
    console.log(data);
    console.log(error);
  };

  return (
    <View>
        <View>
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
        </View>

      <TouchableOpacity style={styles.button} onPress={() => addRatings()}>
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
