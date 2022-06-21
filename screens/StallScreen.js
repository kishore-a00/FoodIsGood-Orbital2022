import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";

//Stallscreen page which fetches all the items stored in the database based on the selected stall
//can remove item_id which is routed

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
  return (
    <View style={styles.container}>
       <Text style={styles.headerText}> Select an Item:</Text>
      <FlatList
        keyExtractor={(item) => item.item_id}
        data={item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Item", {item_id: item.item_id, item_name: item.item_name})}>
            <Text>{item.item_name}</Text>
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
    headerText: {
      color: '#A7BC5B',
      fontSize: 32
    },
    innerText: {
      color: '#FFFFFF'
    }
  });