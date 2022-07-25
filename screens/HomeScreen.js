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

//Homescreen page which fetches all the faculties stored in the database

export const HomeScreen = ({ navigation }) => {
  const [faculty, setFaculty] = useState("");

  const ShowFaculty = async () => {
    let { data: faculty, error } = await supabase.from("faculty").select("*");
    return { faculty, error };
  };
  const LoadFaculty = async () => {
    const { faculty, error } = await ShowFaculty();
    setFaculty(faculty);
    // console.log(faculty);
    // console.log(error);
  };
  //Add checking if admin here

  useEffect(() => {
    LoadFaculty();
  });

  const HandleSignOut = () => {
    Alert.alert(
      "You've clicked the sign out button.",
      "Are you sure you would like to sign out?",
      [{text: "Yes", onPress: () => supabase.auth.signOut()},
      {text: "No", onPress: () => console.log("canceled sign out")}]
    )
  }

  //Info button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() =>
            Alert.alert(
              "Welcome to the Home Screen!",
              "Click the image of a faculty to see the canteens available there!",
              [{ text: "Ok", onPress: () => console.log("pressed") }]
            )
          }
          title="?"
        />
      ),
    });
  });
  return (
    //Returns the list of faculties from supabase as clickable buttons
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.faculty_id}
        data={faculty}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Faculty", {
                faculty_id: item.faculty_id,
                faculty_name: item.faculty_name,
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
            <Text style={styles.itemNameText}>{item.faculty_name}</Text>
          </TouchableOpacity>
        )}
      />
      {/* Create/update username button */}
      <TouchableOpacity
        style={styles.outbutton}
        onPress={() => navigation.navigate("Username")}
      >
        <Text style={styles.innerText}> Update username here! </Text>
      </TouchableOpacity>

      {/* Sign out button */}
      <TouchableOpacity
        style={styles.outbutton}
        onPress={() => HandleSignOut()}
      >
        <Text style={styles.innerText}> Sign Out! </Text>
      </TouchableOpacity>
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
  outbutton: {
    alignItems: "center",
    backgroundColor: "#696969",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  innerText: {
    color: "#FFFFFF",
  },
});
