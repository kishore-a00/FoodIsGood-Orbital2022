import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Button, Alert, Image } from "react-native";
import { supabase } from "../lib/supabase";

//Canteenscreen page which fetches all the stalls stored in the database based on the selected canteen

export const CanteenScreen = ({ navigation, route }) => {
  const [stall, setStall] = useState("");

  const ShowStall = async () => {
    let { data: stall, error } = await supabase
      .from("stall")
      .select("*")
      .eq("canteen_id", route.params.canteen_id); 
    return { stall, error };
  };
  const LoadStall = async () => {
    const { stall, error } = await ShowStall();
    setStall(stall);
    // console.log(stall);
    // console.log(error);
  };

  useEffect(() => {
    LoadStall();
  });

  //Info button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
      <Button 
      onPress={() => 
       Alert.alert("Welcome to the " + route.params.canteen_name + "!", 
       "This page lists the stalls in this canteen.\n\n" +
       "Click on one of the images to see the items sold in that stall!\n\n" +
       "To navigate back to the canteen page, press the left arrow on the top left hand corner of your screen.", 
       [{text: "Ok", onPress: () => console.log("pressed")}])} 
     title="?" />,
     })
   })

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.stall_id}
        data={stall}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Stall", {stall_id: item.stall_id, stall_name: item.stall_name})}>
            {/** Insert image of food items here */}
            <View style={styles.image}>
              <Image
                source={{uri: item.image_url}}
                style={{ width: 300, height: 200 }}
              />
            </View>
            <Text>{item.stall_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 2
    },
    item: {
      alignItems: "center",
      backgroundColor: '#8DA242',
      padding: 20,
      marginVertical: 10,
      marginHorizontal: 10,
    },
    innerText: {
      color: '#FFFFFF'
    }
  });