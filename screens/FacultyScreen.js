import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

//Text should show whatever the user selected previously
//Text below should be fetched from database

export const FacultyScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.headerText}> Select a Canteen:</Text>
            
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Canteen")}>
                <Text style={styles.innerText}> Techno Edge </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Canteen")}>
                <Text style={styles.innerText}> Bistro Box </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Canteen")}>
                <Text style={styles.innerText}> LiHO Tea </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Canteen")}>
                <Text style={styles.innerText}> Starbucks </Text>
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
    headerText: {
      color: '#A7BC5B',
      fontSize: 32
    },
    innerText: {
      color: '#FFFFFF'
    }
  });