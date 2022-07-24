import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Alert, Text, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, Input } from "react-native-elements";
import { ApiError, Session } from "@supabase/supabase-js";

//not sure why it doesen't work the first way and gotta have another usestate for displaying username
//unique username: error catch
//formatting of UI
//username keeps refreshing text input

export default function Account({navigation}) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [currUser, setCurrUser] = useState("");
  //const [currDate, setCurrDate] = useState("");

  //Fetching current username from database
  useEffect(() => {
    getProfile();}, []
  );

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setCurrUser(data.username);
        //setCurrDate(data.updated_at);
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setLoading(false);
    }
  }
  //Not needed as of now
  async function updateProfile({
    username
  }: {
    username: string;
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setLoading(false);
    }
  }
  //Info button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
      <Button 
      onPress={() => 
        Alert.alert("Welcome to the username updating section!", 
        "This page shows you your current username in the box.\n\n" +
        "To update your username, delete the text in the box and type in your new username.\n\n" +
        "Ready to change your username? Click the \"Update\" button!\n\n" +
        "And that's it!\n\n", 
        [{text: "Ok", onPress: () => console.log("pressed")}])} 
      title="?" />,
      })
    })

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        {/* Displays current username for user stored in database */}
        <View style={styles.headerComponent}>
          <Text style={styles.headerText}> 
            Your current username is: 
          </Text>
          {/* Displays current username, if not username is found, shows the empty message */}
          <Text style={styles.currUserText}>
            {currUser || "seems empty :( \ncreate one below!"}  
          </Text>
        </View>

        <View style={styles.middleComponent}>
          <Text style={styles.headerText}>Type your new username below:</Text>
        </View>
        <View style={styles.verticallySpaced}>
          <TextInput
            style={styles.input}
            value={username || ""}
            onChangeText={(text) => setUsername(text)}
            placeholder="Type your new username here!"
          />
        </View>

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title={loading ? "Loading ..." : "Update"}
            onPress={() => {updateProfile({ username });
              Alert.alert(
                  "Username has been updated!", 
                  "Going back to Home screen.", 
                  [{text: "Ok", onPress: () => navigation.goBack()}]);
              }}    
            disabled={loading}
          />
        </View>     
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerComponent: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20
  },
  middleComponent: {
    alignItems:"center",
    marginTop: 20
  },
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "300",
    alignItems: "center"
  },
  currUserText: {
    fontSize: 30,
    fontWeight: "900"
  }
});