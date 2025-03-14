import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";

import CartProvider from "./providers/CartProvider";
import AuthProvider from "./providers/AuthProvider";

import QueryProvider from "./providers/QueryProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/**
 * The root layout component of the app.
 *
 * This component ensures that the app font is loaded before rendering the app.
 * It also sets up the navigation stack and theme provider.
 *
 * @returns A JSX element representing the root layout of the app.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <QueryProvider>
            <CartProvider>
              <Stack initialRouteName="(user)">
                <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                <Stack.Screen name="(user)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </CartProvider>
          </QueryProvider>
        </AuthProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
