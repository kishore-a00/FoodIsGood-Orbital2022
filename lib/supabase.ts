import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rbutwukcuixordwkhqrz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJidXR3dWtjdWl4b3Jkd2tocXJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI1MDU2MjIsImV4cCI6MTk2ODA4MTYyMn0.kLPGmvgJP_1V2QVjT2M_rdx-8-KH7ERYNLppRG_zVpQ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});