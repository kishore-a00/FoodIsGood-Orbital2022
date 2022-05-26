import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
//Text should show whatever the user selected previously
//Text below should be fetched from database

export const CanteenScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.headerText}> Select a Stall:</Text>
            
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Stall")}>
                <Text style={styles.innerText}> Western </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Stall")}>
                <Text style={styles.innerText}> Mixed Rice </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Stall")}>
                <Text style={styles.innerText}> Indian </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Stall")}>
                <Text style={styles.innerText}> Chicken Rice </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Stall")}>
                <Text style={styles.innerText}> Noodles </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Stall")}>
                <Text style={styles.innerText}> Mala Hotpot </Text>
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