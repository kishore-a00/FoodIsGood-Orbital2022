import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
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
  return (
    <View style={styles.container}>
       <Text style={styles.headerText}> Select a Stall:</Text>
      <FlatList
        keyExtractor={(item) => item.stall_id}
        data={stall}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Stall", {stall_id: item.stall_id})}>
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
    headerText: {
      color: '#A7BC5B',
      fontSize: 32
    },
    innerText: {
      color: '#FFFFFF'
    }
  });