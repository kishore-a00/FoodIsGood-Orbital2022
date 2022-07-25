import React from "react"
import { StyleSheet, Alert, Text, TouchableOpacity, View, Button, Linking } from "react-native"

export const UpdateScreen = ({ navigation }) => {
//Info button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
      <Button 
      onPress={() => 
        Alert.alert("Welcome to the information updating section!", 
        "To send the developer team information on a new stall or food item, click the \"New stall/food item\" button.\n\n" +
        "Clicking the button would lead you to a form that you can fill up.\n\n" +
        "To head back to the home screen, click the back button at the top left hand corner of the screen.\n\n", 
        [{text: "Ok", onPress: () => console.log("pressed")}])} 
      title="?" />,
      })
    })
    return(
        <View style={styles.container}>
            {/* Component for sending updated stall information to dev team */}
            <View style={styles.sectionComponent}>
                <Text style={styles.headerText}> 
                    Creating a new stall or updating menu information? 
                </Text>
            {/* Button to access form to add stall info */}
                <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openURL('https://forms.gle/S6a9U2k63mS9FQ2z6')}>
                    <Text style={styles.buttonText}> New stall/food item! </Text>
                </TouchableOpacity>
            </View>
        </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
      },
    sectionComponent: {
      alignItems: "center",
      marginTop: 50,
      marginBottom: 20,
    },
    headerText: {
      fontSize: 20,
      fontWeight: "300",
      alignItems: "center"
    },
    button: {
        alignItems: "center",
        backgroundColor: "#ADD8E6",
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
      },
      buttonText: {
        fontSize: 20,
        fontWeight: "bold",
      },
  });