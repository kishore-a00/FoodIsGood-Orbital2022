import 'react-native-url-polyfill/auto'
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Session } from '@supabase/supabase-js'

import { HomeStackScreen } from './screens/HomeStackScreen';
import Auth from './components/Auth'

//import Account from './components/Account' //work on it in the future


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
      {session && session.user ? ( <HomeStackScreen /> ) : ( <Auth /> )}  
    </NavigationContainer>
  );
}
