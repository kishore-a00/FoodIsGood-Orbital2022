import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jwvztrmoiyxwxzmbfmhf.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dnp0cm1vaXl4d3h6bWJmbWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMyOTE2NjAsImV4cCI6MTk2ODg2NzY2MH0.5FTDrEH4rt2LBZ2o7ltyX4y8kUr_R8vm0x9XeegKoEE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});