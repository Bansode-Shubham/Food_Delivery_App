import { FontAwesome } from "@expo/vector-icons";
import { Stack, Link, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
  const router = useRouter();
  return (
    <Stack
     
    >
      <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
  );
}
