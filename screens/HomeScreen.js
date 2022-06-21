import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";

//Homescreen page which fetches all the faculties stored in the database

export const HomeScreen = ({ navigation }) => {
  const [faculty, setFaculty] = useState("");

  const ShowFaculty = async () => {
    let { data: faculty, error } = await supabase
      .from("faculty")
      .select("*");
    return { faculty, error };
  };
  const LoadFaculty = async () => {
    const { faculty, error } = await ShowFaculty();
    setFaculty(faculty);
    // console.log(faculty);
    // console.log(error);
  };

  useEffect(() => {
    LoadFaculty();
  });
  return (
    <View style={styles.container}>
       <Text style={styles.headerText}> Select a Faculty:</Text>
      <FlatList
        keyExtractor={(item) => item.faculty_id} 
        data={faculty}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Faculty", {faculty_id: item.faculty_id} )}>
            <Text>{item.faculty_name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.outbutton} onPress={() => supabase.auth.signOut()}>
        <Text style={styles.innerText}> Sign Out! </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 2,
  },
  item: {
    alignItems: "center",
    backgroundColor: "#8DA242",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  outbutton: {
    alignItems: "center",
    backgroundColor: "#696969",
    padding: 20,
    marginVertical: 30,
    marginHorizontal: 10,
  },
  headerText: {
    color: "#A7BC5B",
    fontSize: 32,
  },
  innerText: {
    color: "#FFFFFF",
  },
});
