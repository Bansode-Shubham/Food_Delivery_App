// import 'react-native-url-polyfill/auto';
// import * as SecureStore from 'expo-secure-store';
// import { createClient } from '@supabase/supabase-js';
// import { Database } from '../app/database.types';

// const ExpoSecureStoreAdapter = {
//   getItem: (key: string) => {
//     return SecureStore.getItemAsync(key);
//   },
//   setItem: (key: string, value: string) => {
//     SecureStore.setItemAsync(key, value);
//   },
//   removeItem: (key: string) => {
//     SecureStore.deleteItemAsync(key);
//   },
// };

// const supabaseUrl = 'https://vydzyvapjzudqlabybby.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5ZHp5dmFwanp1ZHFsYWJ5YmJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4OTM5MTQsImV4cCI6MjA1NjQ2OTkxNH0.8HBhVeLSTbALJfcV0XYhoP_OnA9H07RZk9B5rphGZ0s';

// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: ExpoSecureStoreAdapter as any,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });


import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://vydzyvapjzudqlabybby.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5ZHp5dmFwanp1ZHFsYWJ5YmJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4OTM5MTQsImV4cCI6MjA1NjQ2OTkxNH0.8HBhVeLSTbALJfcV0XYhoP_OnA9H07RZk9B5rphGZ0s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});