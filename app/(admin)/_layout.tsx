import { Redirect, router, Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../providers/AuthProvider";

/**
 * The top-level component for the app, which renders the tab bar and each
 * of the screens that are accessible from the tab bar.
 *
 * The tab bar is rendered with a transparent background on iOS, which
 * allows the blur effect to show through. On other platforms, the tab bar
 * is rendered with a solid background.
 *
 * The Home and Explore screens are rendered as separate tabs, with icons
 * and titles that are defined in the screen options.
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<any>();
  // const {isAdmin} = useAuth();

  // if(!isAdmin){
  //   return <Redirect href={'/'} />;
  // }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          href: null,
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          headerShown: false,
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <Icon name="restaurant" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          title: "Add New Product",
          tabBarIcon: ({ color, size }) => (
            <Icon name="add" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          headerShown: false,
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      />

      
    </Tabs>
  );
}
