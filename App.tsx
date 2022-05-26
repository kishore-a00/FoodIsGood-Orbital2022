import 'react-native-url-polyfill/auto'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Session } from '@supabase/supabase-js'

import { HomeScreen } from "./screens/HomeScreen"
import { FacultyScreen } from "./screens/FacultyScreen"
import { CanteenScreen } from "./screens/CanteenScreen"
import { StallScreen } from './screens/StallScreen';
import { ItemScreen } from './screens/ItemScreen';
import Auth from './components/Auth'
//import Account from './components/Account' //work on it in the future

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  
  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session && session.user ? ( [
          <Stack.Screen name="Home" component={HomeScreen} />,       
          <Stack.Screen name="Faculty" component={FacultyScreen} />,      
          <Stack.Screen name="Canteen" component={CanteenScreen} />,  
          <Stack.Screen name="Stall" component={StallScreen} />,
          <Stack.Screen name="Item" component={ItemScreen} /> ] 
        ) : (
          <Stack.Screen name="Auth" component={Auth} /> 
        )}  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
