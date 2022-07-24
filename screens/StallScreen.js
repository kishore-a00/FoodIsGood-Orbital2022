import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image, Button, Alert } from "react-native";
import { supabase } from "../lib/supabase";

//Stallscreen page which fetches all the items stored in the database based on the selected stall
//Add images and average review portion

export const StallScreen = ({ navigation, route }) => {
  const [item, setItem] = useState("");

  const ShowItem = async () => {
    let { data: item, error } = await supabase
      .from("item")
      .select("*")
      .eq("stall_id", route.params.stall_id); 
    return { item, error };
  };
  const LoadItem = async () => {
    const { item, error } = await ShowItem();
    setItem(item);
    // console.log(item);
    // console.log(error);
  };

  useEffect(() => {
    LoadItem();
  });

  //Info button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
      <Button 
      onPress={() => 
        Alert.alert("Welcome to the " + route.params.stall_name + " stall!", 
        "This page lists the items in this stall.\n\n" +
        "Click on one of the images to see how others have reviewed this item!\n\n" +
        "To navigate back to the stall page, press the left arrow on the top left hand corner of your screen.", 
        [{text: "Ok", onPress: () => console.log("pressed")}])} 
      title="?" />,
      })
    })

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.item_id}
        data={item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Item", {item_id: item.item_id, item_name: item.item_name})}>
            {/** Insert image of food items here */}
            <View style={styles.image}>
              <Image
                source={{uri: item.image_url}}
                style={{ width: 300, height: 200 }}
              />
            </View>
            <Text style={styles.itemNameText}>{item.item_name}</Text>
            <Text style={styles.itemPriceText}>${item.price}</Text>
            {/** Insert average ratings here */}
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
      alignItems: "flex-start",
      backgroundColor: '#caf0f8',
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 10,
    },
    itemNameText: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    itemPriceText: {
      fontSize: 15
    },
  });