//NOT USING NOW, KIV FIRST

import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
//After clicking log in it goes to the homescreen (not sure about what happens after clicking sign up)
//After clicking the magic link, user is authenticated and can sign in
import { UserAuth } from './UserAuth'

export const SignInScreen = () => {
    //Import log in and sign up functions + bring to next page?
    const handleLogIn = () => {console.log("Logged In")};
    const handleSignUp = () => {console.log("Signed Up")};

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>FoodIsGood</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogIn}>
                <Text> Sign In! </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text> Sign up! </Text>
            </TouchableOpacity>
        </View>
    );
}
//Log in and sign up button
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

  //NOT NEEDED ANYMORE