import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { supabase } from "../lib/supabase";
//Buttons to access the various faculty pages   
//Need to implement feature of going to Faculty page and it rendering based on faculty selected
//Text below should be fetched from database
export const HomeScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.headerText}> Select a Faculty:</Text>
            
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Faculty")}>
                <Text style={styles.innerText}> Engineering </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Faculty")}>
                <Text style={styles.innerText}> Science </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Faculty")}>
                <Text style={styles.innerText}> Arts & Social Sciences </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Faculty")}>
                <Text style={styles.innerText}> Business </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Faculty")}>
                <Text style={styles.innerText}> Medicine </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outbutton} onPress={() => supabase.auth.signOut()}>
                <Text style={styles.innerText}> Sign Out! </Text>
              </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 2
  },
  button: {
    alignItems: "center",
    backgroundColor: '#8DA242',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  outbutton: {
    alignItems: "center",
    backgroundColor: '#696969',
    padding: 20,
    marginVertical: 120,
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
