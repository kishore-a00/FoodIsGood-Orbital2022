import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
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
  return (
    <View style={styles.container}>
       <Text style={styles.headerText}> Select a Canteen:</Text>
      <FlatList
        keyExtractor={(item) => item.canteen_id}
        data={canteen}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Canteen", {canteen_id: item.canteen_id})}>
            <Text>{item.canteen_name}</Text>
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