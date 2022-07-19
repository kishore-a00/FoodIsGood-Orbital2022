//This is the sign in screen
import React, { useState } from 'react'
import { Alert, StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
    } else {
      Alert.alert("Sign up successful!", "You're almost there!\nPlease click the magic link sent to your email for verification.", [{text: "Ok", onPress: () => console.log("Pressed")}])
    }
    setLoading(false)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <View style={styles.container}>
          <Text style={styles.headerText}>FoodIsGood</Text>
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
            autoCompleteType={"off"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
            autoCompleteType={"off"}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} /> 
        </View>
        <View style={styles.verticallySpaced}>
          <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
        </View>
        {/* Help button on who should sign up/sign in */}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    padding: 12,
    alignItems: 'center'
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#301934'
  }
})