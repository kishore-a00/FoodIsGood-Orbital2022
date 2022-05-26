import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

//Text should show whatever the user selected previously
//Text below should be fetched from database

export const StallScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.headerText}> Select an Item:</Text>
            
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Item")}>
                <Text style={styles.innerText}> Black Pepper Chicken Chop </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Item")}>
                <Text style={styles.innerText}> Chicken Cutlet </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Item")}>
                <Text style={styles.innerText}> Grilled Dory Fish </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Item")}>
                <Text style={styles.innerText}> Fish & Chips </Text>
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