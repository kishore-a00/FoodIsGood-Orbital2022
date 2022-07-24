import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Button,
  Alert,
  Image,
} from "react-native";
import { supabase } from "../lib/supabase";

//Facultyscreen page which fetches all the canteens stored in the database based on the selected faculty

export const FacultyScreen = ({ navigation, route }) => {
  const [canteen, setCanteen] = useState("");

  const ShowCanteen = async () => {
    let { data: canteen, error } = await supabase
      .from("canteen")
      .select("*")
      .eq("faculty_id", route.params.faculty_id);
    return { canteen, error };
  };
  const LoadCanteen = async () => {
    const { canteen, error } = await ShowCanteen();
    setCanteen(canteen);
    // console.log(canteen);
    // console.log(error);
  };

  useEffect(() => {
    LoadCanteen();
  });

  //Info button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() =>
            Alert.alert(
              "Welcome to the " + route.params.faculty_name + "!",
              "This page lists the canteens in this faculty.\n\n" +
                "Click on one of the images to see the stalls in that canteen!\n\n" +
                "To navigate back to the faculty page, press the left arrow on the top left hand corner of your screen.",
              [{ text: "Ok", onPress: () => console.log("pressed") }]
            )
          }
          title="?"
        />
      ),
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.canteen_id}
        data={canteen}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Canteen", {
                canteen_id: item.canteen_id,
                canteen_name: item.canteen_name,
              })
            }
          >
            {/** Insert image of food items here */}
            <View style={styles.image}>
              <Image
                source={{ uri: item.image_url }}
                style={{ width: 300, height: 200 }}
              />
            </View>
            <Text style={styles.itemNameText}>{item.canteen_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 2,
  },
  item: {
    alignItems: "flex-start",
    backgroundColor: "#caf0f8",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  itemNameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  innerText: {
    color: "#FFFFFF",
  },
});
